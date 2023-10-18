import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotFoundError } from "./errors";

/**
 * available reaction choices
 */
export type ReactionChoice = "heart" | "like" | "check" | "question" | "sad" | "angry";

const availableReactionChoices = new Set<ReactionChoice>(["heart", "like", "check", "question", "sad", "angry"]);

export const CHOICE_TO_SENTIMENT: Record<ReactionChoice, number> = {
  heart: 3,
  like: 2,
  check: 1,
  question: -1,
  sad: -2,
  angry: -3,
};

export interface ReactionDoc extends BaseDoc {
  by: ObjectId;
  to: ObjectId;
  choice: ReactionChoice;
}

export default class ReactionConcept {
  public readonly reactions = new DocCollection<ReactionDoc>("reactions");

  /**
   * Retrieves reactions for a specific item
   */
  async getReactions(item: ObjectId) {
    return this.reactions.readMany({ to: item });
  }

  /**
   * Retrieves reactions for a specific item by a specific user
   */
  async getReaction(to: ObjectId, by: ObjectId) {
    return this.reactions.readOne({ to, by });
  }

  /**
   * /**
   * Gets the most frequent reactions for an array of items
   *
   */
  async getMostFrequentReactions(items: ObjectId[]) {
    const reactions = await this.reactions.readMany({ to: { $in: items } });
    const reactionCount: Record<string, Record<ReactionChoice, number>> = {};
    reactions.forEach(({ to, choice }) => {
      if (!(to.toString() in reactionCount)) {
        reactionCount[to.toString()] = { heart: 0, like: 0, check: 0, question: 0, sad: 0, angry: 0 };
      }
      reactionCount[to.toString()][choice] += 1;
    });

    const mostFrequentReactions = Object.fromEntries(
      Object.entries(reactionCount).map(([id, choices]) => [
        id,
        Object.keys(choices).reduce((a?: string, b?: string) => ((a ? choices[a as ReactionChoice] : 0) >= choices[b as ReactionChoice] ? a : b), undefined),
      ]),
    );

    return items.map((item) => mostFrequentReactions[item.toString()]);
  }

  /**
   * Adds or updates a reaction to an item
   */
  async react(to: ObjectId, by: ObjectId, choice: ReactionChoice) {
    this.isValidReaction(choice);
    const { matchedCount } = await this.reactions.updateOne({ by, to }, { choice }, { upsert: true });

    return { msg: matchedCount ? "reaction updated!" : "reaction added!" };
  }

  /**
   * Removes a user's reaction from an item
   */
  async unreact(to: ObjectId, by: ObjectId) {
    const reaction = await this.reactions.popOne({ by, to });
    if (!reaction) {
      throw new ReactionNotFoundError(by, to);
    }

    return { msg: "reaction deleted!" };
  }

  isValidReaction(reactionChoice: ReactionChoice) {
    if (!availableReactionChoices.has(reactionChoice)) {
      throw new BadValuesError(`${reactionChoice} is not one of available reactions!`);
    }
  }

  getSentiment(choice: ReactionChoice) {
    return CHOICE_TO_SENTIMENT[choice];
  }
}

export class ReactionNotFoundError extends NotFoundError {
  constructor(
    public readonly user: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} did not react to {1}!", user, _id);
  }
}

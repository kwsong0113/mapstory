import { Location } from "../../types/location";
import { ReactionChoice } from "../../types/reaction";
import { fetchy } from "../../utils/fetchy";

type DeletePostReqeust = {
  id: string;
  location: Location;
};

type SendReactionRequest = {
  id: string;
  location: Location;
  choice: ReactionChoice;
};

export const fetchReactions = async (id: string) => {
  return (await fetchy(`/api/posts/${id}/reactions`, "GET", { alert: false })) as { by: string; choice: ReactionChoice }[];
};

export const deleteReaction = async ({ id, location: { lat, lng } }: DeletePostReqeust) => {
  return await fetchy(`/api/posts/${id}/reactions`, "DELETE", {
    query: {
      lat: `${lat}`,
      lng: `${lng}`,
    },
  });
};

export const sendReaction = async ({ id, ...body }: SendReactionRequest) => {
  return await fetchy(`/api/posts/${id}/reactions`, "POST", {
    body: body,
  });
};

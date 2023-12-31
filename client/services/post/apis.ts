import { Location } from "../../types/location";
import { Post, PostPiece } from "../../types/post";
import { ReactionChoice } from "../../types/reaction";
import { fetchy } from "../../utils/fetchy";

type CreatePostRequest = {
  content: string;
  location: Location;
};

type FetchPostsRequest = {
  author?: string;
  lat?: string;
  lng?: string;
};

export const createPost = async (body: CreatePostRequest) => {
  await fetchy("/api/posts", "POST", {
    body,
  });
};

export const fetchPosts = async (query: FetchPostsRequest) => {
  return (await fetchy("/api/posts", "GET", {
    query,
    alert: false,
  })) as { post: Post; location: Location; reaction?: ReactionChoice }[];
};

export const updatePostPiece = async ({ _id, content }: Omit<PostPiece, "author">) => {
  await fetchy(`/api/posts/${_id}`, "PATCH", {
    body: {
      content,
    },
  });
};

export const deletePostPiece = async (id: string) => {
  await fetchy(`/api/posts/${id}`, "DELETE");
};

import { Location } from "../../types/location";
import { Post } from "../../types/post";
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
  })) as { post: Post; location: Location }[];
};

export const deletePostPiece = async (id: string) => {
  console.log(id);
  await fetchy(`/api/posts/${id}`, "DELETE");
};

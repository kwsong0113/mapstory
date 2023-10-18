import { Location } from "../../types/location";
import { fetchy } from "../../utils/fetchy";

type PostRequest = {
  content: string;
  location: Location;
};

export const createPost = async (body: PostRequest) => {
  await fetchy("/api/posts", "POST", {
    body,
  });
};

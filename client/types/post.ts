export interface Post {
  _id: string;
  pieces: PostPiece[];
}

export interface PostPiece {
  _id: string;
  author: string;
  content: string;
}

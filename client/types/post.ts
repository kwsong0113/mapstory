export interface Post {
  _id: string;
  pieces: PostPiece[];
  dateCreated: string;
  dateUpdated: string;
}

export interface PostPiece {
  _id: string;
  author: string;
  content: string;
}

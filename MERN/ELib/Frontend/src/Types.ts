export type NoteTypes = {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  title: string;
  genre: string;
  updatedAt: string;
  createdAt: string;
  coverImage: string;
  file: string;
  __v: number;
  hide: boolean;
};

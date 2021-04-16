export class Comment {

  id: number;
  name: string
  content?: string;
  date: string;
  rate: number;

  constructor(obj?: Partial<Comment>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

}

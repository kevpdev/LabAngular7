export class Comment {

  id: number;
  content: string;
  date: Date;

  constructor(obj?: Partial<Comment>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

}

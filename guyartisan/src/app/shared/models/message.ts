export class Message {
    content: string;
    error : boolean;

    constructor(obj?: Partial<Message>) {
        if (obj) {
          Object.assign(this, obj);
        }
      }
}



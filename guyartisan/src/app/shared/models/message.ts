import { Error } from "./error";

export class Message {
    content: string;
    error : Error;

    constructor(obj?: Partial<Message>) {
        if (obj) {
          Object.assign(this, obj);
        }
      }
}



import { Adress } from './adress';
import { Comment } from './comment';

export class Business {
  id: number;
  name: string;
  sector: string;
  siret: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  website2: string;
  adress: Adress;
  comments: Comment [];
  nbStar: number;

  constructor(obj?: Partial<Business>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

}

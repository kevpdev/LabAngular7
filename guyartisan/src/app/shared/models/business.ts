import { Adress } from './adress';
import { Comment } from './comment';

export class Business {
  id: Long;
  name: string;
  siret: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  website2: string;
  adress: Adress;
  comments: Comment [];
  nbStar: number;

}

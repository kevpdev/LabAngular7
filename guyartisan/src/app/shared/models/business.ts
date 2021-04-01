import { Adress } from './adress';
import { Comment } from './comment';

export class Business {
  id: string;
  name: string;
  sector: string;
  job?: string;
  siret: string;
  phone1: string;
  phone2?: string;
  email: string;
  website: string;
  website2?: string;
  adress: Adress;
  comments?: Comment [];
  nbStar?: number;
  logo?: any;
  openingHours?: string;

  constructor(obj?: Partial<Business>) {
    if (obj) {
      Object.assign(this, obj, {
        // adress: Object.assign({}, obj.adress)
      });

    }
  }

}

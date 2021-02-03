export class Adress {

  nameStreet: string;
  additionalAdress: string;
  zipCode: string;
  city: string;
  pays: string;


  constructor(obj?: Partial<Adress>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }


}

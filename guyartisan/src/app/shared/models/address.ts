export class Address {

  nameStreet: string;
  additionalAddress: string;
  zipCode: string;
  city: string;
  pays: string;


  constructor(obj?: Partial<Address>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }


}

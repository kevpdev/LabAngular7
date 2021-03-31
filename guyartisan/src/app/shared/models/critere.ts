export class Critere {

    sector: string;
    job: string;
    city: string;


    constructor(obj?: Partial<Critere>) {
        if (obj) {
          Object.assign(this, obj);
        }
      }
}

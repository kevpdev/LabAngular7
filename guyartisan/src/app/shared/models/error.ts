export class Error {
    code: string;
    message : string;

    constructor(obj?: Partial<Error>){
        if(obj){
            Object.assign(this, obj);            
        }
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Error } from 'src/app/shared/models/error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorHandlerService {

  errorSource = new BehaviorSubject<Error>(new Error());
  constructor(private router: Router) { }

  errorHandler(error: Error){

    console.error(error);

    let err = new Error();
    err.code = error.code;
    err.message = error.message;
    
    this.errorSource.next(err);

    this.router.navigate(['error']);

  }


}

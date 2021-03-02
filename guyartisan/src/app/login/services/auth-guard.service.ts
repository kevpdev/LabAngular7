import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { rejects } from 'assert';
import { resolve } from 'dns';
import firebase from 'firebase';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   return new Promise(
     (resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (userSession) => {
          if(userSession){
            resolve(true);
          }else{
            this.router.navigate(['/home']);
            resolve(false);
          }
        }
      );
     }
   );
  }
}

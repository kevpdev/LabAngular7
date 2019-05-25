import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn : boolean
  constructor(private authenticationService : AuthentificationService) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.loggedIn = true;
        }else{
          this.loggedIn = false;
        }
      }
    );
  }

  onSignOut(){
    this.authenticationService.signOutUser();
  }

}

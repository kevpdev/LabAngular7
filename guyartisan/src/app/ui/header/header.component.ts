import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggin = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user){
          console.log(user)
          this.loggin = true;
          console.log(this.loggin);
          console.log(user);
        }else{
          this.loggin = false;
          console.log(this.loggin);
        }
      }
    );

  }

  signOutUser(){
    firebase.auth().signOut();
    this.router.navigate(['home']);
  }

  signIn(){
    this.router.navigate(['login']);
  }



}

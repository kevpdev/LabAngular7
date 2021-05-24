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
      (user) => {
        if (user) {
          this.loggin = true;
        } else {
          this.loggin = false;
        }
      }
    );

  }

  signOutUser() {
    firebase.auth().signOut();
    this.router.navigate(['home']);
  }

  signin() {
    this.router.navigate(['login']);
  }

}

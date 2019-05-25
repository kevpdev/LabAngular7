import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router} from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  adminSignInForm : FormGroup;
  errMsg : String;

  constructor(private formBuilder: FormBuilder,
     private authenticationService : AuthentificationService,
     private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.adminSignInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password :['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
/* onAuth methode template
  onAuth(form : NgForm){
    const email = form.value['email'];
    const password = form.value['password'];
    console.log(email+' '+password)
  }

  */

  onAuth(){
    const email = this.adminSignInForm.get('email').value;
    const password =this.adminSignInForm.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/admin', 'dashboard']);
      },
      (error) =>{
      this.errMsg = "error"
       alert(this.errMsg);
    });
  }

}

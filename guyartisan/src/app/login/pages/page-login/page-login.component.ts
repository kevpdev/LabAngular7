import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(13)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitLoginForm(){
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    console.log('email : ', email);
    console.log('password : ', password);

    this.loginService.SignInUser(email, password).then(
      () => {
        this.router.navigate(['business']);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

  signUp(){
    this.router.navigate(['signup']);
  }

}

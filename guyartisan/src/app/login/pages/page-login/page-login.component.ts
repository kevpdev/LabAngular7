import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorHandlerService } from 'src/app/error/services/firebase-error-handler.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidsignin = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private errorService: FirebaseErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(13)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitLoginForm() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.loginService.signinUser(email, password).then(
      () => {
        this.router.navigate(['business']);
      }
    ).catch(
      (error) => {
        console.error(error);
        if (error.code == "auth/wrong-password") {
          this.invalidsignin = true;
        } else {
            this.errorService.errorHandler(error);
        }
      }
    );

  }

  signUp() {
    this.router.navigate(['signup']);
  }

  forgotYourPassword() {
    this.router.navigate(['send-reset-pwd']);
  }

}

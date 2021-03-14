import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ConfirmedValidator } from 'src/app/shared/utils/Validators';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.scss']
})
export class PageSignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.initLoginForm();
  }

  initLoginForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required], 
    },{
      validator: ConfirmedValidator('password', 'passwordConfirmation') 
      } as AbstractControlOptions
    );
  }

  get f(){
    return this.signUpForm.controls;
  }

  onSubmitSignupForm(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    console.log('email : ', email);
    console.log('password : ', password);

    this.loginService.SignUpUser(email, password).then(
      success => {
        this.router.navigate(['business']);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

}

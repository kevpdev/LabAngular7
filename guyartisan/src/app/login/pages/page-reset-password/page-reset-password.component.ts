import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Error } from 'src/app/shared/models/error';
import { Message } from 'src/app/shared/models/message';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {

  sendEmailResetPwdForm: FormGroup;
  invalidForm = false;
  message: string;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private utilsService: UtilsService,
    private router: Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.sendEmailResetPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(13)]]
    })
  }

  onSubmitSendEmailResetPwdForm() {
    const email = this.sendEmailResetPwdForm.get('email').value;
    let message = new Message();
    this.loginService.sendPasswordReset(email).then(() => {
      this.message = 'Un mail a été envoyé à votre adresse. Veuillez vérifier votre boite de réception.';

      message.content = this.message;
      this.utilsService.sendMessage(message);

    }).catch((error) => {

      console.error(error);

      let err = new Error();
      err.code = error.code;
      err.message = error.message;
      message.error = err;

      this.utilsService.sendMessage(message);

    }).finally(() => {
      this.router.navigate(['confirm-send-reset-pwd']);
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-page-confirm-send-reset-password',
  templateUrl: './page-confirm-send-reset-password.component.html',
  styleUrls: ['./page-confirm-send-reset-password.component.scss']
})
export class PageConfirmSendResetPasswordComponent implements OnInit {
  
  message: string;
  error = false;
  constructor(
  private router: Router,
  private utilsService: UtilsService) { }

  ngOnInit(): void {
    
  this.utilsService.messageSource.subscribe(data => {
    if(data){
      this.message = data.content;
      this.error = data.error;
    }
  })
  }

  signin(){
    this.router.navigate(['signin']);
  }

}

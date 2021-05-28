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
  code: string;
  constructor(
  private router: Router,
  private utilsService: UtilsService) { }

  ngOnInit(): void {
    
  this.utilsService.messageSource.subscribe(data => {
    if(data){
      console.log(data);
      if(!data.error){
        this.message = data.content;
      }else{
        this.message = data.error.message;
        this.code = data.error.code;
        this.error = true;
      }
      
    }
  })
  }

  signin(){
    this.router.navigate(['signin']);
  }

}

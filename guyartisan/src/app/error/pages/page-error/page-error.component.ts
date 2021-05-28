import { Component, OnInit } from '@angular/core';
import { FirebaseErrorHandlerService } from '../../services/firebase-error-handler.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  code: string;
  message: string;
  constructor(private errorService: FirebaseErrorHandlerService) { }

  ngOnInit(): void {

    this.errorService.errorSource.subscribe(error => {
      if(error){
        this.code = error.code;
        this.message = error.message;
      }
    })

  }

}

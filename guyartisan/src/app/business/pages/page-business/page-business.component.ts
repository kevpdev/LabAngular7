import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseErrorHandlerService } from 'src/app/error/services/firebase-error-handler.service';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../../business.module';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-page-business',
  templateUrl: './page-business.component.html',
  styleUrls: ['./page-business.component.scss']
})
export class PageBusinessComponent implements OnInit {

  businesses: Business[] = [];


  enableEditBusiness = false;
  addBusiness = true;


  constructor(
    private businessService: BusinessService,
    private errorService: FirebaseErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.businessService.getBusinesses().subscribe(data => {
      this.businesses = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Business;
      });
      console.log(this.businesses);
      if (this.businesses.length > 0) {
        this.addBusiness = false;
        this.enableEdit();

      }
    });

  }

  onDeleteBusiness(index) {
    this.businessService.deleteBusiness(this.businesses[index])
      .catch(error => {
        this.errorService.errorHandler(error);
      }
      );
    this.enableEditBusiness = false;
  }

  enableEdit() {
    this.enableEditBusiness = this.businesses.length > 0;
  }

  onNavigate(website: string) {
    window.location.href = website;
  }

}

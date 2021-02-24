import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../../business.module';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-page-business',
  templateUrl: './page-business.component.html',
  styleUrls: ['./page-business.component.scss']
})
export class PageBusinessComponent implements OnInit, OnDestroy {

  businesses: Business[];
 // mainBusiness: Business;
  businessSubscription: Subscription;
  enableEditBusiness = false;


  constructor(
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.businessSubscription = this.businessService.businessesSubject.subscribe(
      (data: any) => {
        this.businesses = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.businessService.emitBusinesses();
 //   this.mainBusiness = this.businesses[0];
    console.log(this.businesses);

    this.enableEdit();


  }

  onDeleteBusiness(index){
    console.log(this.businesses.length);
    this.businessService.deleteBusiness(index);
    console.log(this.businesses.length);
    this.enableEditBusiness = false;
  }



  ngOnDestroy(){
    this.businessSubscription.unsubscribe();
  }

  enableEdit() {
    this.enableEditBusiness = this.businesses.length > 0;
  }

}

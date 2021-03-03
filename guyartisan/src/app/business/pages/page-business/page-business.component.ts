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

  businesses: Business[] =[];
 // mainBusiness: Business;
  businessSubscription: Subscription;
  enableEditBusiness = false;
  addBusiness = true;


  constructor(
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {

    this.businessSubscription = this.businessService.getBusinesses().subscribe( data => {
      this.businesses = data.map(e => {
        return {
         id: e.payload.doc.id,
         ...e.payload.doc.data()
       } as Business;
     });
      console.log(this.businesses);
      if (this.businesses.length > 0){
      this.addBusiness = false;
      this.enableEdit();

      }
   });

  }

  onDeleteBusiness(index){
    this.businessService.deleteBusiness(this.businesses[index]);
    this.enableEditBusiness = false;
  }



  ngOnDestroy(){
    this.businessSubscription.unsubscribe();
  }

  enableEdit() {
    this.enableEditBusiness = this.businesses.length > 0;
  }

}

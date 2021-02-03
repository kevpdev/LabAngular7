import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../../business.module';
import { BusinessService } from '../servces/business.service';

@Component({
  selector: 'app-page-business',
  templateUrl: './page-business.component.html',
  styleUrls: ['./page-business.component.scss']
})
export class PageBusinessComponent implements OnInit, OnDestroy {

  businesses: Business[];
  mainBusiness: Business;
  businessSubscription: Subscription;

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
    this.mainBusiness = this.businesses[0];
  }

  ngOnDestroy(){
    this.businessSubscription.unsubscribe();
  }

}

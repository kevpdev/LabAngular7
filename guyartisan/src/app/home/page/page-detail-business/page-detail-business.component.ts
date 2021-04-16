import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-page-detail-business',
  templateUrl: './page-detail-business.component.html',
  styleUrls: ['./page-detail-business.component.scss']
})
export class PageDetailBusinessComponent implements OnInit {

  businessSubscription: Subscription;
  business: Business;
  test: string;
  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    this.test = 'test';
    this.route.params.subscribe(params =>{
      console.log(params);
      this.homeService.getBusinessById(params.id);
      this.businessSubscription = this.homeService.businessSubject.subscribe(data =>{
       this.business = data;
      });
    });
  }

}

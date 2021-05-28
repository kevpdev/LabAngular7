import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/models/address';
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
  address: Address;
  test: string;
  @ViewChild('commentSpace') commentSpace: ElementRef;

  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    this.test = 'test';
    this.route.params.subscribe(params => {
      this.homeService.getBusinessById(params.id);
      this.businessSubscription = this.homeService.businessSubject.subscribe(data => {
        if (data) {
          this.business = data;
          this.address = this.business.address;
        }
      });
    });
  }

  onFocus() {
    this.commentSpace.nativeElement.focus();
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Critere } from 'src/app/shared/models/critere';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-page-result-search',
  templateUrl: './page-result-search.component.html',
  styleUrls: ['./page-result-search.component.scss']
})
export class PageResultSearchComponent implements OnInit, OnChanges {

 @Input() businesses: Business[];
 @Output () nItem: EventEmitter<any> = new EventEmitter();
  businessesSubscription: Subscription;
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('init');
    console.log('result search');
    this.route.params.subscribe((params) =>{
      console.log(params);
      let critere = new Critere();
      critere.sector = params.sector;
      critere.city = params.city;
      critere.job = params.job;
      console.log(critere);

       this.homeService.getBusinessByCritere(critere);
       this.businessesSubscription = this.homeService.businessesSubject.subscribe(data => {
       this.businesses = data;
       console.log(this.businesses);
       });

    });
   // this.getResultSearch();
    
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.businesses = [];
    console.log('change : ');
    //this.getResultSearch();
   // this.businesses
  }

  // getResultSearch(){
  //   console.log('result search');
  //   this.route.params.subscribe((params) =>{
  //     console.log(params);
  //     let critere = new Critere();
  //     critere.sector = params.sector;
  //     critere.city = params.city;
  //     critere.job = params.job;
  //     console.log(critere);

  //      this.homeService.getBusinessByCritere(critere);
  //      this.businessesSubscription = this.homeService.businessesSubject.subscribe(data => {
  //      this.businesses = data;
  //      console.log(this.businesses);
  //      });

  //   });
  // }

  getBusiness(index: string){
    console.log(index);
  }

}

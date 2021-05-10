import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() nItem: EventEmitter<any> = new EventEmitter();
  businessesSubscription: Subscription;
  pageSize = 5;
  collectionPageSize = 0;
  page = 1;
  paginationData: Business[];

  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) {
    console.log('coucou');
   }

  ngOnInit(): void {
    console.log('init');
    console.log('result search');


    this.route.params.subscribe((params) => {
      console.log(params);
      let critere = new Critere();
      critere.sector = params.sector;
      critere.city = params.city;
      critere.job = params.job;
      console.log(critere);

      this.homeService.getBusinessByCriteria(critere);

      this.businessesSubscription = this.homeService.businessesSubject.subscribe(data => {
        console.log(data.length, data);
        this.businesses = [];
        this.paginationData = [];
        
        if (data.length > 0) {
          console.log('ici');
          this.businesses = data;
          this.collectionPageSize = this.businesses.length;
          this.getPaginationData();
        }

      });

    });
    // this.getResultSearch();
    

  }

  ngOnChanges(changes: SimpleChanges) {
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

  getBusiness(index: string) {
    console.log(index);
    this.router.navigate(['home/business', index]);
  }

  getPaginationData() {
    console.log(this.businesses);
    this.paginationData = this.businesses
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    console.log(this.paginationData);

  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class PageResultSearchComponent implements OnInit {

  @Input() businesses: Business[];
  @Output() nItem: EventEmitter<any> = new EventEmitter();
  businessesSubscription: Subscription;
  pageSize = 5;
  collectionPageSize = 0;
  page = 1;
  paginationData: Business[] = [];
  initializeComponent = true;

  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let critere = new Critere();
      critere.sector = params.sector;
      critere.city = params.city;
      critere.job = params.job;

      //required data test
      if (critere.sector && critere.city) {
        this.homeService.getBusinessByCriteria(critere)
        .catch((error) => {
          console.error('Catch error : ', error);
        }).finally(() =>{
          this.initializeComponent = false;          
        });

        this.businessesSubscription = this.homeService.businessesSubject.subscribe(data => {
          this.businesses = [];
          this.paginationData = [];
          this.initializeComponent = false;
          if (data.length > 0) {
            this.businesses = data;
            this.collectionPageSize = this.businesses.length;

            //tri
            if (this.businesses.length > 0) {
              this.businesses.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                } else {
                  return -1;
                }
              });
            }
            this.getPaginationData();
          }
        },
          error => {
            console.log('Error service: ' + error);
          });

      } else {
        this.initializeComponent = false;
        this.businesses = [];
        this.paginationData = [];
      }
    });
  }


  getBusiness(index: string) {
    this.router.navigate(['home/business', index]);
  }

  getPaginationData() {
    this.paginationData = this.businesses
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

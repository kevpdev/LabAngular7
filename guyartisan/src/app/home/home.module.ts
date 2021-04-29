import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageResultSearchComponent } from './page/page-result-search/page-result-search.component';
import { PageSearchComponent } from './page/page-search/page-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { PageDetailBusinessComponent } from './page/page-detail-business/page-detail-business.component';
import { PageCommentSpaceComponent } from './page/page-comment-space/page-comment-space.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { PageMapComponent } from './page/page-map/page-map.component';


@NgModule({
  declarations: [PageResultSearchComponent, PageSearchComponent, PageHomeComponent, PageDetailBusinessComponent, PageCommentSpaceComponent, PageMapComponent],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    NgbRatingModule,
    NgbPaginationModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyButSfdS4GtoB3hW6REpzDEyd2oOlauPPQ'})
  ],
  providers: [DatePipe, GoogleMapsAPIWrapper],
})
export class HomeModule { }

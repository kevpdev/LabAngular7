import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageResultSearchComponent } from './page/page-result-search/page-result-search.component';
import { PageSearchComponent } from './page/page-search/page-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { PageDetailBusinessComponent } from './page/page-detail-business/page-detail-business.component';
import { PageCommentSpaceComponent } from './page/page-comment-space/page-comment-space.component';
import { NgbRating, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PageResultSearchComponent, PageSearchComponent, PageHomeComponent, PageDetailBusinessComponent, PageCommentSpaceComponent],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    NgbRatingModule
  ],
  providers: [DatePipe],
})
export class HomeModule { }

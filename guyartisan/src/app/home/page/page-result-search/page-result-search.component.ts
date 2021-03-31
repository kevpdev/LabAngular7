import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/shared/models/business';
import { Critere } from 'src/app/shared/models/critere';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-page-result-search',
  templateUrl: './page-result-search.component.html',
  styleUrls: ['./page-result-search.component.scss']
})
export class PageResultSearchComponent implements OnInit {

  businessess: Business[];
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      console.log(params);
      let critere = new Critere();
      critere.sector = params.sector;
      critere.city = params.city;
      critere.job = params.job;
      console.log(critere);

       this.homeService.getBusinessByCritere();

    })
   
  }

}

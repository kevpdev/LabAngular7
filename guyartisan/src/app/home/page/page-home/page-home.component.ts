import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  enableHeader = true;

  constructor() {
  }
  

  ngOnInit(): void {

  }


  hideHeader(event: any){
    console.log('HIDEHEADER', event);
    this.enableHeader = false;
    console.log(this.enableHeader);
  }

}

import { Component, OnInit } from '@angular/core';

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

  hideHeader(event: any) {
    this.enableHeader = false;
  }

  offClickHandler() {
    console.log('out');
  }

}

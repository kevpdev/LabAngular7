import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from '../models/Property.model';
import { PropertiesService } from '../services/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties : Property[];
  propertiesSubscription : Subscription;

  constructor(private propertiesServices : PropertiesService,
    private router : Router) { }

  ngOnInit() {
    this.propertiesSubscription = this.propertiesServices.propertiesSubject.subscribe(
      (properties : Property[]) => {
        this.properties = properties;
      }
    );
    this.propertiesServices.getProperties();
    this.propertiesServices.emitProperties();
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }

  onViewProperty(id : number){
    this.router.navigate(['/property', id])  }

}

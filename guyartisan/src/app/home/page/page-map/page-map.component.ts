import { AgmMap, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/shared/models/address';


declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}


@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.scss']
})


export class PageMapComponent implements OnInit {

  geocoder: any;
  @Input() address: Address;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 15
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    
  }


  ngOnInit(): void {
    this.location.marker.draggable = true;
    console.log(this.address);

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      console.log(this.geocoder);

      if(this.address){
        this.findaddress(this.address);
      }
    });

  }

  findaddress(address: Address){
    const fulladdress = this.formataddress(address);
    console.log(fulladdress);

    // console.log(this.geocoder);
    // if(this.geocoder){
    //   this.geocoder.geocode({
    //     'address': fulladdress
    //   }, (results, status) => {
    //     console.log(results);
    //     if(status == google.GeocoderStatus.OK){
  
    //     }else{
    //       alert("Sorry, this search produced no results.");
    //     }
    //   })      
    // } 

  }

  formataddress(address: Address){
    let fullAdrs = address.nameStreet || "";
    if(address.additionalAddress) fullAdrs = fullAdrs + " " + address.additionalAddress;
    if(address.city) fullAdrs += " " + address.city;
    if(address.zipCode) fullAdrs += " " + address.zipCode;

    return fullAdrs;
  }

}

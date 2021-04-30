import { AgmMap, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { preProcessFile } from 'typescript';


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
  resultAdress: any;
  //public location: Location;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 12
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(private utilsService: UtilsService, private mapsApiLoader: MapsAPILoader,
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
    this.utilsService.getInfoAddress(fulladdress).subscribe(data => {
      console.log(data);
      console.log(data.features[0].properties);
      this.resultAdress = data;
       
      if(this.resultAdress){   
        let coordinates = this.resultAdress.features[0].geometry.coordinates;
        console.log(coordinates);
        if(coordinates){          
          this.location = {
            lat: coordinates[1],
            lng: coordinates[0],
            marker: {
              lat: coordinates[1],
              lng: coordinates[0],
              draggable: true
            },
            zoom: 15
          };
        }     

      }

    })


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
    if(address.pays) fullAdrs += " " + address.pays;

    return fullAdrs;
  }

}

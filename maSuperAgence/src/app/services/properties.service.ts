import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Property} from '../models/Property.model';
import { Subject } from 'rxjs'; // librairie pour faire de la programmation réactive

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties : Property[] = [];
  propertiesSubject = new Subject<Property[]>(); // Observable
  constructor() { }

  /**
   * Emettre la liste des biens immobiliers
   */
  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  /**
   * Sauvegarder la liste des biens immobiliers
   */
  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  /**
   * Creer un bien immobiliers
   * 
   * @param newProperty nouveau bien
   */
  createProperty(newProperty : Property){
    this.properties.push(newProperty);
    this.saveProperties();
    this.emitProperties();
  }

  /**
   * Supprimer un bien immobiliers
   * 
   * @param property Supprimer 
   */
  removeProperty(property : Property){

  }
  
  /***
   * Récuperer la listes des bien immobiliers
   */
  getProperties(){
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

}

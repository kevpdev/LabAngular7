import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Property} from '../models/Property.model';
import { Subject } from 'rxjs'; // librairie pour faire de la programmation réactive
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties : Property[] = [];
  propertiesSubject = new Subject<Property[]>(); // Observable et observer a la fois
  constructor() { }

  /**
   * Emettre la liste des biens immobiliers (observer)
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
    const index = this.properties.findIndex(
      (propertyElement) => {
        if(propertyElement === property){
          return true;
        }
      }
    );
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
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

  updateProperty(property : Property, id : number){
    firebase.database().ref('/properties/'+ id).update(property);
  }

  uploadFile(file : File){
    console.log(file);
    return new Promise(
      (resolve, reject) => {
        const uniqueID = Date.now().toString();
        const upload = firebase.storage().ref().child('images/properties/'+ uniqueID + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading...');
          },
          (error) =>{
            console.log('Error ! : '+ error);
            console.log('Error  mess ! : '+ error.message);
            reject();
          },
          () =>{
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              resolve(downloadURL);
            });
          })
      }
    );      
    }


    removePropertyPhoto(photoLink : string){
      if(photoLink){
        const storageRef = firebase.storage().refFromURL(photoLink);
        storageRef.delete().then(
          () => {
            console.log('File deleted');
          }
        ).catch(
          (error) =>{
            console.log('File not found ! ' + error);
          }
        )
      }
    }


}

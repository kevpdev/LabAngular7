import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
//import JsonSectors from '../../../assets/sectors.json';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private VICOPO_SEARCH_URI = "https://vicopo.selfbuild.fr/cherche/";
  private SEARCH_ADDRESS_API_URI = "https://api-adresse.data.gouv.fr/search/?q=";
  messageSource = new BehaviorSubject<Message>(new Message());

  constructor(private httpClient: HttpClient) { }

  /**
   * returns an array containing a zip code and city's name. 
   * @param input 
   * @returns 
   */
  public getCities(input: any): Observable<any>{
    return this.httpClient.get(this.VICOPO_SEARCH_URI+input);
  }

  getSectors(){
    return this.httpClient.get('../../../assets/sectors.json');
  }

  public getInfoAddress(address: string): Observable<any>{
    return this.httpClient.get(this.SEARCH_ADDRESS_API_URI+address);
  }

  sendMessage(message: Message){
    return this.messageSource.next(message);
  }
}

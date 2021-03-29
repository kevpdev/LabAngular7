import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import JsonSectors from '../../../assets/sectors.json';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private VICOPO_SEARCH_URI = 'https://vicopo.selfbuild.fr/cherche/';

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
}

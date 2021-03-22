import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cpuUsage } from 'process';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  homeSearchForm: FormGroup;
  cities: any[];
  constructor(private formBuilder: FormBuilder, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.homeSearchForm = this.formBuilder.group({
      searchSector: [''],
      searchCity: ['']
    })
  }

  onSubmitHomeSearchForm(){
    const sector = this.homeSearchForm.get('searchSector').value;
    const city = this.homeSearchForm.get('searchCity').value;
      console.log(sector, city);
  }

  getCityKeyPress(event){
    console.log('event zipcode ici');
    let input = event.target.value;
    let inputDomFilter = input.substring(0,2) === '97';
    if(input.length > 1){
      console.log('ici');
      this.utilsService.getCities(input).subscribe((data: any) => {    
        this.cities = data.cities;
        console.log(this.cities);
      })      
    }


  }

}

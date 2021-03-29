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
  sectors: any[];
  jobs: any[];
  constructor(private formBuilder: FormBuilder, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initForm();

    this.utilsService.getSectors().subscribe((data: any[]) =>{
     this.sectors = data;
    })
  }

  initForm(){
    this.homeSearchForm = this.formBuilder.group({
      searchSector: [''],
      searchCity: [''],
      searchJob: ['']
    })
  }

  onSubmitHomeSearchForm(){
    const sector = this.homeSearchForm.get('searchSector').value;
    const job = this.homeSearchForm.get('searchJob').value;
    const city = this.homeSearchForm.get('searchCity').value;
    console.log(sector, job, city);
  }

  getCityKeyPress(event){
    let input = event.target.value;
    let inputDomFilter = input.substring(0,2) === '97';
    if(input.length > 1){
      this.utilsService.getCities(input).subscribe((data: any) => {    
        this.cities = data.cities;
      })      
    }

  }

  onCitySelected(event){
    const cityValue = event.target.innerHTML
    this.homeSearchForm.get('searchCity').setValue(cityValue);
  }

  onChangeSector(event){
    const sectorSelectValue = event.target.value;
    this.jobs = this.sectors[sectorSelectValue].jobs;

  }

}

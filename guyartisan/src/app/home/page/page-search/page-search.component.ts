import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Critere } from 'src/app/shared/models/critere';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit {

  homeSearchForm: FormGroup;
  cities: any[];
  sectors: any[];
  jobs: any[];
  @Output () nItem: EventEmitter<any> = new EventEmitter();
  @Input() enableHeader: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.enableHeader);
    this.utilsService.getSectors().subscribe((data: any[]) =>{
     this.sectors = data;
    })
  }

  initForm(){
    this.homeSearchForm = this.formBuilder.group({
      searchSector: ['', Validators.required],
      searchCity: ['', Validators.required],
      searchJob: ['']
    });
  }

  onSubmitHomeSearchForm(){
    const indexSector = this.homeSearchForm.get('searchSector').value;
    const sector = this.sectors[indexSector].sectorName;
    const job = this.homeSearchForm.get('searchJob').value;
    //const city = this.homeSearchForm.get('searchCity').value;
    const city = '97300 CAYENNE';
    console.log(this.route);
    this.router.navigate(['search', sector, job, city], {relativeTo: this.route.parent})
    .catch( error => {
      console.log(error);
    });
    
  }

  getCityKeyPress(event){
    let input = event.target.value;
    let inputDomFilter = input.substring(0,2) === '97';
    if(input.length > 0){
      this.utilsService.getCities(input).subscribe((data: any) => { 
        console.log(data);  
        this.cities = data.cities;
      })      
    }

  }

  onCitySelected(event){
    const cityValue = event.target.innerHTML
    this.homeSearchForm.get('searchCity').setValue(cityValue);
    this.cities = [];
  }

  onChangeSector(event){
    const sectorSelectValue = event.target.value;
    this.jobs = this.sectors[sectorSelectValue].jobs;
    

  }


}

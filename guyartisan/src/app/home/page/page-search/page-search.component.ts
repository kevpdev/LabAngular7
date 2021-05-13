import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() nItem: EventEmitter<any> = new EventEmitter();
  @Input() enableHeader: boolean;
  citySuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.enableHeader);
    this.utilsService.getSectors().subscribe((data: any[]) => {
      this.sectors = data;
    })
  }

  initForm() {
    this.homeSearchForm = this.formBuilder.group({
      searchSector: ['', Validators.required],
      searchCity: ['', Validators.required],
      searchJob: ['']
    });
  }

  onSubmitHomeSearchForm() {
    let indexSector = this.homeSearchForm.get('searchSector').value;
    let sector = this.sectors[indexSector].sectorName;
    let job = this.homeSearchForm.get('searchJob').value;
    let city = this.citySuccess ? this.homeSearchForm.get('searchCity').value : "";

    console.log(this.cities, city);
    this.router.navigate(['search', sector, job, city], { relativeTo: this.route.parent })
      .catch(error => {
        console.log(error);
      });
  }

  getCityKeyPress(event) {
    this.citySuccess = false;
    let input = event.target.value;
    let inputDomFilter = input.substring(0, 2) === '97';
    if (input.length > 0) {
      this.utilsService.getCities(input).subscribe((data: any) => {
        console.log(data);
        if(data && data.cities.length > 0){
         this.citySuccess = true;
          this.cities = data.cities;
        }
      })
    }

  }

  onCitySelected(event) {
    const cityValue = event.target.innerHTML;
    this.homeSearchForm.get('searchCity').setValue(cityValue);
    this.cities = [];
  }

  onChangeSector(event) {
    const sectorSelectValue = event.target.value;
    this.jobs = this.sectors[sectorSelectValue].jobs;
  }


}

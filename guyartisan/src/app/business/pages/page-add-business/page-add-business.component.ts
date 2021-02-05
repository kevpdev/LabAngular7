import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress } from 'src/app/shared/models/adress';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../servces/business.service';

@Component({
  selector: 'app-page-add-business',
  templateUrl: './page-add-business.component.html',
  styleUrls: ['./page-add-business.component.scss']
})
export class PageAddBusinessComponent implements OnInit {

  businessForm: FormGroup;
  sectors: string[];
  days: string [];
  hours: number [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private businessService: BusinessService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.sectors = ['Plombier', 'Carreleur', 'Charpentier', 'Electricien'];
    this.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  }

  initForm(){
   this.businessForm =  this.formBuilder.group({
      businessName: [''],
      sector: [''],
      siret: [''],
      phone: [''],
      adress: [''],
      additionalAdress: [''],
      zipCode: [''],
      city: [''],
      pays: [''],
      email: [''],
      website: ['']
      // dayA: [''],
      // dayB: [''],
      // hourA: [''],
      // hourB: ['']

    });
  }

  onSaveBusiness(){
     const newBusiness = new Business();
     newBusiness.name = this.businessForm.get('businessName').value;
     newBusiness.sector = this.businessForm.get('sector').value;
     newBusiness.siret = this.businessForm.get('siret').value;
     newBusiness.phone1 = this.businessForm.get('phone').value;
     const newAdress = new Adress();
     newAdress.nameStreet = this.businessForm.get('adress').value;
     newAdress.additionalAdress = this.businessForm.get('additionalAdress').value;
     newAdress.zipCode = this.businessForm.get('zipCode').value;
     newAdress.city = this.businessForm.get('city').value;
     newAdress.pays = this.businessForm.get('pays').value;
     newBusiness.adress = newAdress;
     newBusiness.email = this.businessForm.get('email').value;
     newBusiness.website = this.businessForm.get('website').value;

     console.log('newBusiness : ', newBusiness);
     this.businessService.createBusiness(newBusiness);
     console.log(this.businessService.businesses);
     this.router.navigate(['/business']);
  }

  getHours(maxRange: number, minRange){

    this.hours = Array(maxRange - minRange + 1).fill(minRange).map((x, y) => x + y)
    //y is a increment number and x is a minRange

  }

}

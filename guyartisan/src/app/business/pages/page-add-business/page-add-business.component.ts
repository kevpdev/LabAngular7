import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder
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
      email: [''],
      website: ['']
      // dayA: [''],
      // dayB: [''],
      // hourA: [''],
      // hourB: ['']

    });
  }

  onSaveBusiness(){
    console.log(this.businessForm);
  }

  getHours(maxRange: number, minRange){

    this.hours = Array(maxRange - minRange + 1).fill(minRange).map((x, y) => x + y)
    //y is a increment number and x is a minRange

  }

}

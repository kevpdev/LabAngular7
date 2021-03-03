import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Adress } from 'src/app/shared/models/adress';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-page-form-business',
  templateUrl: './page-form-business.component.html',
  styleUrls: ['./page-form-business.component.scss']
})
export class PageFormBusinessComponent implements OnInit {

  businessForm: FormGroup;
  sectors: string[];
  days: string [];
  hours: number [];
  businessSubscription: Subscription;
  businesses: Business[];
  editBusiness = false;
  logoUpload: any;
  currentIdEdit: string;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.initForm();
    this.sectors = ['Plombier', 'Carreleur', 'Charpentier', 'Electricien'];
    this.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    if(this.route){
      this.route.params.subscribe(param =>
        {
        const id = param.id;

        if(id){
           this.businessService.getBusinesses().subscribe( data => {
            this.businesses = data.map(e => {
              return {
               id: e.payload.doc.id,
               ...e.payload.doc.data()
             } as Business;
           });
            this.initEditForm( this.businesses[id]);
         });
        }
      });
    }
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
      website: [''],
      businessLogo: ['']
      // dayA: [''],
      // dayB: [''],
      // hourA: [''],
      // hourB: ['']

    });
  }

  onSaveBusiness(){
     const newBusiness = new Business();

     newBusiness.name = this.businessForm.get('businessName').value || null;
     newBusiness.sector = this.businessForm.get('sector').value || null;
     newBusiness.siret = this.businessForm.get('siret').value || null;
     newBusiness.phone1 = this.businessForm.get('phone').value || null;
     newBusiness.logo = this.logoUpload || null;
     const newAdress = new Adress();
     newAdress.nameStreet = this.businessForm.get('adress').value || null;
     newAdress.additionalAdress = this.businessForm.get('additionalAdress').value || null;
     newAdress.zipCode = this.businessForm.get('zipCode').value || null;
     newAdress.city = this.businessForm.get('city').value || null;
     newAdress.pays = this.businessForm.get('pays').value || null;
     newBusiness.adress = Object.assign({}, newAdress) || null;
     newBusiness.email = this.businessForm.get('email').value || null;
     newBusiness.website = this.businessForm.get('website').value || null;
     newBusiness.id = this.currentIdEdit;

     console.log('newBusiness : ', newBusiness);
     if(this.editBusiness){
       this.businessService.updateBusiness(newBusiness);
     }else{
       this.businessService.createBusiness(newBusiness);
     }
     this.router.navigate(['/business']);
  }

  initEditForm(business: Business){
    console.log(business);
    this.businessForm.get('businessName').setValue(business.name);
    this.businessForm.get('sector').setValue(business.sector);
    this.businessForm.get('siret').setValue(business.siret);
    this.businessForm.get('phone').setValue(business.phone1);
    this.businessForm.get('adress').setValue(business.adress.nameStreet);
    this.businessForm.get('additionalAdress').setValue(business.adress.additionalAdress);
    this.businessForm.get('zipCode').setValue(business.adress.zipCode);
    this.businessForm.get('city').setValue(business.adress.city);
    this.businessForm.get('pays').setValue(business.adress.pays);
    this.businessForm.get('email').setValue(business.email);
    this.businessForm.get('website').setValue(business.website);
    this.logoUpload = business.logo;
    this.editBusiness = true;
    this.currentIdEdit = business.id;
  }

  handleFileInput(event){
    console.log(event);
    this.logoUpload = URL.createObjectURL(event.target.files.item(0));
    console.log( this.logoUpload);
  }

  getHours(maxRange: number, minRange){

    this.hours = Array(maxRange - minRange + 1).fill(minRange).map((x, y) => x + y)
    //y is a increment number and x is a minRange

  }

}

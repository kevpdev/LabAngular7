import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Adress } from 'src/app/shared/models/adress';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../servces/business.service';

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
        let id = param['id'];

        if(id){
          this.businessSubscription = this.businessService.businessesSubject.subscribe(
            (data: any) => {
              this.businesses = data;
            },
            (error) => {
              console.error(error);
            }
          );
          this.businessService.emitBusinesses();

          this.initEditForm( this.businesses[id]);
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
     newBusiness.id = 0;
     newBusiness.name = this.businessForm.get('businessName').value;
     newBusiness.sector = this.businessForm.get('sector').value;
     newBusiness.siret = this.businessForm.get('siret').value;
     newBusiness.phone1 = this.businessForm.get('phone').value;
     console.log(this.logoUpload);
     newBusiness.logo = this.logoUpload;
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
     if(this.editBusiness){
       this.businessService.updateBusiness(newBusiness);
     }else{
       this.businessService.createBusiness(newBusiness);
     }
     this.router.navigate(['/business']);
  }

  initEditForm(business: Business){
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

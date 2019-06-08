import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/models/Property.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

  propertyForm: FormGroup;
  properties: Property[];
  propertiesSubscription: Subscription; // Observateur
  editProperty: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.initForm();
    // ici propertiesSubject est un observable
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      properties => this.properties = properties
      // (properties : Property[]) => {
      //   this.properties = properties;
      // }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties()
  }

  initForm() {
    this.propertyForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['']
    });
  }

  onSaveProperty() {
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    const newProperty = new Property(title, category, surface, rooms, description);

    if (this.editProperty) {
      this.propertiesService.updateProperty(newProperty, id);
    } else {
      this.propertiesService.createProperty(newProperty); // sauvegarde
    }



    //reset form
    $('#propertiesFormModal').modal('hide');
    this.propertyForm.reset();
    this.editProperty = false;
  }

  /**
   * Destruction de l'observateur
   */
  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

  onDeleteProperty(property: Property) {
    this.propertiesService.removeProperty(property);
  }

  onEditProperty(property: Property, id: number) {
    $('#propertiesFormModal').modal('show');
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);
    this.editProperty = true;
  }

}

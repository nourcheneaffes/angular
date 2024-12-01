import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './add-apartment/add-apartment.component';



@NgModule({
  declarations: [
    ApartmentsComponent,
    ApartmentsByResidenceComponent,
    AddApartmentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApartmentsModule { }

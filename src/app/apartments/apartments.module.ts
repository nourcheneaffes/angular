import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './add-apartment/add-apartment.component';
import { ApartmentsRoutingModule } from './apartments-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApartmentsComponent,
    ApartmentsByResidenceComponent,
    AddApartmentComponent
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApartmentsModule { }

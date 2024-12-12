import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './add-apartment/add-apartment.component';

const routes: Routes = [
  { path: '', component: ApartmentsComponent }, // Default apartments route
  { path: 'add-apartment', component: AddApartmentComponent },
  { path: ':id/apartments', component: ApartmentsByResidenceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule {} 
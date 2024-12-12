import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ResidenceComponent } from './Residences/residence/residence.component';
import { ResidenceDetailsComponent } from './Residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './Residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './apartments/add-apartment/add-apartment.component';

const routes: Routes = [
  // Page d'accueil
  { path: 'home', component: HomeComponent },

  // Liste des résidences
  { path: 'residence', component: ResidenceComponent },

  // Détails d'une résidence spécifique (avec un paramètre id)
  { path: 'residences/:id', component: ResidenceDetailsComponent },

  // Ajouter une nouvelle résidence
  { path: 'add-residence', component: AddResidenceComponent },

  // Liste des appartements (page principale des appartements)
  { path: 'apartments', component: ApartmentsComponent },

  // Liste des appartements d'une résidence spécifique (avec un paramètre id)
  { path: 'residences/:id/apartments', component: ApartmentsByResidenceComponent },

  // Ajouter un nouvel appartement
  { path: 'add-apartment', component: AddApartmentComponent },

  // Redirection vers la page d'accueil par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Route pour les pages non trouvées
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
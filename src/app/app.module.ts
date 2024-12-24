import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // If you're using template-driven forms
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ApartmentsModule } from './apartments/apartments.module'; // Import ApartmentsModule
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ResidenceComponent } from './Residences/residence/residence.component';
import { ResidenceDetailsComponent } from './Residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './Residences/add-residence/add-residence.component';
import { HeaderComponent } from './header/header.component'; // Path to HeaderComponent
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ResidenceComponent,
    ResidenceDetailsComponent,
    AddResidenceComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Keep FormsModule if you're using template-driven forms
    ReactiveFormsModule, // Add ReactiveFormsModule here for reactive forms
    ApartmentsModule, // Add ApartmentsModule to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
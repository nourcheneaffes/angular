import { Component, OnInit } from '@angular/core';
import { Residence } from '../shared/models/residence.interface';
import { Apartment } from '../shared/models/apartment.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  residences: Residence[] = [];
  apartments: Apartment[] = [];
  searchText: string = '';
  userName: string = '';

  ngOnInit() {
    this.loadResidences();
    this.loadApartments();
    this.getUserName();
  }

  getUserName() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.username;
    }
  }

  loadResidences() {
    const storedResidences = localStorage.getItem('residences');
    if (storedResidences) {
      this.residences = JSON.parse(storedResidences);
    }
  }

  loadApartments() {
    const storedApartments = localStorage.getItem('apartments');
    if (storedApartments) {
      this.apartments = JSON.parse(storedApartments);
    }
  }

  filteredResidences() {
    return this.residences.filter(residence =>
      residence.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getApartmentsCount(residenceId: number): number {
    return this.apartments.filter(apt => apt.residence === residenceId).length;
  }

  getApartmentsByCategory(residenceId: number, category: string): number {
    return this.apartments.filter(
      apt => apt.residence === residenceId && apt.category === category
    ).length;
  }
}

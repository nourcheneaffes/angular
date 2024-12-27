import { Component, OnInit } from '@angular/core';
import { Residence } from '../core/models/residence.interface';
import { Apartment } from '../core/models/apartment.interface';
import { ResidenceService } from '../services/residence.service';

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

  constructor(private residenceService: ResidenceService) {}

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
    this.residenceService.getAllResidences().subscribe(residences => {
      this.residences = residences;
    });
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apartment } from '../shared/models/apartment.interface';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments = new BehaviorSubject<Apartment[]>([]);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const stored = localStorage.getItem('apartments');
    if (stored) {
      this.apartments.next(JSON.parse(stored));
    }
  }

  getAllApartments(): Observable<Apartment[]> {
    return this.apartments.asObservable();
  }

  getApartmentsByResidence(residenceId: number): Observable<Apartment[]> {
    return new Observable(observer => {
      this.apartments.subscribe(apartments => {
        observer.next(apartments.filter(apt => apt.residence === residenceId));
      });
    });
  }

  addApartment(apartment: Apartment): void {
    const currentApartments = this.apartments.value;
    const updatedApartments = [...currentApartments, apartment];
    localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    this.apartments.next(updatedApartments);
  }

  updateApartment(apartment: Apartment): void {
    const currentApartments = this.apartments.value;
    const index = currentApartments.findIndex(a => a.apartNum === apartment.apartNum);
    
    if (index !== -1) {
      const updatedApartments = [...currentApartments];
      updatedApartments[index] = apartment;
      localStorage.setItem('apartments', JSON.stringify(updatedApartments));
      this.apartments.next(updatedApartments);
    }
  }

  deleteApartment(apartNum: number): void {
    const updatedApartments = this.apartments.value.filter(a => a.apartNum !== apartNum);
    localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    this.apartments.next(updatedApartments);
  }

  deleteApartmentsByResidence(residenceId: number): void {
    const updatedApartments = this.apartments.value.filter(a => a.residence !== residenceId);
    localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    this.apartments.next(updatedApartments);
  }
} 
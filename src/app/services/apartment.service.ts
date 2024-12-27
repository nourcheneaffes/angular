import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apartment } from '../core/models/apartment.interface';


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments = new BehaviorSubject<Apartment[]>(ApartmentService.loadApartments());

  private static loadApartments(): Apartment[] {
    const stored = localStorage.getItem('apartments');
    return stored ? JSON.parse(stored) : [];
  }

  getAllApartments() {
    return this.apartments.asObservable();
  }

  addApartment(apartment: Apartment) {
    const current = this.apartments.value;
    this.apartments.next([...current, apartment]);
    localStorage.setItem('apartments', JSON.stringify(this.apartments.value));
  }

  updateApartment(apartment: Apartment) {
    const current = this.apartments.value;
    const updated = current.map(a => (a.apartNum === apartment.apartNum ? apartment : a));
    this.apartments.next(updated);
    localStorage.setItem('apartments', JSON.stringify(updated));
  }

  deleteApartment(apartNum: number) {
    const updated = this.apartments.value.filter(a => a.apartNum !== apartNum);
    this.apartments.next(updated);
    localStorage.setItem('apartments', JSON.stringify(updated));
  }

  deleteApartmentsByResidence(residenceId: number) {
    const updated = this.apartments.value.filter(a => a.residence !== residenceId);
    this.apartments.next(updated);
    localStorage.setItem('apartments', JSON.stringify(updated));
  }
} 
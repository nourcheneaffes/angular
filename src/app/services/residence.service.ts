import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Residence } from '../shared/models/residence.interface';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private defaultResidences: Residence[] = [
    { id: 1, name: 'El Fel', address: 'Borj Cedria', image: 'assets/images/R1.jpg', status: 'Disponible' },
    { id: 2, name: 'El Yasmine', address: 'Ezzahra', image: 'assets/images/R2.jpeg', status: 'Disponible' },
    { id: 3, name: 'El Arij', address: 'Rades', image: 'assets/images/R3.jpg', status: 'Vendu' },
    { id: 4, name: 'El Anber', address: 'Inconnu', image: 'assets/images/R4.jpg', status: 'En Construction' }
  ];

  private residences = new BehaviorSubject<Residence[]>([]);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const stored = localStorage.getItem('residences');
    if (stored) {
      this.residences.next(JSON.parse(stored));
    } else {
      this.residences.next(this.defaultResidences);
      localStorage.setItem('residences', JSON.stringify(this.defaultResidences));
    }
  }

  getAllResidences(): Observable<Residence[]> {
    return this.residences.asObservable();
  }

  getResidenceById(id: number): Residence | undefined {
    return this.residences.value.find(r => r.id === id);
  }

  addResidence(residence: Omit<Residence, 'id'>): void {
    const currentResidences = this.residences.value;
    const maxId = Math.max(...currentResidences.map(r => r.id), 0);
    const newResidence = { ...residence, id: maxId + 1 };
    
    const updatedResidences = [...currentResidences, newResidence];
    localStorage.setItem('residences', JSON.stringify(updatedResidences));
    this.residences.next(updatedResidences);
  }

  updateResidence(residence: Residence): void {
    const currentResidences = this.residences.value;
    const index = currentResidences.findIndex(r => r.id === residence.id);
    
    if (index !== -1) {
      const updatedResidences = [...currentResidences];
      updatedResidences[index] = residence;
      localStorage.setItem('residences', JSON.stringify(updatedResidences));
      this.residences.next(updatedResidences);
    }
  }

  deleteResidence(id: number): void {
    const updatedResidences = this.residences.value.filter(r => r.id !== id);
    localStorage.setItem('residences', JSON.stringify(updatedResidences));
    this.residences.next(updatedResidences);
  }
} 
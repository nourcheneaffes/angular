import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Residence } from '../core/models/residence.interface';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residences = new BehaviorSubject<Residence[]>(ResidenceService.loadResidences());

  private static loadResidences(): Residence[] {
    const stored = localStorage.getItem('residences');
    return stored ? JSON.parse(stored) : [];
  }

  getAllResidences() {
    return this.residences.asObservable();
  }

  addResidence(residence: Omit<Residence, 'id'>) {
    const current = this.residences.value;
    const newResidence = { ...residence, id: current.length ? Math.max(...current.map(r => r.id)) + 1 : 1 };
    this.residences.next([...current, newResidence]);
    localStorage.setItem('residences', JSON.stringify(this.residences.value));
  }

  updateResidence(residence: Residence) {
    const current = this.residences.value;
    const updated = current.map(r => (r.id === residence.id ? residence : r));
    this.residences.next(updated);
    localStorage.setItem('residences', JSON.stringify(updated));
  }

  deleteResidence(id: number) {
    const updated = this.residences.value.filter(r => r.id !== id);
    this.residences.next(updated);
    localStorage.setItem('residences', JSON.stringify(updated));
  }
} 
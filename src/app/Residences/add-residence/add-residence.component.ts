import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ResidenceService } from '../../services/residence.service';
import { ApartmentService } from '../../services/apartment.service';
import { Residence } from 'src/app/core/models/residence.interface';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm!: FormGroup;
  showNotification = false;
  notificationMessage = '';
  notificationType = '';
  residences: Residence[] = [];
  isEditing = false;
  selectedResidenceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private residenceService: ResidenceService,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.loadResidences();
    this.initForm();
  }

  initForm() {
    this.residenceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: [''],
      status: ['Disponible', Validators.required]
    });
  }

  loadResidences() {
    const storedResidences = localStorage.getItem('residences');
    if (storedResidences) {
      this.residences = JSON.parse(storedResidences);
    }
  }

  editResidence(residence: Residence) {
    this.isEditing = true;
    this.selectedResidenceId = residence.id;
    this.residenceForm.patchValue({
      name: residence.name,
      address: residence.address,
      image: residence.image,
      status: residence.status
    });
  }

  deleteResidence(residence: Residence) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la résidence ${residence.name}? Tous les appartements associés seront également supprimés.`)) {
      this.residenceService.deleteResidence(residence.id);
      this.apartmentService.deleteApartmentsByResidence(residence.id);
      this.showNotification = true;
      this.notificationMessage = 'Résidence et appartements associés supprimés avec succès!';
      this.notificationType = 'success';
      setTimeout(() => this.showNotification = false, 2000);
    }
  }

  onSubmit() {
    if (this.residenceForm.valid) {
      if (this.isEditing && this.selectedResidenceId) {
        this.residenceService.updateResidence({
          ...this.residenceForm.value,
          id: this.selectedResidenceId
        });
        this.notificationMessage = 'Résidence modifiée avec succès!';
      } else {
        this.residenceService.addResidence(this.residenceForm.value);
        this.notificationMessage = 'Résidence ajoutée avec succès!';
      }

      this.notificationType = 'success';
      this.showNotification = true;
      this.onReset();

      setTimeout(() => {
        this.showNotification = false;
        this.router.navigate(['/home']);
      }, 2000);
    }
  }

  onReset() {
    this.isEditing = false;
    this.selectedResidenceId = null;
    this.residenceForm.reset({
      status: 'Disponible'
    });
  }
}

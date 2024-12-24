import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Residence } from '../../shared/models/residence.interface';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidenceComponent implements OnInit {
  searchText: string = '';
  likeMessage: string = '';
  selectedResidence: Residence | null = null;
  residences: Residence[] = [];
  showEditModal = false;
  editForm: FormGroup;
  selectedResidenceId: number | null = null;

  // Définir les résidences par défaut
  defaultResidences: Residence[] = [
    { id: 1, name: 'El Fel', address: 'Borj Cedria', image: 'assets/images/R1.jpg', status: 'Disponible' },
    { id: 2, name: 'El Yasmine', address: 'Ezzahra', image: 'assets/images/R2.jpeg', status: 'Disponible' },
    { id: 3, name: 'El Arij', address: 'Rades', image: 'assets/images/R3.jpg', status: 'Vendu' },
    { id: 4, name: 'El Anber', address: 'Inconnu', image: 'assets/images/R4.jpg', status: 'En Construction' }
  ];

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      image: [''],
      status: ['Disponible', Validators.required]
    });
  }

  ngOnInit() {
    this.loadResidences();
  }

  loadResidences() {
    const storedResidences = localStorage.getItem('residences');
    let savedResidences: Residence[] = [];
    
    if (storedResidences) {
      savedResidences = JSON.parse(storedResidences);
      savedResidences = savedResidences.filter(r => r.id > 4);
    }

    this.residences = [...this.defaultResidences, ...savedResidences];
    localStorage.setItem('residences', JSON.stringify(this.residences));
  }

  editResidence(residence: Residence) {
    this.selectedResidenceId = residence.id;
    this.editForm.patchValue({
      name: residence.name,
      address: residence.address,
      image: residence.image,
      status: residence.status
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedResidenceId = null;
    this.editForm.reset();
  }

  saveEditedResidence() {
    if (this.editForm.valid && this.selectedResidenceId) {
      const updatedResidence = {
        ...this.editForm.value,
        id: this.selectedResidenceId
      };

      const index = this.residences.findIndex(r => r.id === this.selectedResidenceId);
      if (index !== -1) {
        this.residences[index] = updatedResidence;
        localStorage.setItem('residences', JSON.stringify(this.residences));
        this.closeEditModal();
      }
    }
  }

  deleteResidence(residence: Residence) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la résidence ${residence.name}?`)) {
      this.residences = this.residences.filter(r => r.id !== residence.id);
      localStorage.setItem('residences', JSON.stringify(this.residences));
    }
  }

  filteredResidences() {
    return this.residences.filter(residence =>
      residence.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showLocation(residence: Residence) {
    this.selectedResidence = this.selectedResidence === residence ? null : residence;
  }

  addFavoris(residence: Residence) {
    this.likeMessage = `Vous avez aimé la résidence ${residence.name}`;
    setTimeout(() => {
      this.likeMessage = '';
    }, 2000);
  }
}


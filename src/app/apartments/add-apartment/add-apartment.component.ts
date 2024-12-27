import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence.interface';


@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartForm!: FormGroup;
  residences: Residence[] = [];
  apartments: any[] = [];
  isEditing: boolean = false;
  selectedApartmentId: number | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  ngOnInit() {
    this.loadResidences();
    this.loadApartments();
  }

  initForm() {
    this.apartForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface: ['', Validators.required],
      terrace: ['yes', Validators.required],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.pattern('^[0-9]+$')],
      category: ['S+1', Validators.required],
      residence: ['', Validators.required]
    });

    this.apartForm.get('terrace')?.valueChanges.subscribe((terraceValue) => {
      const surfaceTerraceControl = this.apartForm.get('surfaceTerrace');
      if (terraceValue === 'yes') {
        surfaceTerraceControl?.enable();
        surfaceTerraceControl?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
      } else {
        surfaceTerraceControl?.disable();
        surfaceTerraceControl?.clearValidators();
      }
      surfaceTerraceControl?.updateValueAndValidity();
    });
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

  getResidenceName(residenceId: number): string {
    const residence = this.residences.find(r => r.id === residenceId);
    return residence ? residence.name : 'N/A';
  }

  editApartment(apartment: any) {
    this.isEditing = true;
    this.selectedApartmentId = apartment.apartNum;
    this.apartForm.patchValue({
      apartNum: apartment.apartNum,
      floorNum: apartment.floorNum,
      surface: apartment.surface,
      terrace: apartment.surfaceTerrace > 0 ? 'yes' : 'no',
      surfaceTerrace: apartment.surfaceTerrace,
      category: apartment.category,
      residence: apartment.residence
    });
  }

  deleteApartment(apartment: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet appartement ?')) {
      this.apartments = this.apartments.filter(a => a.apartNum !== apartment.apartNum);
      localStorage.setItem('apartments', JSON.stringify(this.apartments));
    }
  }

  onSubmit() {
    if (this.apartForm.valid) {
      const apartmentData = {
        ...this.apartForm.value,
        residence: Number(this.apartForm.value.residence),
        apartNum: Number(this.apartForm.value.apartNum),
        floorNum: Number(this.apartForm.value.floorNum),
        surface: Number(this.apartForm.value.surface),
        surfaceTerrace: this.apartForm.value.terrace === 'yes' ? Number(this.apartForm.value.surfaceTerrace) : 0
      };

      if (this.isEditing) {
        // Mode modification
        const index = this.apartments.findIndex(a => a.apartNum === this.selectedApartmentId);
        if (index !== -1) {
          this.apartments[index] = apartmentData;
        }
      } else {
        // Mode ajout
        this.apartments.push(apartmentData);
      }

      localStorage.setItem('apartments', JSON.stringify(this.apartments));
      this.onReset();
      this.router.navigate(['/residences', apartmentData.residence]);
    }
  }

  onReset() {
    this.isEditing = false;
    this.selectedApartmentId = null;
    this.apartForm.reset({
      terrace: 'yes',
      category: 'S+1'
    });
  }
} 

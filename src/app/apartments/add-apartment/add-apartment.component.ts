import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation after form submission

interface Residence {
  id: number;
  name: string;
  address: string;
  image: string;
  status: string;
}

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm: FormGroup;
  residences: Residence[] = [
    { id: 1, name: 'El Fel', address: 'Borj Cedria', image: '', status: 'Disponible' },
    { id: 2, name: 'El Yasmine', address: 'Ezzahra', image: '', status: 'Disponible' },
    { id: 3, name: 'El Arij', address: 'Rades', image: '', status: 'Vendu' },
    { id: 4, name: 'El Anber', address: 'Inconnu', image: '', status: 'En Construction' }
  ];

  constructor(private fb: FormBuilder, private router: Router) { // Inject Router
    this.apartForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface: ['', Validators.required],
      terrace: ['yes', Validators.required],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.pattern('^[0-9]+$')],
      category: ['S+1', Validators.required],
      residence: ['', Validators.required]
    });

    // Dynamically enable/disable surfaceTerrace based on terrace value
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

  onAdd() {
    if (this.apartForm.valid) {
      console.log('Apartment Data:', this.apartForm.value);
      // TODO: Implement actual data submission logic (e.g., via a service)
      
      // Navigate back to the apartments list after successful addition
      this.router.navigate(['/apartments']);
    } else {
      console.log('Form is invalid.');
    }
  }

  onReset() {
    this.apartForm.reset({
      terrace: 'yes',
      category: 'S+1'
    });
  }
}
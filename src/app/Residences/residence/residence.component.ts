import { Component } from '@angular/core';

interface Residence {
  id: number;
  name: string;
  address: string;
  image: string;
  status: string;
}

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidenceComponent {
  // Rechercher par nom
  searchText: string = ''; // Texte saisi pour la recherche

  // Propriété pour gérer la résidence sélectionnée
  selectedResidence: Residence | null = null;

  // Liste des résidences
  listResidences: Residence[] = [
    { id: 1, name: 'El Fel', address: 'Borj Cedria', image: 'assets/images/R1.jpg', status: 'Disponible' },
    { id: 2, name: 'El Yasmine', address: 'Ezzahra', image: 'assets/images/R2.jpeg', status: 'Disponible' },
    { id: 3, name: 'El Arij', address: 'Rades', image: 'assets/images/R3.jpg', status: 'Vendu' },
    { id: 4, name: 'El Anber', address: 'Inconnu', image: 'assets/images/R4.jpg', status: 'En Construction' }
  ];

  // Message de confirmation lors d'un like
  likeMessage: string = '';

  // Fonction pour afficher l'adresse
  showLocation(residence: Residence): void {
    if (residence.address === 'Inconnu') {
      alert('Adresse inconnue pour cette résidence');
    } else {
      this.selectedResidence = residence;
    }
  }

  // Fonction pour ajouter une résidence aux favoris
  addFavoris(residence: Residence): void {
    this.likeMessage = `${residence.name} a été ajoutée à vos favoris !`; // Message de confirmation
    setTimeout(() => (this.likeMessage = ''), 2000); // Efface le message après 2 secondes
  }

  // Fonction pour filtrer les résidences en fonction du nom
  filteredResidences(): Residence[] {
    if (!this.searchText) {
      return this.listResidences; // Si la recherche est vide, retourner toutes les résidences
    }
    return this.listResidences.filter(residence =>
      residence.name.toLowerCase().includes(this.searchText.toLowerCase()) // Filtrage insensible à la casse
    );
  }
}

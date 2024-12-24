import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from '../../shared/models/apartment.interface';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residenceId!: number;
  residenceName!: string;
  apartments: Apartment[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('id')!;
    const allApartments = JSON.parse(localStorage.getItem('apartments') || '[]');
    this.apartments = allApartments.filter((apt: Apartment) => 
      Number(apt.residence) === this.residenceId
    );
  }

  nextResidence(): void {
    this.router.navigate(['/residences', this.residenceId + 1]);
  }
}

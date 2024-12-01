import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residenceId!: number;
  residenceName!:string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('id')!;4
  }

  nextResidence(): void {
    this.router.navigate(['/residences', this.residenceId + 1]);
  }
}

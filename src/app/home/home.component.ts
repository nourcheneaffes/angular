import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  residences: { id: number; name: string; description: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    // Vous pouvez initialiser `residences` ici avec des données factices ou des données réelles.
    this.residences = [
      { id: 1, name: 'Residence El Fel', description: 'Description of Residence El Fel' },
      { id: 2, name: 'Residence El Yassmine', description: 'Description of Residence El Yassmine' },
      { id: 3, name: 'Residence El anber', description: 'Description of Residence El anber' }
    ];
  }
}

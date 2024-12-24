import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  showNotification = false;
  notificationMessage = '';
  notificationType = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addUser() {
    if (this.userForm.valid) {
      // Sauvegarder dans localStorage
      localStorage.setItem('userData', JSON.stringify(this.userForm.value));
      
      this.notificationMessage = 'User saved successfully!';
      this.notificationType = 'success';
      this.showNotification = true;
      
      // Rediriger vers home après 2 secondes
      setTimeout(() => {
        this.showNotification = false;
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.notificationMessage = 'Please fill all required fields correctly.';
      this.notificationType = 'error';
      this.showNotification = true;
    }
  }
}

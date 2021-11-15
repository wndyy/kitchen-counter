import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUserForm: FormGroup;

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      phone: [null, Validators.required]
    });
  }

  onSubmit() {
    this.service.registerUser(this.registerUserForm.value);
    this.router.navigate(['/']);
  }

}

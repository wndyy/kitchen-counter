import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginUserForm: FormGroup;

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginUserForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.service.logIn(this.loginUserForm.value.email, this.loginUserForm.value.password);
    this.router.navigate(['/']);
  }

}

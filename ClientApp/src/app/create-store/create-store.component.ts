import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {

  createStoreForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createStoreForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.minLength(20)])],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    // this.router.navigate(['/']);
  }

}

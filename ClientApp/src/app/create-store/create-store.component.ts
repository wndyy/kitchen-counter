import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {

  createStoreForm: FormGroup;
  image: any;

  constructor(private service: StoreService, private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.createStoreForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.minLength(30)])],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  getImage(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
          this.image = _event.target.result;
          console.log(this.image);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.createStoreForm.value.image = this.image;
    const JSONSubmit = this.createStoreForm.value;
    JSONSubmit.userID = this.auth.getUserID();
    console.log(JSONSubmit);
    this.service.createStore(JSONSubmit);
    this.router.navigate(['/']);
    console.log(this.image);
    console.log(this.createStoreForm.value);
  }

}

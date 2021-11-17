import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit {

  addMenuItemForm: FormGroup;
  image: any;

  constructor(private service: StoreService, private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.addMenuItemForm = this.fb.group({
      name: [null, Validators.required],
      image: [null, Validators.required]
    });
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

  ngOnInit() {
  }

  onSubmit() {
    this.addMenuItemForm.value.image = this.image;
    this.service.addMenuItem(this.service.getStoreID(), this.addMenuItemForm.value);
    this.router.navigate(['/']);
  }

}

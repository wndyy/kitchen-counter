import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedIn = false;
  hasStore: any;
  logSubscription: any;
  storeSubscription: any;


  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = this.auth.loggedIn;
    this.logSubscription = this.auth.subLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.storeSubscription = this.auth.subHasStore.subscribe((value) => {
      this.hasStore = value;
    });
  }

  logout() {
    this.auth.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

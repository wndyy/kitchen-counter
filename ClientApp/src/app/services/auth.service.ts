import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _baseURL = 'http://localhost:5000';
  loggedIn = false;
  subLoggedIn: Subject<boolean> = new Subject<boolean>();
  subHasStore: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    console.log(email, password);
    this.http.post<UserLogin>(this._baseURL + '/api/user/authenticate', { email: email,  password: password }).subscribe(res => {
      if (res) {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('user_id', res.user.id);
        if (res.user.storeID) {
          localStorage.setItem('store_id', res.user.storeID);
          this.subHasStore.next(true);
        }
        this.loggedIn = true;
        this.subLoggedIn.next(true);
      }
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('store_id');
    this.loggedIn = false;
    this.subLoggedIn.next(false);
    this.subHasStore.next(false);
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getUserID(): string {
    return localStorage.getItem('user_id');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  registerUser(registeredUser: UserRegister) {
    this.http.post<UserRegister>(this._baseURL + '/api/user/', registeredUser).subscribe(res => {
      console.log(res);
    });
  }
}

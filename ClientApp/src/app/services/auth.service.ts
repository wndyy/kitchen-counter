import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _baseURL = 'localhost:5000';
  loggedIn = false;

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    this.http.post<UserLogin>(this._baseURL + '/api/user/authenticate', { email: email,  password: password }).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('user_id', res.user.id);
      this.loggedIn = true;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    this.loggedIn = false;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}

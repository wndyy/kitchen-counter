import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  _baseURL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  createStore (store: Store) {
    this.http.post<Store>(this._baseURL + '/api/store/', store).subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }
}

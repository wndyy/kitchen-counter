import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  _baseURL = 'http://localhost:5000';
  subHasStore: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  createStore (store: Store) {
    this.http.post<Store>(this._baseURL + '/api/store/', store).subscribe(res => {
      if (res) {
        console.log(res);
        localStorage.setItem('store_id', res.id);
      }
      this.subHasStore.next(true);
    });
  }

  getStore () {
    this.http.get<Store[]>(this._baseURL + '/api/store/').subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

  getStoreID () {
    return localStorage.getItem('store_id');
  }

  addMenuItem (id: string, menuItem: MenuItem) {
    this.http.post<MenuItem>(this._baseURL + '/api/store/' + id, menuItem).subscribe(res => {
      if (res) {
        console.log(res);
        this.getStore();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store: Store;
  createLoadStoreSub: any;

  constructor(private service: StoreService, private route: ActivatedRoute, private router: Router) {
    this.service.getStore(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.store = res;
    });
  }

  ngOnInit() {
  }

}

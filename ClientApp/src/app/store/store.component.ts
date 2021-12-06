import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionBase } from '../classes/question-base';
import { QuestionService } from '../services/question.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store: Store;
  createLoadStoreSub: any;
  questions$: Observable<QuestionBase<any>[]>;

  constructor(private service: StoreService, private route: ActivatedRoute, private router: Router, private form: QuestionService) {
    this.service.getStore(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.store = res;
      this.questions$ = this.form.getQuestions(this.store);
      console.log('get: ', this.questions$);
    });
  }

  ngOnInit() {
  }

}

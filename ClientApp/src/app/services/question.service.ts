import { Injectable } from '@angular/core';

import { QuestionBase } from 'src/app/classes/question-base';
import { TextboxQuestion } from 'src/app/classes/question-textbox';
import { of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  getQuestions(store: Store) {
    const questions: QuestionBase<string>[] = [];
    store.menu.map((item, index) => {
      questions.push(new TextboxQuestion({
        key: item.name,
        label: item.name,
        type: 'number',
        image: item.image,
      }));
    });
    return of(questions);
  }

}



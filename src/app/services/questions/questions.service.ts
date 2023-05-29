import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { countries } from 'src/app/countries/countries';
import { Choice } from 'src/app/model/choice';
import { Question } from 'src/app/model/question';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  currentQuestion: BehaviorSubject<number>;

  questions: Question[];

  constructor(private utilsService: UtilsService) {
    this.currentQuestion = new BehaviorSubject(0);
    this.questions = [];
  }

  constructChoicesFromCapital(capital: string): Choice[] {
    const cities = this.utilsService.shuffleArrayElements(countries.map(c=> c.capital).filter(city => city != capital)).slice(0, 3);
    let returned = cities.map(city=>new Choice(city, false));
    returned.push(new Choice(capital, true));
    return this.utilsService.shuffleArrayElements(returned);
  }

  constructQuestionsArrayFromCountries() {
    const toReturn = countries.map(c => new Question("What is the capital of "+c.name+"?", this.constructChoicesFromCapital(c.capital), "assets/flags/"+c.icon+".svg"));
    this.questions = this.utilsService.shuffleArrayElements(toReturn);
  }
}

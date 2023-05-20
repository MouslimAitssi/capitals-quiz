import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../model/question';
import { countries } from '../countries/countries';
import { Choice } from '../model/choice';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  currentQuestion: BehaviorSubject<number>;

  questions: Question[];

  constructor() {
    this.currentQuestion = new BehaviorSubject(0);
    this.questions = [];
  }

  shuffleArrayElements(arr: any[]) {
    const newArray = [...arr];
    for(let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  constructChoicesFromCapital(capital: string): Choice[] {
    const cities = this.shuffleArrayElements(countries.map(c=> c.capital).filter(city => city != capital)).slice(0, 3);
    let returned = cities.map(city=>new Choice(city, false));
    returned.push(new Choice(capital, true));
    return this.shuffleArrayElements(returned);
  }

  constructQuestionsArrayFromCountries() {
    const toReturn = countries.map(c => new Question("What is the capital of "+c.name+"?", this.constructChoicesFromCapital(c.capital), "assets/flags/"+c.icon+".svg"));
    this.questions = this.shuffleArrayElements(toReturn);
  }
}

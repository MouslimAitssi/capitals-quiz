import { Component, OnInit, ViewChild } from '@angular/core';
import { Choice } from '../../model/choice';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/model/question';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  answersDisplayed: boolean = false;
  question: Question = new Question("Please Wait...", [], "");
  openModalName: boolean = false;
  questionNumber: number = 0;

  constructor(
    private questionsService: QuestionsService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.questionsService.currentQuestion.subscribe((number) => {
      this.questionNumber = number;
      if(this.userService.user.getValue().username==="") {
        this.router.navigateByUrl('start');
      }
      if(this.questionsService.questions.length<=this.questionNumber) {
        this.router.navigateByUrl('end');
      }
      this.question = this.questionsService.questions[this.questionNumber];
      this.answersDisplayed = false;
    })
  }

  selectAnswer(choice: Choice) {
    this.answersDisplayed = true;
    if(choice.isTrue) {
      let user = this.userService.user.getValue();
      user.totalPoints++;
      this.userService.user.next(user);
    }
  }

  nextQuestion() {
    this.questionsService.currentQuestion.next(this.questionNumber+1);
  }

  getClass(choice: Choice) {
    if(this.answersDisplayed) {
      return choice.isTrue?"truthy": "falsy";
    }
    return "";
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Choice } from '../../model/choice';
import { Question } from 'src/app/model/question';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  anAnswerIsSelected: boolean = false;
  question: Question;
  openModalName: boolean = false;
  questionNumber: number = 0;
  totalQuestions: number = 0;
  selectedChoice: Choice;
  subscription: Subscription = new Subscription();

  constructor(
    private questionsService: QuestionsService,
    private userService: UserService,
    private router: Router
  ) { 
    this.totalQuestions = this.questionsService.questions.length;
    this.question = new Question("Please Wait...", [], "");
    this.selectedChoice = new Choice("", false);
  }

  ngOnInit() {
    this.subscription = this.questionsService.currentQuestion.subscribe((number) => {
      this.questionNumber = number;
      if(!this.userService.user.getValue().username) {
        this.router.navigateByUrl('start');
      }
      else if(this.questionsService.questions.length<=this.questionNumber) {
        this.router.navigateByUrl('end');
      }
      this.question = this.questionsService.questions[this.questionNumber];
    })
  }
  ionViewDidEnter() {
    if(!this.question) {
      window.location.reload();
    }
  }

  selectAnswer(choice: Choice) {
    if(!this.anAnswerIsSelected) {
      this.selectedChoice = choice;
      this.anAnswerIsSelected = true;
      if(choice.isTrue) {
        let user = this.userService.user.getValue();
        user.totalPoints++;
        this.userService.user.next(user);
      }
    }
  }

  nextQuestion() {
    this.anAnswerIsSelected = false;
    this.questionsService.currentQuestion.next(this.questionNumber+1);
  }

  getClass(choice: Choice) {
    if(this.anAnswerIsSelected) {
      if(choice === this.selectedChoice) {
        return choice.isTrue?"truthy": "falsy-clicked";
      }
      
      return choice.isTrue?"truthy": "falsy";
    }
    return "";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

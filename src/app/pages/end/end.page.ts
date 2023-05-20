import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { QuestionsService } from 'src/app/services/questions.service';
import { RankingService } from 'src/app/services/ranking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit {

  username: string="";
  answeredQuestions: number=0;
  totalQuestions: number=0;
  constructor(
    private userService: UserService, 
    private questionsService: QuestionsService, 
    private router: Router,
    private rankingService: RankingService) {

  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.username = this.userService.user.getValue().username;
    this.totalQuestions = this.questionsService.questions.length;
    this.answeredQuestions = this.userService.user.getValue().totalPoints;
    this.rankingService.saveUserRanking(this.userService.user.getValue());
  }

  reset() {
    this.questionsService.constructQuestionsArrayFromCountries();
    this.questionsService.currentQuestion.next(0);
    this.userService.user.next(new User(this.username, 0));
    this.router.navigateByUrl('start');
  }
}

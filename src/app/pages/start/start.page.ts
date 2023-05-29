import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  username: string = "";
  constructor(
    private router: Router, 
    private userService: UserService,
    private questionsService: QuestionsService
  ) { }

  ngOnInit() {}

  play() {
    this.userService.user.next(new User(this.username, 0));
    this.router.navigateByUrl('question');
  }

  ionViewWillEnter() {
    this.questionsService.currentQuestion.next(0);
    this.questionsService.constructQuestionsArrayFromCountries();
  }

}

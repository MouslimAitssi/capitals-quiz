import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  users: User[] = [];
  constructor(private rankingService: RankingService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.users = this.rankingService.users;
  }

}

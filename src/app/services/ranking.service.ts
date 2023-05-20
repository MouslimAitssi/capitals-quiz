import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  users: User[]= [];
  constructor() {
    this.getRanking();
  }

  getRanking()  {
    const data = localStorage.getItem("users");
    if(data) {
      this.users = JSON.parse(data);
    }
    else {
      this.users = [];
    }
    this.users = this.users.sort((u1, u2) => u2.totalPoints - u1.totalPoints);
  }

  saveUserRanking(user: User) {
    if(user.username !== '') {
      this.users = this.users.filter(u => u.username !== user.username);
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}

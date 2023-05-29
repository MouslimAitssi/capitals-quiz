import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'End Quiz', url: '/end', icon: 'exit', routesToNotInclude:['/end'] },
    { title: 'Back To Quiz', url: '/question', icon: 'help', routesToNotInclude: ['/question', '/end'] },
    { title: 'Ranking', url: '/ranking', icon: 'trophy', routesToNotInclude:['/ranking'] }
  ];

  totalPoints: number=0;
  username: string="Please Wait...";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.user.subscribe(user=> {
      this.totalPoints = user.totalPoints;
      this.username = user.username;
    })
  }

  routerNotIn(routes: string[]) {
    return !routes.includes(this.router.url);
  }

}

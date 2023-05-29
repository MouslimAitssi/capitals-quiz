import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User>;

  constructor() {
    this.user = new BehaviorSubject(new User("", 0));
  }
}

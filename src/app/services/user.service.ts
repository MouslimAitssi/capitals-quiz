import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User>;

  constructor() {
    this.user = new BehaviorSubject(new User("", 0));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {current} from "codelyzer/util/syntaxKind";



@Injectable()
export class UserService {

  users = new BehaviorSubject<any>([
    {
      name: 'guest',
      role: 'guest',
      password: ''
    },
    {
      name: 'Ahmed',
      role: 'dataEntry',
      password: 'Ahmed'
    },
    {
      name: 'Mohamed',
      role: 'Admin',
      password: 'Mohamed'
    }
  ]).asObservable();

  private user = new BehaviorSubject<any>({
      name: 'guest',
      role: 'guest'
    }
  );

  currentUser = this.user.asObservable();

  constructor() {}

  changeUser(product) {
    this.user.next(product);
  }
}

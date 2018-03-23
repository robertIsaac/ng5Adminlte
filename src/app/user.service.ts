import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'ngx-cookie-service';



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

  constructor( private cookieService: CookieService ) {
    if (this.cookieService.get('username') !== '') {
      this.user.next({
        name: this.cookieService.get('username'),
        role: this.cookieService.get('role')
      });
    }
  }

  changeUser(user) {
    this.user.next(user);
    this.cookieService.set( 'username', user.name );
    this.cookieService.set( 'role', user.role );
  }
}

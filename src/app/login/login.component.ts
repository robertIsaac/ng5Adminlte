import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  users = [];
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.users.subscribe(response => this.users = response);
  }

  login() {
    for (const u of this.users) {
      if (u.name === this.userName) {
        // if found a match username check its password
        if (this.password === u.password) {
          // if the password is correct then update the user info and inform the user that he is logged then send him to home page
          this.user.currentUser.name = this.userName;
          this.user.currentUser.role = u.role;
          this.user.changeUser(this.user.currentUser);
          alert('welcome ' + this.userName);
          this.router.navigate(['']);
          return;
        } else {
          // if the password is wrong inform the user
          alert('user name or password is wrong');
          return;
        }
      }
    }
    // if there are no natch to the username
    alert('user name or password is wrong');
  }

}

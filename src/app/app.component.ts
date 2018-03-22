import { Component } from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  userName: string;
  role: string;
  constructor(private user: UserService) {
    this.user.currentUser.subscribe(response => {
      this.userName = response.name;
      this.role = response.role;
    });
  }

  signOut() {
    this.user.currentUser.name = 'guest';
    this.user.currentUser.role = 'guest';
    this.user.changeUser(this.user.currentUser);
  }
}

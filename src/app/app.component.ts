import {Component, ElementRef, Input} from '@angular/core';
import {UserService} from './user.service';
import {ProductService} from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  userName: string;
  role: string;
  lan: string;

  constructor(private user: UserService, private elementRef: ElementRef) {
    this.lan = this.elementRef.nativeElement.getAttribute('lan');
    this.user.currentUser.subscribe(response => {
      this.userName = response.name;
      this.role = response.role;
    });
  }

  signOut() {
    const guestUser = {
      name: 'guest',
      role: 'guest'
    };
    this.user.changeUser(guestUser);
  }
}

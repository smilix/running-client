import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from "@angular/router";
import {AuthService} from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public showMenu:boolean = false;
  public isLoggedIn:boolean = true;

  constructor(private router:Router, private authService:AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showMenu = false;
      }
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.loggedInObserver().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

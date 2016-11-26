import {Component, OnInit} from '@angular/core';
import {Credentials, AuthService} from "../shared/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Location]
})
export class LoginComponent implements OnInit {

  model = new Credentials('', '', false);
  sending = false;
  loginError:string = null;

  constructor(private authService:AuthService, private router:Router) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('User is already logged in.');
      this.router.navigate(['/overview']);
      return;
    }

    this.authService.tryAutoLogin().subscribe(isLoggedInNow => {
      if (isLoggedInNow) {
        console.log('User logged in by remembered password.');
        this.router.navigate(['/overview']);
      }
    });
  }

  save() {
    this.sending = true;
    this.loginError = null;

    let self = this;
    this.authService.login(this.model).subscribe(
      () => self.router.navigate(['/overview']),
      err => {
        self.loginError = err;
        self.sending = false;
      }
    );

  }

}

import {Component, OnInit} from '@angular/core';
import {Credentials, AuthService} from "../shared/auth/auth.service";
import {Router, ActivatedRoute} from "@angular/router";

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

  routeParam = null;

  constructor(private authService:AuthService, private router:Router,  private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.routeParam = params['route'];
    });


    if (this.authService.isLoggedIn()) {
      console.log('User is already logged in.');
      this.gotoNextPage();
      return;
    }

    this.authService.tryAutoLogin().subscribe(isLoggedInNow => {
      if (isLoggedInNow) {
        console.log('User logged in by remembered password.');
        this.gotoNextPage();
      }
    });
  }

  save() {
    this.sending = true;
    this.loginError = null;

    let self = this;
    this.authService.login(this.model).subscribe(
      () => this.gotoNextPage(),
      err => {
        self.loginError = err;
        self.sending = false;
      }
    );
  }

  private gotoNextPage() {
    if (this.routeParam == null) {
      this.router.navigate(['/overview']);
    } else {
      this.router.navigate([this.routeParam]);
    }
  }

}

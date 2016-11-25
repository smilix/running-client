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

  model = new Credentials('', '');
  sending = false;
  loginError:string = null;

  constructor(private authService:AuthService, private router:Router) {
  }

  ngOnInit() {
  }

  save() {
    this.sending = true;
    this.loginError = null;

    let self = this;
    this.authService.login(this.model).then(
      function ok() {
        self.router.navigate(['/overview']);
      }, function error(err) {
        self.loginError = err;
        self.sending = false;
      });
  }

}

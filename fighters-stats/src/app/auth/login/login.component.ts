import {Component, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });
  errorMessage: string | undefined;
  urlRedirectTo: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate([this.urlRedirectTo]).then(r => console.log(r));
        } else {
          this.errorMessage = "Identifiant ou mot de passe incorrects.";
          console.log(this.errorMessage);
        }
      });
  }

}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  adminForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });
  errorMessage: string | undefined;
  urlRedirectTo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

 login() {
   this.authService.login(this.adminForm.value.username, this.adminForm.value.password)
      .subscribe({
          next: test => {
            console.log(test);
          },
          error: err => console.error(err)
        }
        // (response) => {
        //   this.router.navigate([this.urlRedirectTo]).then(r => console.log(r));
        // },
        // (error) => {
        //   this.errorMessage = error.error.message;
        // }
      );
 }


}

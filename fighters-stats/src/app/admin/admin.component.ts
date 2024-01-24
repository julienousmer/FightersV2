import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "./admin.service";
import {Router, UrlTree} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  adminForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });
  errorMessage: string | undefined;
  urlRedirectTo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private adminService: UserService,
    private router: Router
  ) {
  }

  checkIsAdmin(): Promise<boolean> | boolean{
    if (this.adminService.isAdmin(
      this.adminForm.get('username')?.value,
      this.adminForm.get('password')?.value
    )){
      this.router.routerState.root.queryParams.subscribe((params) => {
        if (params['redirectTo']){
          this.urlRedirectTo = "/fighter/detail/" + params['redirectTo']
        }else {
          this.urlRedirectTo = "fighter/list"
        }
      })
      return this.router.navigate([this.urlRedirectTo])
    }else {
      this.errorMessage = "Wrong login";
    }
    return false;
  }

}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AdminService} from "../../admin/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.adminService.get_auth()){
      return this.router.createUrlTree(['/admin/login'])
    }
    return true;
  }

}
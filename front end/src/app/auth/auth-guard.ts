import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginServiceController } from '../service/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn;
    constructor(public loginService: LoginServiceController,
        public router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userData: any = JSON.parse(localStorage.getItem('userData'));
        return this.loginService.loginCheck(userData).then((auth: any) => {
            if (auth.isValid) {
                return true;
            }
            localStorage.clear();
            this.router.navigate(['/home']);
            return false;
        });
    }
}

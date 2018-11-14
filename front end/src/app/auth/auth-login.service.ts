import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginServiceController } from '../service/login.service';

@Injectable()
export class AuthPreventLogin implements CanActivate {

    constructor (
        public loginService: LoginServiceController,
        public router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userData = localStorage.getItem('userData');
        return this.loginService.loginCheck(userData).then((auth: any) => {
            if (auth.isValid) {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        });
    }
}
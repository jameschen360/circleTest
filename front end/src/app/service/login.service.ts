import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class LoginServiceController {
    public userData;
    public routeStatus;
    public loginUrl = 'https://ordermonkey.app/service.ordermonkey.app/userapp/login/';

    constructor(
        public http: Http
    ) {
    }

    loginPost(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.loginUrl + 'login', JSON.stringify(credentials), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    loginCheck(credentials) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            this.http.post(this.loginUrl + 'loginTokenCheck', JSON.stringify(credentials), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    openGames(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.loginUrl + 'openGames', JSON.stringify(credentials), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


}

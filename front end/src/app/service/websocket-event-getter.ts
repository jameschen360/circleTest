import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class WebsocketEventGetter {
    public userData;
    public routeStatus;
    public url = 'https://ordermonkey.app/service.ordermonkey.app/userapp/login/';

    constructor(
        public http: Http
    ) {
    }

    eventIdGetter(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.url + 'eventIdGetter', JSON.stringify(credentials), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
}

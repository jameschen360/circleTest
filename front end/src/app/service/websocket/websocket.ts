import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PubNubAngular } from 'pubnub-angular2';

@Injectable()
export class PubNubWebsocket {

    constructor(
        public http: Http,
        public pubnub: PubNubAngular
    ) {

    }

    pubNubInit() {
        return this.pubnub.init({
            publishKey: 'pub-c-0cbae245-ad4e-4f19-ba5a-6c9eb3af5735',
            subscribeKey: 'sub-c-66adc97c-dd88-11e8-befe-22cc51e2fc9c'
        });
    }

    pubNubSub(socketID) {
        return new Promise((resolve, reject) => {
            this.pubnub.subscribe({
                channels: [socketID],
                withPresence: true
            });
            resolve(true);
        });

    }
    
    pubNubUnsubscribeAll() {
        return this.pubnub.unsubscribeAll();
    }

}

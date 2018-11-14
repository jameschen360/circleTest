import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalMessageService {
    private orderMSG = new Subject<any>();

    loginCom(message) {
        this.orderMSG.next({ data: message });
    }

    clearMessage() {
        this.orderMSG.next();
    }

    loginListener(): Observable<any> {
        return this.orderMSG.asObservable();
    }

}
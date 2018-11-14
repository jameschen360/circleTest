import { Component, OnInit } from '@angular/core';
import { LoginServiceController } from './service/login.service';
import { Router } from '@angular/router';
import { GlobalMessageService } from './service/global-msg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  public userData: any;
  public subLogin: any;
  constructor (
    public loginService: LoginServiceController,
    public router: Router,
    public globalMessageCtrl: GlobalMessageService
  ) {
  }

  ngOnInit() {
    this.userLoginCheck();
    this.loginListener();
  }

  userLoginCheck () {
    const userData: any = JSON.parse(localStorage.getItem('userData'));
    const cred = {
      id: userData.data.generated_id,
      token: userData.token
    };
    this.loginService.loginCheck(cred).then((val: any) => {
      this.isLoggedIn = val.isValid;
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.userData);
      
    });
  }

  loginListener() {
    this.subLogin = this.globalMessageCtrl.loginListener().subscribe((data: any) => {
      this.isLoggedIn = data;
      console.log(data);
      
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

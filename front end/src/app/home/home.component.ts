import { Component, OnInit } from '@angular/core';
import { LoginServiceController } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  public openGames

  constructor(
    public loginService: LoginServiceController,
    public router: Router
  ) { }

  ngOnInit() {
    this.userLoginCheck();
    this.openGamesInit();
  }

  userLoginCheck () {
    try {
      const userData: any = JSON.parse(localStorage.getItem('userData'));
      const cred = {
        id: userData.data.generated_id,
        token: userData.token
      };
      this.loginService.loginCheck(cred).then((val: any) => {
        this.isLoggedIn = val.isValid;
      });
    } catch (error) {
      this.isLoggedIn = false;
    }

  }

  openGamesInit() {
    const userData: any = JSON.parse(localStorage.getItem('userData'));
    this.loginService.openGames(userData).then((val: any) => {
      this.openGames = val.output;
    });
  }

  navigateLocalGame() {
    this.router.navigate(['/game', 'local']);
  }

  navigateOnlineGame() {
    this.router.navigate(['/game/online', '']);
  }

}

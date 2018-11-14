import { Component, OnInit } from '@angular/core';
import { LoginServiceController } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalMessageService } from '../service/global-msg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public returnUrl: string;

  // THESE should actlaly be created as an interface....
  public credentials = {
    'username': '',
    'password': ''
  };

  public userData = {
    data: '',
    token: ''
  };
  //!!!!

  constructor(
    public loginService: LoginServiceController,
    public route: ActivatedRoute,
    public router: Router,
    public globalMessageCtrl: GlobalMessageService
  ) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.credentials.username = this.loginForm.value.username;
    this.credentials.password = this.loginForm.value.password;

    this.loginService.loginPost(this.credentials).then((result: any) => {
      this.userData = result.output;
      if (result.isValid) {
        this.userData = {
          data: result.userData,
          token: result.token
        }
        console.log(this.userData);
        this.globalMessageCtrl.loginCom(result.isValid);
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.router.navigateByUrl(this.returnUrl);
      }

    }, (err) => {
      // write something for error conditions
    });
  }

}

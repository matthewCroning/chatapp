import { Router } from '@angular/router';
import { AuthService, LoginData } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginData: LoginData = {
    username: '',
    password: ''
  }

  public errors: any = [];
    
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.AuthService.login(this.loginData).subscribe((data) => {
      this.router.navigate(['/chatroom']);
    }, (invalidResponse: any) => {
      this.errors = invalidResponse.error.errors;
    })
  }

}

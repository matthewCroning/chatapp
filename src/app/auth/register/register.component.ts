import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  
  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.AuthService.register(this.user).subscribe(
      (data) => {
        console.log(data);
        if(data.registered == true){
          this.router.navigate(['/login', {username: this.user.username}]);
        }
    })
  }

}

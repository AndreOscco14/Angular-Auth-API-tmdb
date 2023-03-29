import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private loginService: LoginService
  ){
  }

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    birth: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.signUpForm.value);
    const user = this.signUpForm.value;


    this.loginService.signUp(user).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      
    })
  }
}

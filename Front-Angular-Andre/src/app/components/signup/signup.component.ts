import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
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
    // console.log(this.signUpForm.value);
    const user = this.signUpForm.value;
    console.log(user);
    
    this.loginService.signUp(user).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
       this.router.navigate(['/signin'])
    }, error => {
      console.log(error);
      alert('Ha ocurrido un error al registrar el usuario.');
    })
  }
}

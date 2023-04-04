import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

constructor(
  private loginService: LoginService,
  private router: Router
){

}
signInForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
});

  onSubmit() {
    const userSignIn = this.signInForm.value;
  
    this.loginService.signIn(userSignIn).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/private']);
    }, (err: any) => {
      if (err.status === 401) {
        // Si la autenticación falla, muestra un mensaje de error
        console.log('Correo electrónico o contraseña incorrectos');
      } else {
        // Si se produce un error en el servidor, muestra un mensaje genérico
        console.log('Se produjo un error al intentar iniciar sesión');
      }
    });
  }
  
}

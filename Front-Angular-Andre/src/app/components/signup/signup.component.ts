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

  registroExitoso = false; 


  constructor(
    private loginService: LoginService,
    private router: Router
  ){
  }

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
    lastname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('', [  Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}') ]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birth: new FormControl('', Validators.required)
  });

  get name() { return this.signUpForm.get('name'); }
  get lastname() { return this.signUpForm.get('lastname'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get birth() { return this.signUpForm.get('birth'); }


  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    // console.log(this.signUpForm.value);
    const user = this.signUpForm.value;
    console.log(user);
    
    this.loginService.signUp(user).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.registroExitoso = true;
     // Añadimos un retraso de 2 segundos antes de redirigir a la página de inicio de sesión
     setTimeout(() => {
      this.router.navigate(['/signin']);
      // alert('¡Te has registrado exitosamente!');
    }, 2000);
    }, error => {
      console.log(error);
      alert('Ha ocurrido un error al registrar, intente con otro correo.');
    })
  }
}

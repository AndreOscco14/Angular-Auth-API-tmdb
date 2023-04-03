import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = 'http://localhost:3000/'
  private apiKey= '711f051088e570013ab30bed477fe8f3'


  constructor( 
    private http: HttpClient,
    private router: Router
    ) {   
    }
   
  //  signUp(user: any) {
  //   return this.http.post(`${this.URL}api/sign-up`, user);
  // }
  
  signUp(user: any) {
    return this.http.post(`${this.URL}api/sign-up`, {
        nameuser: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        birth: user.birth
    });
}

// ----------------------------------

  signIn(user: any) {
    return this.http.post(`${this.URL}api/signin`, user);
  }

  // signIn(user: any): Observable<any> {
  //   return this.http.post(`${this.URL}api/signin`, user).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  loggedIn(){
  return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }


  getNowPlaying() {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`);
  }

  getPopular() {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`);
  }

  getCredits(movieId: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }


  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'An unknown error occurred';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }

}

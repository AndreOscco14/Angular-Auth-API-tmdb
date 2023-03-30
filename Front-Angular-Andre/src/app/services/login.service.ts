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
   
   signUp(user: any) {
    return this.http.post(`${this.URL}api/sign-up`, user);
  }

  signIn(user: any) {
    return this.http.post(`${this.URL}api/signin`, user);
  }

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

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = 'http://localhost:3000/'
  constructor( private http: HttpClient) {
   }
   
   signUp(user: any) {
    return this.http.post(`${this.URL}api/sign-up`, user);
  }
}

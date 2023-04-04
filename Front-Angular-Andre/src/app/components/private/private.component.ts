import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  nowPlayingMovies: any;
  popularMovies: any;
  creditsMovies: any;
  userData: any;

  constructor(
    private loginService: LoginService,
  ){ }

  ngOnInit(): void {
    this.loginService.getNowPlaying().subscribe((data: any) => {
      this.nowPlayingMovies = data.results;
    });

    // Obtener datos del usuario y mostrarlos
    this.loginService.getUserData().subscribe((res: any) => {
      this.userData = res;
    });

    this.loginService.getPopular().subscribe((data: any) => {
      this.popularMovies = data.results;
    });

  }
}

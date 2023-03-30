import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  nowPlayingMovies: any;
  popularMovies: any;

  constructor(
    private loginService: LoginService
  ){ }

  ngOnInit(): void {
    this.loginService.getNowPlaying().subscribe((data: any) => {
      this.nowPlayingMovies = data.results;
    });

    this.loginService.getPopular().subscribe((data: any) => {
      this.popularMovies = data.results;
    });
  }

}

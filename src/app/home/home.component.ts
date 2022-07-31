import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   exercises = ["1a","1b", "1c", "1d", "1e", "1f", "1g"];
   url =  "https://xlogo.inf.ethz.ch/test/ville/#/ville-midi?exercise="
  constructor() { }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  someText: String = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.someText = this.dataService.getText()
  }

}

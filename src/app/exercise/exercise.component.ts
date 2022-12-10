import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise_id: string = "";
  title = 'Testing postMessage API with xlogoOnline';

  baseUrl = 'https://xlogo.inf.ethz.ch/test/master/#/midi?exercise='
  // baseUrl = 'http://localhost:4200/#/midi?exercise='
  safeUrl: SafeUrl;

  // Only for debugging
  messageLog: String = "-------- Angtest - Message log: --------------- \n"


  constructor(private sanitizer: DomSanitizer, private _snackBar: MatSnackBar, private route: ActivatedRoute,
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl);
  }

  cleanUrl(): SafeUrl {
    return this.safeUrl;
  }

  ngOnInit(): void {
    // Initialize event listener for incoming postMessage messages from the iframe.
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage, true);
    }
    // Parse query parameters in url.
    this.route.queryParams
      .subscribe(params => {
        this.exercise_id = params['exercise'];
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.exercise_id)
      });
  }

  receiveMessage: any = (event: MessageEvent) => {
    // Only for debugging
    this.messageLog += "\n Receive message from : " + event.origin + ". and data: " + event.data + "  |||||  ";
    this.messageLog += " Parsed json: " + JSON.parse(event.data);

    // Parsing incoming responses from the iframe.
    let response = (JSON.parse(event.data));
    if (response["correct"]) {
      //Toast notification on the host application
      this._snackBar.open("Student solved exercise " + response["name"] + " correctly", "", {duration: 10000})
    } else {
      this._snackBar.open("Student solved exercise " + response["name"] + " wrong", "", {duration: 10000})
    }
  };
}

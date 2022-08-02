import {Component, Input, OnInit} from '@angular/core';
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

  baseUrl = 'https://xlogo.inf.ethz.ch/test/ville/#/ville-midi?exercise='
  postMessageUrl = 'https://xlogo.inf.ethz.ch'
  // baseUrl = 'http://localhost:3000/#/ville-midi?exercise='
  // postMessageUrl = 'http://localhost:3000'
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

  exerciseToLoad = new FormControl('');


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
    console.log("Angtest: Receive message from : ");
    console.log("Angtest: Origin: " + event.origin);
    console.log("Angtest: data: " + event.data);
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


  // Only for debugging: Sending message to the xlogoOnline iframe and expecting and echo response
  testPostMessageWithXLogo = () => {
    let message = "\n angtest message: " + this.exerciseToLoad.value
    this.messageLog += "\n Send message to xlogo: " + message;
    // @ts-ignore
    document.getElementById('xlogo').contentWindow.postMessage("angtest message: " + this.exerciseToLoad.value, this.postMessageUrl)
  }
}

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
  title = 'angtest and new';
  url = 'https://xlogo.inf.ethz.ch/test/ville/#/ville-midi'


  // private url = 'http://localhost:3000/#/ville-midi?exercise=4a'
  safeUrl: SafeUrl;
  messageLog: String = "-------- Angtest - Message log: --------------- \n"
  ratio = 0.8


  constructor(private sanitizer: DomSanitizer, private _snackBar: MatSnackBar, private route: ActivatedRoute,
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  cleanUrl(): SafeUrl {
    return this.safeUrl;
  }

  exerciseToLoad = new FormControl('');

  callVille = () => {
    console.log(this.exerciseToLoad.value)
    var childWindow = document.getElementById("xlogo");

    let message = "\n angtest message: " + this.exerciseToLoad.value
    this.messageLog += "\n Send message to xlogo: " + message + "  |||||  ";
    // @ts-ignore
    document.getElementById('xlogo').contentWindow.postMessage("angtest message: " + this.exerciseToLoad.value,"https://xlogo.inf.ethz.ch")
  }

  ngOnInit(): void {
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage, true);
    }
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.exercise_id = params['exercise'];
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://xlogo.inf.ethz.ch/test/ville/#/ville-midi?exercise='+this.exercise_id)
      });
  }

  receiveMessage: any = (event: MessageEvent) => {
    console.log("Angtest: Receive message from : " );
    console.log("Angtest: Origin: " + event.origin);
    console.log("Angtest: data: " + event.data);
    this.messageLog += "\n Receive message from : " + event.origin + ". and data: " + event.data +  "  |||||  ";

    if(event.data == "correct"){
      //Toast notification on the host application
      console.log(" Angtest origin: " + event.origin)
      this._snackBar.open("Student solved exercise correctly", "", {duration: 10000})
    }else if(event.data == "wrong"){
      this._snackBar.open("Student solved exercise wrong", "", {duration: 10000})
    }

  };
}

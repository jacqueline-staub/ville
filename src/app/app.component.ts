import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angtest and new';
  private url = 'https://xlogo.inf.ethz.ch/test/ville/#/ville-midi?exercise=4a'
  //private url = 'http://localhost:3000/#/ville/midi/4a'
  safeUrl: SafeUrl;
  ratio = 0.8


  constructor(private sanitizer: DomSanitizer, private _snackBar: MatSnackBar) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  cleanUrl(): SafeUrl {
    return this.safeUrl;
  }

  exerciseToLoad = new FormControl('');

  callVille = () => {
    console.log(this.exerciseToLoad.value)
    var childWindow = document.getElementById("xlogo");

    // @ts-ignore
    document.getElementById('xlogo').contentWindow.postMessage(this.exerciseToLoad.value, this.url)
  }

  ngOnInit(): void {

    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage, true);
    }
  }

  receiveMessage: any = (event: MessageEvent) => {
    event.preventDefault();
    console.log("receive message: " + event);
    if(event.data == "correct"){
      //Toast notification on the host application
      this._snackBar.open("Student solved exercise correctly", "", {duration: 10000})
    }else if(event.data == "wrong"){
      this._snackBar.open("Student solved exercise wrong", "", {duration: 10000})
    }

    // let message = "Received message."
    // message += " origin: " + event.origin;
    // message += " data: " + event.data
    // if (event.origin != "http://localhost:4200") {
    //   this._snackBar.open(message, "Info", {duration: 10000})
    // }

  };
}

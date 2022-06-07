import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angtest and new';
  private url = 'https://xlogo.inf.ethz.ch/test/ville/#/ville'
  //private url = 'http://localhost:3000/#/ville'
  safeUrl: SafeUrl;
  ratio = 0.8


  constructor(private sanitizer: DomSanitizer) {
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
    console.log("TADAAA");
    console.log(event);
    console.log('You reached me');
  };
}

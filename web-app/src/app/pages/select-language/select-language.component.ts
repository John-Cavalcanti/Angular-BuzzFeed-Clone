import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: [
    './select-language.component.css',
    '../../components/quizz/quizz.component.css'
  ]
})
export class SelectLanguageComponent {
  title:string = "Select language | Escolha linguagem";
  pt:string = "pt"
  en:string = "en"

  constructor(private router: Router){}

  callQuizzPage(lang:string):void 
  {
    this.router.navigate(['/home', lang]);
  }

}

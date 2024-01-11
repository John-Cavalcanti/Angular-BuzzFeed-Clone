import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import quizz_questions from "../../../assets/data/quizz_questions.json";
import quizz_questions_en from "../../../assets/data/quizz_questions_en.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  langReceived: string = "";

  title: string = "";
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";
  finalResultTxt: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.langReceived = params.get('data') || "";
    })

    if (this.langReceived === "pt") {
      if (quizz_questions) {

        this.finalResultTxt = "O seu resultado é : ";

        this.finished = false;
        this.title = quizz_questions.title;

        this.questions = quizz_questions.questions;
        this.questionSelected = this.questions[this.questionIndex];

        this.questionIndex = 0;
        this.questionMaxIndex = this.questions.length;
      }
    }else if (this.langReceived === "en")
    {
      if (quizz_questions_en) {
        this.finalResultTxt = "Your final result is : ";
        this.finished = false;
        this.title = quizz_questions_en.title;

        this.questions = quizz_questions_en.questions;
        this.questionSelected = this.questions[this.questionIndex];

        this.questionIndex = 0;
        this.questionMaxIndex = this.questions.length;
      }
    }

  }

  playerChoice(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex >= this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }
    else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;

      if(this.langReceived === "pt")
      {
        this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      }else if(this.langReceived === "en")
      {
        this.answerSelected = quizz_questions_en.results[finalAnswer as keyof typeof quizz_questions_en.results];
      }
    } 
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }

}

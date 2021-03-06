import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-create-voting',
  templateUrl: './create-voting.component.html',
  styleUrls: ['./create-voting.component.css']
})
export class CreateVotingComponent{
  public options: Array<string>  = [];
  public option: string;
  public title: string;
  public question: string;
  private movies: Array<string>;
  private times: Array<string>;
  private cinemas: Array<string>;
  private currentRound: number = 0;
  private pickedMovies: Array<string> = [];
  private pickedTimes: Array<string> = [];
  private pickedCinemas: Array<string> = [];
  private rounds = ['movies', 'times', 'cinemas'];
  private associations = {
    "12:00": {
      "Batman": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Daddy's Home 2": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    },
    "15:00": {
      "Pulp Fiction": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Jigsaw": ["Falkoner", "Dagmar", "Imperial"],
      "Daddy's Home 2": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    },
    "19:00": {
      "Pulp Fiction": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "Batman": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Jigsaw": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Daddy's Home 2": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    },
    "20:00": {
      "Pulp Fiction": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "Batman": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Jigsaw": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Daddy's Home 2": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    },
    "21:00": {
      "Pulp Fiction": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "Batman": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Jigsaw": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Daddy's Home 2": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    },
    "22:00": {
      "Pulp Fiction": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "Batman": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"],
      "Superman": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Blade Runner": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Jigsaw": ["Falkoner", "Lyngby", "Dagmar", "Imperial"],
      "Flatliners": ["Field's", "Lyngby", "Dagmar", "Imperial"],
      "The Square": ["Field's", "Lyngby"],
      "Justice League": ["Falkoner", "Lyngby", "Dagmar", "Imperial", "Cinemaxx"],
      "Star Wars: The Last Jedi": ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads"]
    }
  }

  constructor(private http: HttpClient,
              private router: Router) {
    console.log(this.movies)
    this.movies = ["Batman", "Superman", "Blade Runner",
      "Daddy's Home 2", "Flatliners",
      "The Square", "Justice League", "Star Wars: The Last Jedi"];
    this.times = ["12:00", "15:00", "19:00", "20:00", "21:00", "22:00"];
    this.cinemas = ["Field's", "Lyngby", "Dagmar", "Imperial","Cinemaxx", "Palads", "Falkoner"];

    this.options = this.movies;
  }

  nextOptions(){
    switch(this.currentRound){
      case 0:
        this.pickedMovies = this.receivedData;
        this.receivedData = this.pickedTimes;
        this.options = this.times;
        this.currentRound++;
        break;
      case 1:
        this.pickedTimes = this.receivedData;
        this.receivedData = this.pickedCinemas;
        this.options = this.cinemas;
        this.currentRound++;
        break;
      case 2:
        this.pickedCinemas = this.receivedData;
        this.receivedData = [];
        break;
      default:
        break;
    }
  }

  backOptions(){
    switch(this.currentRound){
      case 0:
        break;
      case 1:
        this.options = this.movies;
        this.receivedData = this.pickedMovies;
        this.currentRound--;
        break;
      case 2:
        this.options = this.times;
        this.receivedData = this.pickedTimes;
        this.currentRound--;
        break;
      default:
        break;
    }
  }

  removeOption(index: number): void {
    this.receivedData.splice(index,1)
  }

  createVoting(): void {
    let voting: any = {
      'alternatives': {
        'movies': this.pickedMovies,
        'times': this.pickedTimes,
        'cinemas': this.pickedCinemas,
      },
      'title': this.title,
      'question': this.question
    };
    // Make the HTTP request:
    this.http.post('api/votings',voting).subscribe(data => {
      this.router.navigate(['voting', data['code']]);
    });
  }

  transferData: Object = {id: 1, msg: 'Hello'};
  receivedData: Array<any> = [];

  transferDataSuccess($event: any) {
    console.log(this.receivedData.includes($event.dragData))
    if(!this.receivedData.includes($event.dragData))
      this.receivedData.push($event.dragData);
  }

}

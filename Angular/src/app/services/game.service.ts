import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TextItem } from '../models/textItem';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  splitted: string[];
  currentLetter = {
    id: 0,
    letter: ""
  };
  count = 0; 
  tmp = "";
  show = "";
  errors = 0;
  currentLetterStyle = `<span class="current-letter">${this.currentLetter}</span>`;
  currentLetterErrorStyle = `<span class="current-letter-error">${this.currentLetter}</span>`;
  styledText: SafeHtml | undefined;
  text = "";
  textItem: TextItem;
  speed: number;
  timeStart: Date;
  timeStop: Date;
  currentArticleId: number;

  private gameFinished = new BehaviorSubject<boolean>(false);
  private textItemFinished = new BehaviorSubject<boolean>(false);

  constructor(private sanitizer: DomSanitizer) {
   }

  setTextItem(text: TextItem){
    this.textItem = text;
  }

  onGameStart(){
    this.currentArticleId = this.textItem.articles.findIndex(a => !a.done);
    if(this.currentArticleId < 0){
      this.textItemFinished.next(true);
      return;
    }
    this.text = this.textItem.articles[this.currentArticleId].article;
    console.log(this.text);
    this.splitted = this.text.split('');
    this.clear();
    this.highlightCurrentLetter(0);
  }

  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Shift') {
      return;
    }

    
    if (this.currentLetter.letter === ev.key) {
      if(this.count == 0){
        this.timeStart = new Date();
      }
      console.log(`The user just pressed ${ev.key}!`);
      this.splitted[this.count] = this.tmp;
      this.count++;
      this.onFinishHandler();
      this.highlightCurrentLetter(this.count);
    } else {
      this.errors++;
      this.highlightCurrentLetter(this.count, true);
      document.getElementById('error').classList.add('glow');
      setTimeout(() => {
        document.getElementById('error').classList.remove('glow');
      }, 200);
    }
  }
  private highlightCurrentLetter(id: number, error: boolean = false) {
    this.currentLetter.id = this.count;
    if (error)
      this.currentLetter.letter = this.tmp;
    else{
      this.currentLetter.letter = this.splitted[id];
      this.tmp = this.splitted[id];
    }
    if (error)
      this.splitted[id] = `<span class="current-letter-error">${this.currentLetter.letter}</span>`;
    else
      this.splitted[id] = `<span class="current-letter">${this.currentLetter.letter}</span>`;
    this.refreshText();
  }

  refreshText() {
    let a = this.splitted.join('_');
    a = a.replace(/_/g, '');
    console.log(a);
    this.styledText = this.sanitizer.bypassSecurityTrustHtml(a);
  }

  private onFinishHandler(){
    if(this.count === this.splitted.length - 1){
      this.timeStop = new Date();

      this.speed = Number((this.splitted.length / (this.timeStop.getSeconds() - this.timeStart.getSeconds())).toFixed(2));

      this.gameFinished.next(true);
    }
  }

  private clear(){
    this.speed = 0;
    this.count = 0;
    this.errors = 0;
  }

  markArticleAsDone(){
    this.textItem.articles[this.currentArticleId].done = true;
  }

  get GameFinished$(){
    return this.gameFinished.asObservable();
  }

  get TextItemFinished$(){
    return this.textItemFinished.asObservable();
  }
}

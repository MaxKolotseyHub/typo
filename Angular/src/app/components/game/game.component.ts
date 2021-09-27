import { style, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 0.5,
      }))
    ])
  ]
})
export class GameComponent implements OnInit {

  text = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, facere non nobis alias atque doloribus ipsum saepe explicabo quos aut praesentium rem, illo laborum quia deleniti! Architecto, aliquid debitis! Cumque.';
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
  constructor(private sanitizer: DomSanitizer) {
    this.splitted = this.text.split('');
    this.highlightCurrentLetter(0);
  }

  ngOnInit(): void {
    this.refreshText();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Shift') {
      return;
    }
    if (this.currentLetter.letter === ev.key) {
      console.log(`The user just pressed ${ev.key}!`);
      this.splitted[this.count] = this.tmp;
      this.count++;
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

  private refreshText() {
    let a = this.splitted.join('_');
    a = a.replace(/_/g, '');
    console.log(a);
    this.styledText = this.sanitizer.bypassSecurityTrustHtml(a);
  }
}


// animate("5s", keyframes([
//   style({ backgroundColor: "red", offset: 0 }),
//   style({ backgroundColor: "blue", offset: 0.2 }),
//   style({ backgroundColor: "orange", offset: 0.3 }),
//   style({ backgroundColor: "black", offset: 1 })
// ]))
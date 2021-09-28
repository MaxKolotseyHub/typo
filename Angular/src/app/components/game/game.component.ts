// import { style, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { TextsService } from 'src/app/services/texts.service';
import { TextItem } from 'src/app/models/textItem';
import { Location } from '@angular/common';
import {  } from 'rxjs'
import { GamesListComponent } from '../games-list/games-list.component';

@Component({
  providers: [GameService],
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

  // text = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, facere non nobis alias atque doloribus ipsum saepe explicabo quos aut praesentium rem, illo laborum quia deleniti! Architecto, aliquid debitis! Cumque.';
  id: number | undefined;
  text: TextItem;
  finished = false;
  currentArticleId: number;
  gameover = false;
  constructor(
    public gameService: GameService, 
    private activatedRoute: ActivatedRoute,
    private locaton: Location,
    private textService: TextsService) {
      this.gameService.GameFinished$.subscribe( finished =>{
        this.finished = finished;
      });

      this.gameService.TextItemFinished$.subscribe( finished =>{
        this.gameover = finished;
      })
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.text = this.textService.getTextItemById(this.id);
    this.gameService.setTextItem(this.text);
    this.gameService.onGameStart();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    this.gameService.onKeyUp(ev);
  }

  nextArticle(){
    this.gameService.markArticleAsDone();
    this.gameService.onGameStart();
    this.finished = false;
  }
}
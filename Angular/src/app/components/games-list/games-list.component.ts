import { Component, OnInit } from '@angular/core';
import { TextItem } from 'src/app/models/textItem';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  textItems: TextItem[] = [];

  constructor(private textService: TextsService) { }

  ngOnInit(): void {
    this.textItems = this.textService.getAll();
  }

}

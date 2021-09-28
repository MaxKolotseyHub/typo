import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { TextItem } from '../models/textItem';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  texts: TextItem[] =[
    {
      id:1,
      title: 'Тестируем',
      articles:[
      {id:1, article: 'Текст, который изменит всё.', done: false}
    ] 
    },
    {
      id:2,
      title: 'Просто и оксимирон',
      articles:[
      {id:1, article: 'А этот текст будет здесь для красоты', done: false},
      {id:2, article: 'Всё переплетено, мир - веретено', done: false},
    ] 
    },
  ];

  constructor() { }

  getAll():TextItem[]{
    return this.texts;
  }

  getTextItemById(id:number):TextItem{
    return this.texts.find(t => t.id === id);
  }
}

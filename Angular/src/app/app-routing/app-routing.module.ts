import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from '../components/games-list/games-list.component';
import { GameComponent } from '../components/game/game.component';

const routes: Routes = [
  {path: '',redirectTo: 'games', pathMatch: 'full'},
  {path: 'games', component: GamesListComponent},
  {path: 'game/:id', component: GameComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

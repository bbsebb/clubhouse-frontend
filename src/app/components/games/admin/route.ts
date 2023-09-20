import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesListComponent } from './games-list/games-list.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { Route } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { ImportGameComponent } from './import-game/import-game.component';

export default [
  { path: 'create', component: CreateGameComponent },
  { path: 'import', component: ImportGameComponent },
  { path: ':id/edit', component: EditGameComponent },
  { path: ':id', component: GameDetailComponent },
  { path: '', component: GamesListComponent },
  { path: '**', component: GamesListComponent },
] as Route[];

import {CreateGameComponent} from "./admin/create-game/create-game.component";
import {ImportGameComponent} from "./admin/import-game/import-game.component";
import {EditGameComponent} from "./admin/edit-game/edit-game.component";
import {GameDetailComponent} from "./admin/game-detail/game-detail.component";
import {GamesListComponent} from "./admin/games-list/games-list.component";
import {Route} from "@angular/router";


export default [
  {path: 'create', component: CreateGameComponent},
  {path: 'import', component: ImportGameComponent},
  {path: ':id/edit', component: EditGameComponent},
  {path: ':id', component: GameDetailComponent},
  {path: '', component: GamesListComponent},
  {path: '**', component: GamesListComponent}
] as Route[];

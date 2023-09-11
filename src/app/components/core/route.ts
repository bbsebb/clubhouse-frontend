import {Route} from "@angular/router";
import {IndexComponent} from "./index/index.component";

export default [
  {path: '', component: IndexComponent},
  {path: '**', component: IndexComponent}
] as Route[];

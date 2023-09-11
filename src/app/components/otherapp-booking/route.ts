import {Route} from "@angular/router";
import {BookComponent} from "./book/book.component";

export default [
  {path: '', component: BookComponent},
  {path: '**', component: BookComponent}
] as Route[];

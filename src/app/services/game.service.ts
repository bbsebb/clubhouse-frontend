import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Game} from "../models/games/Game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames():Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8080/api/games')
  }

  getGame(code: string):Observable<Game> {
      return this.http.get<Game>('http://localhost:8080/api/games/'+code);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Game} from "../../models/games/Game";
import {GameCreateDTO} from "./dto/game-create-dto";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames():Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
  }

  getGame(code: string):Observable<Game> {
      return this.http.get<Game>(`${environment.apiUrl}/games/${code}`);
  }

  createGame(gameCreateDTO: GameCreateDTO):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${environment.apiUrl}/games/create`,gameCreateDTO,httpOptions)
  }

  importGame(fileList:FileList):Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    const httpOptions = {
      headers:new HttpHeaders({
        'enctype': 'multipart/form-data'  // Spécifiez le type d'encodage pour les fichiers
      })
    };
    return this.http.post(`${environment.apiUrl}/games/import`,formData,httpOptions)
  }
}

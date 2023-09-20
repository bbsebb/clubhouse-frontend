import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/games/Game';
import { GameCreateDTO } from './dto/game-create-dto';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getGames(start?: Date, end?: Date): Observable<Game[]> {
    let url = `${environment.apiUrl}/games`;
    if (start && end) {
      url = `${url}?start=${start.toISOString()}&end=${end.toISOString()}`;
    }
    return this.http.get<Game[]>(url);
  }

  getGame(code: string): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/games/${code}`);
  }

  createGame(gameCreateDTO: GameCreateDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/games/create`,
      gameCreateDTO,
      httpOptions
    );
  }

  importGame(fileList: FileList): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/games/import`,
      formData,
      httpOptions
    );
  }
}

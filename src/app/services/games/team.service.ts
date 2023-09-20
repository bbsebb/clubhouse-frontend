import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../models/games/Team';
import { Gender } from '../../models/games/Gender';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(categoryName?: string, gender?: Gender): Observable<Team[]> {
    let url: string = `${environment.apiUrl}/teams`;
    if (gender && categoryName) {
      url = `${environment.apiUrl}/teams?category=${categoryName}&gender=${gender}`;
    }
    return this.http.get<Team[]>(url);
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${environment.apiUrl}/teams/${id}`);
  }
}

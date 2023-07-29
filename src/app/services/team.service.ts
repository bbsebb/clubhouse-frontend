import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/games/Team";
import {Gender} from "../models/games/Gender";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(caterogyName?:string,gender?:Gender):Observable<Team[]> {
    let url:string = 'http://localhost:8080/api/teams';
    if((gender) && (caterogyName)) {
      url = `http://localhost:8080/api/teams?category=${caterogyName}&gender=${gender}`;
    }
    return this.http.get<Team[]>(url);
  }



  getTeam(id: string):Observable<Team> {
    return this.http.get<Team>('http://localhost:8080/api/teams/'+id);
  }
}

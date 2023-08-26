import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hall} from "../../models/games/Hall";

import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http:HttpClient) { }

  getHall(clubCode: string): Observable<Hall[]> {
    let url:string = 'http://localhost:8080/api/game-halls';
    if(clubCode) {
      url = 'http://localhost:8080/api/game-halls?club_code='+clubCode;
    }
    return this.http.get<Hall[]>(url).pipe(
      map(halles => halles.map(
        halle => {
          if(halle.id === '00000000-0000-0000-0000-000000000000') {
            return this.mapUnknown();
          } else {
            return halle;
          }
        }
      ))
    );
  }

  private mapUnknown():Hall {
    return <Hall>{
      id: '00000000-0000-0000-0000-000000000000',
      name: "Inconnue",
      address: {
        street: "",
        postalCode: 0,
        city:"",
      },
      glueAuthorization: "",
    };
  }
}

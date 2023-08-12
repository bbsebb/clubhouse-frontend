import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Halle} from "../models/games/Halle";
import { v4 as uuidv4 } from 'uuid';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HalleService {

  constructor(private http:HttpClient) { }

  getHalles( clubCode: string): Observable<Halle[]> {
    let url:string = 'http://localhost:8080/api/halles';
    if(clubCode) {
      url = 'http://localhost:8080/api/halles?club_code='+clubCode;
    }
    console.log(url);
    return this.http.get<Halle[]>(url).pipe(
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

  private mapUnknown():Halle {
    return <Halle>{
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

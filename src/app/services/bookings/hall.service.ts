import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hall } from '../../models/booking/Hall';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  constructor(private http: HttpClient) {}

  getHall(): Observable<Hall[]> {
    let url: string = `${environment.apiUrl}/booking-halls`;
    return this.http.get<Hall[]>(url);
  }
}

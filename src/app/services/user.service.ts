import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './../models/User.interface';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${environment.URL_BACK}/user`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl);
  }

  saveUser(user: IUser): Observable<IUser>{
    return this.http.post<IUser>(this.userUrl, user);
  }

  editUser(user: IUser, id: string): Observable<IUser>{
    return this.http.post<IUser>(`${this.userUrl}/${id}`, user);
  }

}

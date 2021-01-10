import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, take, tap } from 'rxjs/operators';

import { AlertModalService } from '../shared/alert-modal.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly URL_API = `http://localhost:3000/users`;

  constructor(
    private http: HttpClient,
    private alertService: AlertModalService
  ) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_API).pipe(
      retry(3),
      tap(console.log),
      // map(result => result['users']),
      catchError((err: any, caught: Observable<any>) => {
        console.error(err);
        return throwError(this.handleError(err, caught));
      })
    );
  }

  private create(user) {
    return this.http.post(this.URL_API, user).pipe(take(1));
  }

  private update(user) {
    return this.http.put(`${this.URL_API}/${user.id}`, user).pipe(take(1));
  }

  save(user) {
    if (user.id) {
      return this.update(user);
    }
    return this.create(user);
  }

  getById(id) {
    return this.http.get<any>(`${this.URL_API}/${id}`);
  }

  remove(id) {
    console.log(id);
    console.log(`${this.URL_API}/${id}`);
    return this.http.delete(`${this.URL_API}/${id}`).pipe(take(1));
  }

  handleError(error: any, caught: Observable<any>): Observable<any> {
    switch (error.statusText) {
      case 'Unknown Error':
        this.alertService.showAlertDanger(
          'Erro desconhecido ao carregar usuários!'
        );
        break;

      default:
        this.alertService.showAlertDanger('Erro desconhecido!');
        return;
    }

    return error;
  }
}

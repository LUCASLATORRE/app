import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, retry, takeWhile } from 'rxjs/operators';

import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private readonly URL_API = `http://localhost:3000/expenses`;
  isActive = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isActive = true;
  }

  public ngOnDestroy(): void {
    this.isActive = false;
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  list(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.URL_API).pipe(
      delay(3000),
      retry(2),
      takeWhile(value => this.isActive)
    );
  }
}

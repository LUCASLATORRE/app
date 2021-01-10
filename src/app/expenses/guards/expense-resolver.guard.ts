import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseResolverGuard implements Resolve<Expense> {
  constructor(private service: ExpensesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Expense> {
    if (route.params && route.params['id']) {
      // return this.service.getById(route.params['id']);
    }

    return of({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      dateOfBirth: null,
    });
  }
}

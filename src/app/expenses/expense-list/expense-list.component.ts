import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenses$: Observable<Expense[]>;
  expenses: Expense[] = [];
  isActive = true;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.isActive = true;
    this.onRefresh();
  }
  public ngOnDestroy(): void {
    this.isActive = false;
  }

  onRefresh() {
    this.expenses$ = this.expensesService.list().pipe();

    this.expensesService
      .list()
      .pipe(takeWhile(value => this.isActive))
      .subscribe(result => {
        this.expenses = result;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.expenses$ = this.expensesService.list().pipe();

    this.expensesService.list().subscribe(result => {
      this.expenses = result;
    });
  }
}

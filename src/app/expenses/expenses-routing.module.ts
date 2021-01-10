import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseResolverGuard } from './guards/expense-resolver.guard';

const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  {
    path: 'new',
    component: ExpenseFormComponent,
  },
  {
    path: 'edit/:id',
    component: ExpenseFormComponent,
    resolve: {
      expense: ExpenseResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}

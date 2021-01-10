import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from '../../shared/alert-modal.service';
import { ExpensesService } from '../expenses.service';
import { FormValidations } from '../../shared/validation/form-validations';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  submitted = false;
  today = new Date(Date.now());

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      dateOfBirth: [
        null,
        [Validators.required, FormValidations.dateBeforeTodayValidator()],
      ],
    });

    const expense = this.route.snapshot.data['expense']['model'];

    this.expenseForm.patchValue({
      id: expense.id,
      firstName: expense.firstName,
      lastName: expense.lastName,
      email: expense.email,
      dateOfBirth: this.formatDate(expense.dateOfBirth),
    });
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onSubmit() {
    this.submitted = true;

    if (this.expenseForm.valid) {
      console.log('submit');

      let msgSuccess = 'Usuário criado com sucesso!';
      let msgError = 'Erro ao criar usuário, contate o suporte!';
      if (this.expenseForm.value.id) {
        msgSuccess = 'Usuário atualizado com sucesso!';
        msgError = 'Erro ao atualizar usuário, tente novamente!';
      }

      const MODEL = this.expenseForm.getRawValue();

      // this.expensesService.save(MODEL).subscribe(
      //   success => {
      //     this.modal.showAlertSuccess(msgSuccess);
      //     this.location.back();
      //   },
      //   error => this.modal.showAlertDanger(msgError)
      // );
    }
  }

  onCancel() {
    this.submitted = false;
    this.location.back();
  }

  hasError(field: string) {
    return this.expenseForm.get(field).errors;
  }
}

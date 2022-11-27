import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { CurrencyInfo } from '../shared/models/response';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.scss']
})

export class ConvertationComponent implements OnInit {

  currencies: string[] = []
  
  leftCurrencyRate: object = {}
  rightCurrencyRate: object = {}

  rightInputResult: number = 0;
  leftInputResult: number = 0;

  leftDropValue!: string
  rightDropValue!: string

  form = new FormGroup({
    leftInput: new FormControl(0),
    leftDrop: new FormControl('UAH'),
    rightInput: new FormControl(0),
    rightDrop: new FormControl('USD')
  })

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getCurrentExchange('USD').subscribe(
      (resp: CurrencyInfo) => {
        this.currencies = Object.keys(resp.rates)
      }
    )
  }

  convertCurrencies() {
    this.leftDropValue = this.form.value.leftDrop!.toString()
    this.rightDropValue = this.form.value.rightDrop!.toString()

    this.api.getCurrentExchange(this.rightDropValue).pipe(
      tap((resp: CurrencyInfo) => {
        this.rightCurrencyRate = resp.rates
      }),
      switchMap(() => this.api.getCurrentExchange(this.leftDropValue))
    ).subscribe(
      (resp: CurrencyInfo) => {
        this.leftCurrencyRate = resp.rates

        if (this.form.value.leftInput !== this.leftInputResult) {
          this.rightInputResult = this.form.value.leftInput! * this.leftCurrencyRate[this.rightDropValue as keyof typeof this.leftCurrencyRate]
          this.form.patchValue({
            rightInput: this.rightInputResult
          })
          this.leftInputResult = this.form.value.rightInput! / this.leftCurrencyRate[this.rightDropValue as keyof typeof this.leftCurrencyRate]
        } else if (this.form.value.rightInput !== this.rightInputResult) {
          this.leftInputResult = this.form.value.rightInput! * this.rightCurrencyRate[this.leftDropValue as keyof typeof this.rightCurrencyRate]
          this.form.patchValue({
            leftInput: this.leftInputResult
          })
          this.rightInputResult = this.form.value.leftInput! / this.rightCurrencyRate[this.leftDropValue as keyof typeof this.rightCurrencyRate]
        } else {
          this.rightInputResult = this.form.value.leftInput! * this.leftCurrencyRate[this.rightDropValue as keyof typeof this.leftCurrencyRate]
          this.form.patchValue({
            rightInput: this.rightInputResult
          })
          this.leftInputResult = this.form.value.rightInput! / this.leftCurrencyRate[this.rightDropValue as keyof typeof this.leftCurrencyRate]
        }
      })
  }

  replace() {
    this.leftDropValue = this.form.value.leftDrop!.toString()
    this.rightDropValue = this.form.value.rightDrop!.toString()
    this.form.patchValue({
      leftDrop: this.rightDropValue,
      rightDrop: this.leftDropValue
    })
  }
}

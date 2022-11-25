import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyInfo } from '../shared/models/response';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.scss']
})
export class ConvertationComponent implements OnInit {

  currencies = [
    'EUR',
    'USD',
    'UAH'
  ]
  currentRateUAH!: CurrencyInfo
  currentRateUSD!: CurrencyInfo
  currentRateEUR!: CurrencyInfo

  falseEmitEvent =  { emitEvent: false }


  leftSide = new FormGroup({
    leftInput: new FormControl(0),
    leftDrop: new FormControl('USD')
  })
  rightSide = new FormGroup({
    rightInput: new FormControl(0),
    rightDrop: new FormControl('UAH')
  })

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getCurrentExchange('UAH').subscribe((resp) => this.currentRateUAH = resp)
    this.api.getCurrentExchange('USD').subscribe((resp) => this.currentRateUSD = resp)
    this.api.getCurrentExchange('EUR').subscribe((resp) => this.currentRateEUR = resp)

    this.leftSide.valueChanges.subscribe(
      () => {
        this.changeRightSide()
      }
    )

    this.rightSide.valueChanges.subscribe(
      () => {
        this.changeLeftSide()
      }
    )
  }

  changeRightSide() {
    const leftDropValue = this.leftSide.value.leftDrop
    const rightDropValue = this.rightSide.value.rightDrop
    const USDcurrencyRate = this.currentRateUSD.rates
    const UAHcurrencyRate = this.currentRateUAH.rates
    const EURcurrencyRate = this.currentRateEUR.rates

    if (leftDropValue === 'USD') {
      this.rightSide.patchValue({ rightInput: this.leftSide.value.leftInput! * USDcurrencyRate[rightDropValue as keyof typeof USDcurrencyRate] }, this.falseEmitEvent)
    } else if (leftDropValue === 'UAH') {
      this.rightSide.patchValue({ rightInput: this.leftSide.value.leftInput! * UAHcurrencyRate[rightDropValue as keyof typeof UAHcurrencyRate] }, this.falseEmitEvent)
    } else if (leftDropValue === 'EUR') {
      this.rightSide.patchValue({ rightInput: this.leftSide.value.leftInput! * EURcurrencyRate[rightDropValue as keyof typeof EURcurrencyRate] }, this.falseEmitEvent)
    }
  }

  changeLeftSide() {
    const leftDropValue = this.leftSide.value.leftDrop
    const rightDropValue = this.rightSide.value.rightDrop
    const USDcurrencyRate = this.currentRateUSD.rates
    const UAHcurrencyRate = this.currentRateUAH.rates
    const EURcurrencyRate = this.currentRateEUR.rates

    if (rightDropValue === 'USD') {
      this.leftSide.patchValue({ leftInput: this.rightSide.value.rightInput! * USDcurrencyRate[leftDropValue as keyof typeof USDcurrencyRate] }, this.falseEmitEvent)
    } else if (rightDropValue === 'UAH') {
      this.leftSide.patchValue({ leftInput: this.rightSide.value.rightInput! * UAHcurrencyRate[leftDropValue as keyof typeof UAHcurrencyRate] }, this.falseEmitEvent)
    } else if (rightDropValue === 'EUR') {
      this.leftSide.patchValue({ leftInput: this.rightSide.value.rightInput! * EURcurrencyRate[leftDropValue as keyof typeof EURcurrencyRate] }, this.falseEmitEvent)
    }
  }

  replace() {
    const leftDropValue = this.leftSide.value.leftDrop
    const rightDropValue = this.rightSide.value.rightDrop
    this.leftSide.patchValue({ leftDrop: rightDropValue }, this.falseEmitEvent)
    this.rightSide.patchValue({ rightDrop: leftDropValue }, this.falseEmitEvent)
    this.changeRightSide()
    this.changeLeftSide()
  }
}

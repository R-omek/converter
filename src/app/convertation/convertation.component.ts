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


  leftSide = new FormGroup({
    leftInput: new FormControl(0),
    leftDrop: new FormControl('USD'),
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

  changeLeftSide() {
    if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'UAH') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateUSD.rates.UAH}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'UAH') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateEUR.rates.UAH}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'UAH') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'USD') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateUAH.rates.USD}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'EUR') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateUAH.rates.EUR}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'EUR') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateUSD.rates.EUR}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'USD') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'USD') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput! / this.currentRateEUR.rates.USD}, {emitEvent: false})        
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'EUR') {
      this.leftSide.patchValue({leftInput: this.rightSide.value.rightInput}, {emitEvent: false})        
    }
  }

  changeRightSide() {
    if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'UAH') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateUSD.rates.UAH}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'UAH') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateEUR.rates.UAH}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'UAH') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'USD') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateUAH.rates.USD}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'UAH' && this.rightSide.value.rightDrop === 'EUR') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateUAH.rates.EUR}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'EUR') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateUSD.rates.EUR}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'USD' && this.rightSide.value.rightDrop === 'USD') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput}, {emitEvent: false})
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'USD') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput! * this.currentRateEUR.rates.USD}, {emitEvent: false})        
    } else if (this.leftSide.value.leftDrop === 'EUR' && this.rightSide.value.rightDrop === 'EUR') {
      this.rightSide.patchValue({rightInput: this.leftSide.value.leftInput}, {emitEvent: false})        
    }
  }

  replace() {
    const leftDropValue = this.leftSide.value.leftDrop
    const rightDropValue = this.rightSide.value.rightDrop
    this.leftSide.patchValue({leftDrop: rightDropValue}, {emitEvent: false})
    this.rightSide.patchValue({rightDrop:leftDropValue}, {emitEvent: false})
    this.changeRightSide()
    this.changeLeftSide()
  }
}

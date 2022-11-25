import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { CurrencyInfo } from '../models/response';

@Injectable()
export class ApiService {
  requestURL = 'https://api.exchangerate.host/latest';

  constructor(
    private http: HttpClient
  ) { }

  getCurrentExchange(currency: string) {
    const params = new HttpParams({
      fromObject: {symbols: 'USD,EUR,UAH', base: currency}
    })

    return  this.http.get<CurrencyInfo>(this.requestURL, {params})
  }

}

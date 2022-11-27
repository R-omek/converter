import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usd: number = 0;
  eur: number = 0;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.api.getCurrentExchange('USD').pipe(
      map(v => v.rates['UAH' as keyof typeof v.rates]),
      tap((resp: string) => this.usd = +resp),
      switchMap(() => this.api.getCurrentExchange('EUR'))
    ).pipe(
      map(v => v.rates['UAH' as keyof typeof v.rates]),
    ).subscribe(
      (resp: string) => {
        this.eur = +resp
      })

  }

}

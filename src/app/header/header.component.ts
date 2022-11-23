import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usd: any = null;
  eur: any = null;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getCurrentExchange('USD').subscribe(
      (resp) => {
        this.usd = resp
      }
    )
    this.api.getCurrentExchange('EUR').subscribe(
      (resp) => {
        this.eur = resp
      }
    )
  }

}

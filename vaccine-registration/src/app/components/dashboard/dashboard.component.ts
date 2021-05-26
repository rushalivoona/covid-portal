import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalActive')
  totalActive;
  
  constructor() { }

  ngOnInit(): void {
  }

}

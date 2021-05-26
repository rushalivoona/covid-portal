import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CovidData } from 'src/app/models/covidData';
import { CovidTimeData } from 'src/app/models/covidTimeData';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private covidStatusUrl = 'https://api.covid19india.org/csv/latest/state_wise.csv';
  private timeStatusUrl = 'https://api.covid19india.org/csv/latest/case_time_series.csv';
  constructor(private http: HttpClient) { }

  getCovidStatus() : any{
    return this.http.get(this.covidStatusUrl, { responseType: 'text' }).pipe(
      map(result  => {
        let data: CovidData[] = [];
        let row = result.split('\n');
        row.splice(0,2);
        //console.log(row);
        row.forEach( row => {
          let cols = row.split(',');
          
          if( cols.length != 1){
            data.push({
              state: cols[0],
              confirmed: +cols[1],
              recovered: +cols[2],
              deaths: +cols[3],
              active: +cols[4],

            })
          }         
          
        })

        //console.log(data);
        return <CovidData[]>Object.values(data);
      })
    )
  }

  getTimeWiseData(){
    return this.http.get(this.timeStatusUrl, { responseType: 'text' }).pipe(
      map( result => {
        let timeData : CovidTimeData[] = [];
        let row = result.split('\n');
        //console.log(row);
        row.forEach( r => {
          let cols = r.split(',');
          //console.log(cols);
          timeData.push({
            date : cols[0],
            confirmed : +cols[2],
            recovered : +cols[4],
            deaths : +cols[6]
          })
        })
        return timeData;
      })
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CovidVaccineTimeData } from 'src/app/models/vaccineTimeData';
import { CovidVaccineData } from '../../models/vaccineData';

@Injectable({
  providedIn: 'root'
})
export class VaccineDataService {

  vaccineDataUrl = 'http://api.covid19india.org/csv/latest/cowin_vaccine_data_statewise.csv';
  covaxin:number;
  covishield:number;

  constructor(private http: HttpClient) { }

  getVaccineData(){
    return this.http.get( this.vaccineDataUrl, { responseType:'text'}).pipe(
      map(result => {
        let data: CovidVaccineData[] =[];
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1);
        //console.log(rows);
        rows.forEach( row => {
          let cols = row.split(',');
          //console.log(cols.length);
          //console.log(cols);
          let data = {
            state: cols[1],
            firstDose: +cols[5],
            secondDose: +cols[6],
            covaxin: +cols[10],
            covishield: +cols[11],
            eighteenToThirty: +cols[13],
            thirtyToFortyfive: +cols[14],
            fortyfiveToSixty: +cols[15],
            sixtyPlus: +cols[16],
          };

          let temp:CovidVaccineData = raw[data.state];
          if(temp){
            temp.firstDose = data.firstDose + temp.firstDose
            temp.secondDose = data.secondDose + temp.secondDose
            temp.covaxin = data.covaxin + temp.covaxin
            temp.covishield = data.covishield + temp.covishield
            temp.eighteenToThirty = data.eighteenToThirty + temp.eighteenToThirty
            temp.thirtyToFortyfive = data.thirtyToFortyfive + temp.thirtyToFortyfive
            temp.fortyfiveToSixty = data.fortyfiveToSixty + temp.fortyfiveToSixty
            temp.sixtyPlus = data.sixtyPlus + temp.sixtyPlus

            raw[data.state] = temp;
          }else{
            raw[data.state] = data;
          }
        })

        //console.log(raw);
        
        return <CovidVaccineData[]>Object.values(raw);
      })
    )
  }

  getTimeWiseVaccineData(){
    return this.http.get( this.vaccineDataUrl, { responseType:'text'}).pipe(
      map( result => {
        let raw = {}
        let rows  = result.split('\n');
        rows.splice(0,1);
        //console.log(rows);
        rows.forEach( row => {
          let cols = row.split(',');
          //console.log(cols.length);
          //console.log(cols);
          let data = {
            date: cols[0],
            firstDose: +cols[5],
            secondDose: +cols[6],
          };
          let temp:CovidVaccineTimeData = raw[data.date];
          if(temp){
            temp.firstDose += temp.firstDose + data.firstDose
            temp.secondDose += temp.secondDose + data.secondDose
            raw[data.date] = temp
          }else{
            raw[data.date] = data
          }

        })
        return <CovidVaccineTimeData[]>Object.values(raw);
      })
    )
  }

  getSharedData(covaxin,covishield){
    this.covaxin = covaxin
    this.covishield = covishield
  }

  shareVaccineData(){    
    return ([this.covaxin,this.covishield])
  }
}

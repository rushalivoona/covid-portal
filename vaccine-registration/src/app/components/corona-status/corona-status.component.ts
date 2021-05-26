import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../../services/CovidData/covid-data.service';
import { CovidData } from '../../models/covidData';
import { CovidTimeData } from 'src/app/models/covidTimeData';

@Component({
  selector: 'app-corona-status',
  templateUrl: './corona-status.component.html',
  styleUrls: ['./corona-status.component.css']
})
export class CoronaStatusComponent implements OnInit {

  totalConfirmed = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  totalActive = 0;
  AllConfirmed = 0;
  AllRecovered = 0;
  AllDeaths = 0;
  AllActive = 0;
  statusData: CovidData[];
  timeStatus: CovidTimeData[];
  places: string[] = [];
  datatable = [];
  lineData = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart",
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  

  constructor(private covidStatus : CovidDataService) {
    this.places.push('All');
   }


   initChart( caseType : string){

    this.datatable =[];
    
    this.statusData.forEach( cs => {     
      let value :number ;
      if (caseType == 'c')
        if (cs.confirmed > 20000)
          value = cs.confirmed          
      if (caseType == 'a')
        if (cs.active > 20000)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 10000)
          value = cs.deaths          
      if (caseType == 'r')
        if (cs.recovered > 20000)
            value = cs.recovered

      this.datatable.push([cs.state,value])           
    })
    console.log(this.datatable);
   }

   

  ngOnInit(): void {
    this.covidStatus.getCovidStatus()
    .subscribe({
      next : (result)=>{
        this.statusData = result;
        result.forEach( data => {
          this.AllConfirmed+= data.confirmed;
          this.AllRecovered+= data.recovered;
          this.AllDeaths+= data.deaths;
          this.AllActive+= data.active;
          this.places.push(data.state);
        })

        this.setCharts('c')
      },
      complete : () => {
        this.getData('All');
      }
      
    })

    this.covidStatus.getTimeWiseData()
    .subscribe({
      next : (result) => {
        this.timeStatus = result;
        result.forEach( ts => {
          this.lineData.push([ts.date,ts.confirmed,ts.recovered]);
        })
      }
    })
    
  }

  getData(place){
    if(place == 'All'){
      this.totalConfirmed = this.AllConfirmed;
      this.totalRecovered = this.AllRecovered;
      this.totalActive = this.AllActive
      this.totalDeaths = this.AllDeaths
    }else{
      this.statusData.forEach( cs => {
        if(cs.state == place){
          this.totalConfirmed = cs.confirmed
          this.totalRecovered = cs.recovered
          this.totalDeaths = cs.deaths
          this.totalActive = cs.active
        }
      })
    }
  }

  setCharts(input : string){
    console.log(input);
    this.initChart(input);
  }

  

}

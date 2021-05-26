import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import bootstrap from 'bootstrap';
import { VaccineDataService } from '../../services/VaccineData/vaccine-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  FAQs = false;
  totalFirstDose = 0;
  totalSecondDose = 0;
  totalCovaxinDoses = 0;
  totalCovishieldDoses = 0;
  timeData = [];
  dataTable= [];
  chart = {
    PieChart : "PieChart" ,
    height: 500,
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }

  constructor(private config: NgbCarouselConfig, private vaccineDataService: VaccineDataService) {
    
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows =  true;
   }

  ngOnInit(): void {
    
    this.vaccineDataService.getVaccineData()
    .subscribe({
      next : (result)=>{
        //console.log(result);
        result.forEach( data => {
          if(data.state == 'India'){
          this.totalFirstDose+= data.firstDose;
          this.totalSecondDose+= data.secondDose;
          this.totalCovaxinDoses+= data.covaxin;
          this.totalCovishieldDoses+= data.covishield;
          }
          
        })
        this.dataTable.push(["First Dose",this.totalFirstDose]);
        this.dataTable.push(["Second Dose",this.totalSecondDose]);
        this.vaccineDataService.getSharedData(this.totalFirstDose,this.totalSecondDose);
      }       
      
    })

    

    // this.vaccineDataService.getTimeWiseVaccineData()
    // .subscribe({
    //   next : (result) => {
    //     console.log(result);

    //   }
    // })
  }

  showFAQs(){
    this.FAQs = !this.FAQs
  }
}

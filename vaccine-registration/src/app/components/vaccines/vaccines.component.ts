import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaccineDataService } from 'src/app/services/VaccineData/vaccine-data.service';

 

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css'],

})
export class VaccinesComponent implements OnInit {

  covishieldFAQs = false;
  covaxinFAQs = false;
  covaxinNum:number = 0;
  covishieldNum:number = 0;
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

  constructor(private router: Router, private vaccineDataService: VaccineDataService) { }

  ngOnInit(): void {

    let data = this.vaccineDataService.shareVaccineData()
    this.covaxinNum = data[0]
    this.covishieldNum = data[1]
    this.dataTable.push(["Covaxin",this.covaxinNum]);
    this.dataTable.push(["Covishield",this.covishieldNum]);
  }

  navigateTo(path: string){
    window.location.hash='';
    window.location.hash=path;
  }

  goTo( vaccineType: string){
    this.router.navigateByUrl('https://www.cowin.gov.in/home');
  }

  showCovishieldFAQs(){
    this.covishieldFAQs=!this.covishieldFAQs;
  }

  showCovaxinFAQs(){
    this.covaxinFAQs=!this.covaxinFAQs;
  }

}

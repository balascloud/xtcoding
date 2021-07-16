import { Component, OnInit } from '@angular/core';
///import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { XTCAPIService } from './xtc.services';

@Component({
  selector: 'app-xtc',
  templateUrl: './xtc.component.html',
  styleUrls: ['./xtc.component.scss']
})

export class XtcComponent implements OnInit {

  httpData: any;
  originalData: any;

  currentYear: number = 2021;
  yearsCount = 5;
  years: any = [];
  conditions: any = ['True', 'False'];

  constructor(private apiService: XTCAPIService) { }

  getYears() {
    let _years: any = [];
    this.httpData.forEach((data: any) => {
      _years.push(data.launch_year);
    });
    _years = this.removeDuplicates(_years).sort(function (a, b) {
      return a - b;
    });
    let initialYear = _years[0];
    let currentYear = _years[_years.length - 1];
    _years = [];

    for (let i = initialYear; i <= currentYear; i++) {
      _years.push(i);
    }
    this.years = _years;
  }

  ngOnInit() {
    this.displaydata();
    this.getYears();
  }

  currentFilters: any = {
    'year': null,
    'launch_success': null,
    'land_success': null
  }
  filterByYear(year: any) {
    let _data = this.originalData;
    if (year) {
      this.httpData = _data.filter((data: any) => (data.launch_year == year));
    }
  }


  filterByLaunch(launch: any) {
    let _launchState = (launch == 'True') ? true : false;
    let _data = this.originalData;
    if (launch) {
      this.currentFilters.launch = _launchState;
      this.displaydata(100, _launchState)
    }
  }

  filterByLanding(landing: any) {
    let _landingState = (landing == 'True') ? true : false;
    let _data = this.originalData;
    if (landing) {
      this.currentFilters.landing = _landingState;
      this.httpData = _data.filter((data: any) => (data.rocket.first_stage.cores['land_success'] == _landingState));
    }
  }

  removeDuplicates(arr: []) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it).sort(function (a, b) {
      return a - b;
    });
  }

  selectedIndex: any = {
    'year': null,
    'launch': null,
    'landing': null
  };

  setIndex(type: string, index: number) {
    this.selectedIndex[type] = index;
  }


  displaydata(limit = 100, launch_success = true) {
    this.apiService.getData(limit, launch_success).subscribe((data: any) => {
      this.originalData = data;
      this.httpData = data;
      if (this.currentFilters.year) {
        let _data = this.httpData.filter((data: any) => (data.launch_year == this.currentFilters.year));
        this.httpData = _data
      }
      if (this.currentFilters.launch) {
        let _data = this.httpData.filter((data: any) => (data.launch_year == this.currentFilters.year));
        this.httpData = _data
      }
      if (this.currentFilters.landing) {
        let _data = this.httpData.filter((data: any) => (data.rocket.first_stage.cores['land_success'] == this.currentFilters.year));
        this.httpData = _data
      }      
    });
  }
}

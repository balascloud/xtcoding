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
  currentYear: number = 2021;
  years: any = [];
  conditions: any = ['true', 'false'];

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
    this.loadData(1, this.params);
  }

  currentFilters: any = {
    'launch_success': '',
    'land_success': '',
    'launch_year': ''
  }

  filterBy(type: string, value: any) {
    if (type == 'year')
      this.currentFilters.launch_year = value;
    else if (type == 'launch')
      this.currentFilters.launch_success = (value == 'true') ? true : false;
    else if (type == 'landing')
      this.currentFilters.land_success = (value == 'true') ? true : '';
    this.loadData(false, this.currentFilters);
  }

  removeDuplicates(arr: []) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it).sort(function (a, b) {
      return a - b;
    });
  }

  selectedIndex: any = {
    'year': '',
    'launch': '',
    'landing': ''
  };

  setIndex(type: string, index: number) {
    this.filterSet = true;
    this.selectedIndex[type] = index;
  }

  params: any = {
    launch_success: '',
    land_success: '',
    launch_year: '',
    limit: 100
  };

  loadData(initial: any = false, params: any) {
    this.apiService.getData(params).subscribe((data: any) => {
      if (data) {
        /*
        data.forEach((value: any) => {
          if (value.rocket.first_stage.cores['land_success'] == '') {
            value.rocket.first_stage.cores['land_success'] = false;
          }
        }, data);
        */
        this.httpData = data;
        if (initial)
          this.getYears();
      }
    });
  }

  filterSet: boolean = false;
  clearFilters() {
    this.filterSet = false;
    this.currentFilters = {
      'launch_year': '',
      'launch_success': '',
      'land_success': ''
    }
    this.selectedIndex = {
      'year': '',
      'launch': '',
      'landing': ''
    };
    this.loadData(false, this.currentFilters);
  }
}

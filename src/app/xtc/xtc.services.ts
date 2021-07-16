import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class XTCAPIService {
    serviceUrl: string = 'https://api.spacexdata.com/v3/launches';

    constructor(private http: HttpClient) {

    }

    getData(_params: any) {
        let params: any = {
            launch_success: _params['launch_success'],
            land_success: _params['land_success'],
            launch_year: _params['launch_year'],
            limit: _params['limit']
        };
        return this.http.get<any>(this.serviceUrl + '?limit=' + params['limit'] + '&launch_success=' + params['launch_success'] + '&land_success=' + params['land_success'] + '&launch_year=' + params['launch_year']);
    }
}
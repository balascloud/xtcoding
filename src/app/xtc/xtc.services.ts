import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class XTCAPIService {
    serviceUrl: string = 'https://api.spacexdata.com/v3/launches';

    constructor(private http: HttpClient) {

    }

    getData(limit: number = 100, launch_type: boolean = true, page: number = 1) {
        return this.http.get<any>(this.serviceUrl + '?limit=' + limit + '&launch_success=' + launch_type);
    }
}
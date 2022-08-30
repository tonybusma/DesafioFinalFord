import { DataVehicles } from './../../models/dataVehicle';
import { Observable, pluck, tap } from 'rxjs';
import { Vehicles } from './../../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = "http://localhost:3000/vehicles";
  private urlData = "http://localhost:3000/vehicleData/";

  constructor(private http: HttpClient) { }

  getVehicles() {
    return this.http.get<Vehicles>(this.url).pipe(tap((m) => console.log(m)));
  }

  select(id: string | number) {
    return this.http.get(`${this.url}/${id}`).pipe(tap((m) => console.log(m)));
  }

  getVehicleData(vin: string | null){
    return this.http.get(this.urlData + vin);
  }

}

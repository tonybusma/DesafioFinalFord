import { VehiclesApi, Vehicles, Vehicle } from './../../models/vehicle';
import { tap } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

export enum ChartType { PieChart = 'PieChart' }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vehicles$: Vehicles = [];

  idVehicle!: string | number;
  volTotal?: number | string;
  connected?: number | string;
  softwareUp?: number | string;
  vehicleName?: string;
  img?: string;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getVehicles().subscribe((data) => {
    this.vehicles$ = data;
    console.log(data)
  }) }

  selectVehicle() {
    this.service.select(this.idVehicle).subscribe((dataVehicle: any) => {
      this.volTotal = dataVehicle.total_volume;
      this.connected = dataVehicle.connected;
      this.softwareUp = dataVehicle.software_updates;
      this.vehicleName = dataVehicle.model;
      const img = `./assets/img/${dataVehicle.model}.png`;
      this.img = img;
      console.log(dataVehicle)
    });
  }

}

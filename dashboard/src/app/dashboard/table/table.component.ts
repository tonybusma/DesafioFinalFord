import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  vin = new FormControl('');
  data!: any;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.vin.valueChanges
      .pipe(
        debounceTime(100),
        filter((value) => value!.length > 19),
        distinctUntilChanged(),
        tap((data) => console.log(data)),
        switchMap((data) => this.service.getVehicleData(data)),
        tap((data) => console.log(data))
      )
      .subscribe((obj: any) => {
        this.data = obj[0];
        console.log(obj);
      });
  }
}

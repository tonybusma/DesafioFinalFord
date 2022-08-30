import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  data: any;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getVehicles().subscribe((data) => {
    this.data = data;
    this.init();
    console.log(data)
  }) }

  init(): void {
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.showGraphics());
      }, 1000);
    }
  }

  showGraphics() {
    this.donutGraphic();
  }

  dataTable(){
    const table = new google.visualization.DataTable();

    table.addColumn('string', 'dado');
    table.addColumn('number', 'numero');
    table.addRows(this.data);
  }

  donutGraphic() {
    const element = document.getElementById("donut-chart");
    const chart = new google.visualization.PieChart(element);

    const options = {
      'title': '',
      'width': 250,
      'height': 250,
      'pieHole': 0.4
    }
    chart.draw(this.dataTable(), options);
  }
}

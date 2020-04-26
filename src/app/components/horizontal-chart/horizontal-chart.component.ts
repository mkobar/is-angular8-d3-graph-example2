import { Component, OnInit } from '@angular/core';

declare const createGraph: any;

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: 'horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {
  svg;
  data = {
    "name": "A1 cars",
    "children": [
     {
      "name": "B1 old cars",
      "children": [
       {
        "name": "C1 old used cars",
       },
       {
        "name": "C2 old used trucks",
        "children": [
         {"name": "D1 old trucks", "size": 3534},
         {"name": "D2 new trucks", "size": 5731}
        ]
       },
       {
        "name": "C3 vintage cars",
       }
      ]
     },
     {
      "name": "B2 cars for sale",
      "children": [
       {"name": "C4 old cars for sale", "size": 17010},
       {"name": "C5 used cars for sale", "size": 5842},
       {
        "name": "C6 new cars for sale",
        "children": [
         {"name": "D3 cars for rent", "size": 1983},
         {"name": "D4 cars for lease", "size": 2047}
        ]
       },
       {"name": "C7 rental cars for sale", "size": 6006}
      ]
     },
     {
      "name": "display",
     },
     {
      "name": "physics",
     }
    ]
   };

  constructor() { }

  ngOnInit() {
    createGraph(this.data)
  }

}

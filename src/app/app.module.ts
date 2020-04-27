import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
//import { Mapper2Component } from './components/mapper2/mapper2.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import { MapTreeService } from './service/map-tree.service';
import { HorizontalChartComponent } from './components/horizontal-chart/horizontal-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    //Mapper2Component,
    PieChartComponent,
    BarChartComponent,
    HorizontalChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MapTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

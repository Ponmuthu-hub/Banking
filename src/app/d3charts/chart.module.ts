import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterPlotsChartComponent } from './scatter-plots-chart/scatter-plots-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { DensityChartComponent } from './l-chart/density-chart.component';



@NgModule({
  declarations: [
    PieChartComponent,
    BarChartComponent,
    ScatterPlotsChartComponent,
    BubbleChartComponent,
    GaugeChartComponent,
    DensityChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[PieChartComponent,BarChartComponent,
    ScatterPlotsChartComponent,BubbleChartComponent,
    GaugeChartComponent,DensityChartComponent]
})
export class ChartModule { }

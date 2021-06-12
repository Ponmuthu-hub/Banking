import { Injectable } from '@angular/core';
import jsondata from '../json-data/banking-data.json'

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  StatsPieChart: any[] = jsondata.StatsPieChart;
   
StatsBarChart: any[] = jsondata.StatsBarChart;
 StatsScatterChart:any[]=jsondata.StatsScatterChart;
bubbleDataset :any=jsondata.bubbleDataset;
 gaugeChartData:any=jsondata.gaugeChartData;
 densityChartData:any=jsondata.densityChartData;
  constructor() { }
}

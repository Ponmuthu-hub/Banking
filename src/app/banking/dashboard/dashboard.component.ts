import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 pieChartDatas:any[]=[];
 barChartDatas:any[]=[];
scatterChartDatas:any[]=[];
bubbleChartDatas:any;
children:any[]=[];

  constructor(public dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.refreshPieChartData();
    this.refreshBarChartData();
    this.refreshScatterChartData();
    this.refreshBubbleChartData();
  }
refreshPieChartData(){
for(let i=0;i<this.dashboardService.StatsPieChart.length;i++){
this.pieChartDatas[i]={name:this.dashboardService.StatsPieChart[i].name,
  value:this.dashboardService.StatsPieChart[i].value}
}
}
refreshBarChartData(){
  for(let i=0;i<this.dashboardService.StatsBarChart.length;i++){
    this.barChartDatas[i]={xLabel:this.dashboardService.StatsBarChart[i].branch,
      yLabel:this.dashboardService.StatsBarChart[i].accounts}
    }
}
refreshScatterChartData(){
  for(let i=0;i<this.dashboardService.StatsScatterChart.length;i++){
    this.scatterChartDatas[i]={
      name:this.dashboardService.StatsScatterChart[i].branch,
      xLabel:this.dashboardService.StatsScatterChart[i].Year,
      yLabel:this.dashboardService.StatsScatterChart[i].Stars}
    }
}
refreshBubbleChartData(){
  for(let i=0;i<this.dashboardService.bubbleDataset.children.length;i++){
    this.children[i]={
      Name:this.dashboardService.bubbleDataset.children[i].branch,
      Count:this.dashboardService.bubbleDataset.children[i].employees,
     }
    }
    this.bubbleChartDatas={children:this.children};
}
}

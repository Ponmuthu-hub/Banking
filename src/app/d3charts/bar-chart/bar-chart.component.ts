import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DashboardService } from 'src/app/banking/dashboard.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() chartData:any
  title:string='Active Customers'
  currentRate = 8;
  xAxisName:string='Branch'
  yAxisName:string='Customers'
  width: number=0;
  height: number=0;
  margin = { top: 20, right: 20, bottom: 30, left: 60 };
  x: any;
  y: any;
  svg: any;
  g: any;
  color: any;
  constructor(public dashboardService:DashboardService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
 
   }

  ngOnInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }
  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
      this.color = d3Scale.scaleOrdinal()
      .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A','#FF019A']);
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.chartData.map((d: { xLabel: any; }) => d.xLabel));
    this.y.domain([0, d3Array.max(this.chartData, (d: { yLabel: any;}) => d.yLabel)]);
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text(this.yAxisName);
                // Set svg title
  this.svg.append("text")      
  .attr("x",this.width/2)
  .attr("y", 0)
  .style("text-anchor", "middle")
  .text(this.title)
  .attr("fill", "#00008B"); 
      
      // text label for the y axis
  this.svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - 0)
  .attr("x", 0 - this.height/2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text(this.yAxisName)
  .attr("fill", "red");
  // text label for the x axis
      this.svg.append("text")      
      .attr("x", this.width/2 )
      .attr("y", this.height +55)
      .style("text-anchor", "middle")
      .text(this.xAxisName)
      .attr("fill", "red"); 
  }

  drawBars() {
    this.g.selectAll('.bar')
      .data(this.chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { xLabel: any; })=> this.x(d.xLabel))
      .attr('y', (d: { yLabel: any; }) => this.y(d.yLabel))
      .attr('width', this.x.bandwidth())
      .attr('fill', (d: any) => this.color(d.xLabel))
      .attr('height', (d: { yLabel: any; }) => this.height - this.y(d.yLabel));
  }


}

import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import { format } from 'd3-format'
import * as d3Axis from 'd3-axis';
import { DashboardService } from 'src/app/banking/dashboard.service';
@Component({
  selector: 'app-scatter-plots-chart',
  templateUrl: './scatter-plots-chart.component.html',
  styleUrls: ['./scatter-plots-chart.component.css']
})
export class ScatterPlotsChartComponent implements OnInit {
@Input() chartData:any
title:string='Branch Ratings'
  svg:any;
  private margin = 70;
  private width = 650 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  xAxisName:string='Year'
  yAxisName:string='Review Stars'
  constructor(public dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }
  createSvg(): void {
    this.svg = d3.select("#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
drawPlot(): void {
  // Add X axis
  const x = d3Scale.scaleLinear()
  .domain([2009, 2021])
  .range([ 0, this.width ]);
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3Axis.axisBottom(x).tickFormat(format("d")));
  // Set svg title
  this.svg.append("text")      
  .attr("x", this.width/2 )
  .attr("y", 0)
  .style("text-anchor", "middle")
  .text(this.title)
  .attr("fill", "#00008B");
// text label for the y axis
  this.svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - this.margin)
  .attr("x", 0 - (this.height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text(this.yAxisName)
  .attr("fill", "red");
  // text label for the x axis
      this.svg.append("text")      
      .attr("x", this.width/2 )
      .attr("y", this.height +35)
      .style("text-anchor", "middle")
      .text(this.xAxisName)
      .attr("fill", "red"); 

  // Add Y axis
  const y = d3Scale.scaleLinear()
  .domain([0, 200000])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(d3Axis.axisLeft(y));

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(this.chartData)
  .enter()
  .append("circle")
  .attr("cx", (d: { xLabel: d3Scale.NumberValue; }) => x(d.xLabel))
  .attr("cy", (d: { yLabel: d3Scale.NumberValue; }) => y(d.yLabel))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#FF019A");

  // Add labels
  dots.selectAll("text")
  .data(this.chartData)
  .enter()
  .append("text")
  .text((d: { name: any; }) => d.name)
  .attr("x", (d: { xLabel: d3Scale.NumberValue; }) => x(d.xLabel))
  .attr("y", (d: { yLabel: d3Scale.NumberValue; }) => y(d.yLabel))
}

}

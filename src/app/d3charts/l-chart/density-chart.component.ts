import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { contourDensity } from 'd3';
import * as d3Scale from 'd3-scale';
import { format } from 'd3-format'
@Component({
  selector: 'app-density-chart',
  templateUrl: './density-chart.component.html',
  styleUrls: ['./density-chart.component.css']
})
export class DensityChartComponent implements OnInit {
  @Input() chartData:any;
  xAxisName:string='Year'
  yAxisName:string='Profit in Percentage(%)'
  title:string='Bank Profit'
  margin = { top: 10, right: 30, bottom: 45, left: 60 };
  width = 450;
  height = 350;
  svg: any;
  tooltip:any;
  private colors: any;
  constructor() {}
  ngOnInit(): void {
    this.createSvg();
    this.createColors(this.chartData);
    this.drawChart();
    
  }
  private createSvg(): void {
    this.svg =d3
      .select("figure#density")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.left + this.margin.right} ${this
          .height +
          this.margin.top +
          this.margin.bottom}`
      )
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
  }

  private createColors(data: any): void {
    // Prepare a color palette
    this.colors =d3Scale.scaleOrdinal()
      .domain(['0' ,'1']) // Points per square pixel.
      // .range(['#FFA500', '#00FF00'])
      .range(["#63adfeb3", "#6773f1"]);
     
  }

  private drawChart(): void {
   
    // Set svg title
  this.svg.append("text")      
  .attr("x", this.width/2 )
  .attr("y", 10)
  .style("text-anchor", "middle")
  .text(this.title)
  .attr("fill", "#00008B");
    // Add X axis
    const x =d3
      .scaleLinear()
      .domain([2011, 2020])
      .range([0, this.width - this.margin.right]);
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickFormat(format("d")));
        // text label for the x axis
        this.svg.append("text")      
        .attr("x", this.width/2 )
        .attr("y", this.height +35)
        .style("text-anchor", "middle")
        .text(this.xAxisName)
        .attr("fill", "red"); 
        //Add tool tip
        this.tooltip = d3.select("body").append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style("color", "#00008B")
        .style('text-align', 'center')

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0,100])
      .range([this.height , this.margin.top]);
    this.svg.append("g").call(d3.axisLeft(y));
    // text label for the y axis
  this.svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - this.margin.left+15)
  .attr("x", 0 - (this.height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text(this.yAxisName)
  .attr("fill", "red");

    // compute the density data
    var densityData = contourDensity()
      .x(d => {
        return x(d[0]);
      })
      .y(d => {
        return y(d[1]);
      })
      .size([this.width, this.height])
      .bandwidth(20)(this.chartData);

    // show the shape!
    this.svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d",d3.geoPath())
      .attr("fill", (d: { value: any; }) => {
        return this.colors(d.value);
      })

  }

}

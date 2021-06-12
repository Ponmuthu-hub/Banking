import { Component, Input, OnInit } from '@angular/core';
import * as D3 from 'd3';
import * as d3 from 'd3-selection';
import { DashboardService } from 'src/app/banking/dashboard.service';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
@Input() chartData:any
  constructor(public dashboardService:DashboardService) { }
title:string='Loan with Consumers'
height:any;
width:any;
bubble:any;
svg:any;
nodes:any;
tooltip:any;
  ngOnInit(): void {
    this.initSvg();
    this.drawChart();
  }
  initSvg(){
    this.height = 500;
    this.width = 800;


    this.bubble = D3.pack()
      .size([this.width, this.height])
      .padding(1);

      this.svg = d3.select('#bubble-chart')
      .append("svg")
      .attr("width", this.width)
      .attr("height",this. height)
      .attr("class", "bubble");

      this.nodes = D3.hierarchy(this.chartData)
      .sum(function (d: any) {
        return d.Count;
      });
        // Set svg title
  this.svg.append("text")      
  .attr("x", this.width/4 )
  .attr("y", 25)
  .style("text-anchor", "middle")
  .text(this.title)
  .attr("fill", "#00008B");
  }
  drawChart() {
  
    let color = D3.scaleOrdinal(D3.schemeCategory10);
    let node = this.svg.selectAll(".node")
      .data(this.bubble(this.nodes).descendants())
      .enter()
      .filter(function (d: { children: any; }) {
        return !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d: { x: string; y: string; }) {
        return "translate(" + d.x + "," + d.y + ")";
      }).style("fill", function (d: any, i: any) {
        return color(i);
      });
      this.tooltip = d3.select("body").append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style("color", "#00008B")
      .style('text-align', 'center');

    node.append("title")
      .text(function (d: any) {
        return d.Name + ": " + d.Count;
      });

    node.append("circle")
      .attr("x", function (d: any) { return d.x; })
      .attr("y", function (d: any) { return d.y })
      .attr("r", function (d: any) {
        return d.r;
      })
      .style("fill", function (d: any, i: any) {
        return color(i);
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d: any) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append('text')
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans")
      .attr("font-size", function (d: any) {
        return d.r / 5;
      })
      .attr("fill", "white");
      node.on('mouseover', (d: any, i: any) => {   
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        this.tooltip.html('<br/>' + i.data.Name + ' Loan <br/>' + i.data.Count+' Consumers')
          .style('left', 70 + 'px')
          .style('top', 700 + 'px')
          .style('font-weight','bold');
      })
      node.on('mouseout', (d: any) => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0)
          ;
      });


  }
}

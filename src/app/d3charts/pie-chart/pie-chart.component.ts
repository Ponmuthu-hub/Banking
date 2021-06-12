import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { DashboardService } from 'src/app/banking/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartData: any[] = []
  title = 'Working Employees';
  tooltip: any

  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number = 0;
  height: number = 0;
  radius: number = 0;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;

  constructor(public dashboardService: DashboardService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit(): void {
    this.initSvg();
    this.drawPie();
  }
  initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(['#ff4d4d', '#99ccff', '#ffff66', '#cc6699', '#00cc99', '#7575a3', '#ff9900', '#cc99ff','#c4ff4d','33ccff']);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);

    this.svg = d3.select('#pieChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
      .append('g')
      .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
    this.tooltip = d3.select("body").append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style("color", "#00008B")
      .style('text-align', 'center')

  }

  drawPie() {
    const g = this.svg.selectAll('.arc')
      .data(this.pie(this.chartData))
      .enter().append('g')
      .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.name));
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.name)
      
      

    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.value + '%')
      .style('font-weight','bold')
      g.on('mouseover', (d: any, i: any) => {   
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        this.tooltip.html('<br/>' + this.title + '<br/>' + i.data.name + '<br/>' + i.data.value+ '%')
          .style('left', (this.width+250) + 'px')
          .style('top', 1200 + 'px')
          .style('font-weight','bold');
      })
      g.on('mouseout', (d: any) => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0)
          ;
      });
  }

}

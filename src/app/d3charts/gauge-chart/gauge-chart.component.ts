import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {
  @Input() chartData:any;
  gaugemap:any = {};
  
  constructor() { }

  ngOnInit() {
    this.draw();
  }

  draw() {
    var self = this;
    var gauge = function (container: string, configuration: { size: number; clipWidth: number; clipHeight: number; ringWidth: number; maxValue: number; transitionMs: number; }) {

      var config = {
        
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 5,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#f54269'), d3.rgb('#42f557'))
      };
      var range: any;
      var r: any;
      var pointerHeadLength:any;

      var svg :any;
      var arc :any;
      var scale:any;
      var ticks:any;
      var tickData:any;
      var pointer:any;

      function deg2rad(deg: number) {
        return deg * Math.PI / 180;
      }


      function configure(configuration: { [x: string]: any; size?: number; clipWidth?: number; clipHeight?: number; ringWidth?: number; maxValue?: number; transitionMs?: number; }) {
        config.size= configuration.size||0;
        config.clipWidth=configuration.clipWidth||0;
         config.clipHeight=configuration.clipHeight||0;
        config.ringWidth=configuration.ringWidth||0;
        config.transitionMs=configuration.transitionMs||0;
        config.maxValue=configuration.maxValue||0;

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d, i) {
            var ratio = +d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function (d, i) {
            var ratio = +d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }
      self.gaugemap.configure = configure;

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue: undefined) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);
        var centerTx = centerTranslation();

        var arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d: number, i: number) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        var lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          .attr('transform', function (d: any) {
            var ratio = scale(d);
            var newAngle = config.minAngle + (ratio * range);
            return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
          })
          .text(config.labelFormat);

        var lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        var pointerLine = d3.line().curve(d3.curveLinear)
        var pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg.append('path')
          .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue: number | undefined, newConfiguration?: { [x: string]: any; size?: number | undefined; clipWidth?: number | undefined; clipHeight?: number | undefined; ringWidth?: number | undefined; maxValue?: number | undefined; transitionMs?: number | undefined; } | undefined) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    var powerGauge = gauge('#power-gauge', {
      size: 500,
      clipWidth: 700,
      clipHeight: 400,
      ringWidth: 100,
      maxValue: this.chartData.maxRatings,
      transitionMs: 4000,
    });
    powerGauge.render(this.chartData.ratings);
  }
}

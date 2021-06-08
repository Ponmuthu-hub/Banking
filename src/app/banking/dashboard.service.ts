import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  StatsPieChart: any[] = [
    {name: 'Educational', value:6},
    {name: 'Housing', value: 14},
    {name: 'Car', value: 11},
    {name: 'Gold', value:19},
    {name: 'Bike', value: 4},
    {name: 'Personal',value: 12},
    {name: 'Farming', value:13},
    {name: 'Business', value: 21}

];
StatsBarChart: any[] = [
  { branch: "Madurai", accounts: 56732 },
  { branch: "Chennai", accounts: 68798 },
  { branch: "Trichy", accounts: 45367 },
  { branch: "Selam", accounts: 24467 },
  { branch: "Namakkal", accounts: 19400 },
  { branch: "Sivaganga", accounts: 10900 },
  { branch: "Ramnad", accounts: 11388 },
  { branch: "kadalur", accounts: 8636 },
  { branch: "Coimbatore",accounts: 46667 }

];
 StatsScatterChart:any[]=[
  {branch: "Madurai", Stars: 166443, Year: 2019},
  {branch: "Chennai", Stars: 150793, Year: 2021},
  {branch: "Trichy", Stars: 62342, Year: 2016},
  {branch: "Sivaganga", Stars: 27647, Year: 2010},
  {branch: "Coimbatore", Stars: 41471, Year: 2011},
  {branch: "Ramnad", Stars: 37647, Year: 2014},
  {branch: "Selam", Stars: 21471, Year: 2013}
];
bubbleDataset :any={
      children: [
        {branch: 'Madurai', employees: 70},
        {branch: 'Chennai', employees: 135},
        {branch: 'Selam', employees: 68},
        {branch: 'Namakkal', employees: 49},
        {branch: 'Sivaganga', employees:36 },
        {branch: 'Trichy', employees: 57},
        {branch: 'Ramnad', employees:56}
      ]
     };
 
  constructor() { }
}

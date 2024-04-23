import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from '../data.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  selectedChartType: string = 'genderBar'; // Default selected chart type
  genderBarChart: Chart = new Chart({});
  genderPieChart: Chart = new Chart({});
  ageBarChart: Chart = new Chart({});
  agePieChart: Chart = new Chart({});
  ratingBarChart: Chart = new Chart({});
  ratingPieChart: Chart = new Chart({});

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchGenderRatio();
    this.fetchAgeDistribution();
    this.fetchRatingsDistribution();
  }

  fetchGenderRatio(): void {
    this.dataService.getGenderRatio().subscribe(
      (data: any) => {
        this.renderGenderCharts(data);
      },
      (error) => {
        console.error('Error fetching gender ratio:', error);
      }
    );
  }

  renderGenderCharts(data: any): void {
    this.renderGenderBarChart(data);
    this.renderGenderPieChart(data);
  }

  fetchAgeDistribution(): void {
    this.dataService.getAgeDistribution().subscribe(
      (data: any) => {
        this.renderAgeCharts(data);
        console.log(data)
      },
      (error) => {
        console.error('Error fetching age distribution:', error);
      }
    );
  }

  fetchRatingsDistribution(): void {
    this.dataService.getRatingsDistribution().subscribe(
      (data: any) => {
        this.renderRatingsCharts(data);
      },
      (error) => {
        console.error('Error fetching ratings distribution:', error);
      }
    );
  }

  renderRatingsCharts(data: any): void {
    this.renderRatingBarChart(data);
    this.renderRatingPieChart(data);
  }

  renderAgeCharts(data: any): void {
    this.renderAgeBarChart(data);
    this.renderAgePieChart(data);
  }

  renderGenderBarChart(data: any): void {
    this.genderBarChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Male to Female Ratio of Employees (Bar Chart)'
      },
      xAxis: {
        categories: ['Male', 'Female']
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'bar',
        name: 'Gender Ratio',
        data: [data.maleCount, data.femaleCount]
      }]
    });
  }

  renderGenderPieChart(data: any): void {
    this.genderPieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Male to Female Ratio of Employees (Pie Chart)'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Gender Ratio',
        data: [
          { name: 'Male', y: data.maleCount },
          { name: 'Female', y: data.femaleCount }
        ]
      }]
    });
  }

  renderAgeBarChart(data: any): void {
    this.ageBarChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Age Distribution of Employees (Bar Chart)'
      },
      xAxis: {
        categories: ['21-25', '26-30', '31-35', '35+']
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'bar',
        name: 'Age Distribution',
        data: [
          data['21-25'],
          data['26-30'],
          data['31-35'],
          data['35+']
        ]
      }]
    });
  }

  renderAgePieChart(data: any): void {
    this.agePieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Age Distribution of Employees (Pie Chart)'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Age Distribution',
        data: [
          { name: '21-25', y: data['21-25'] },
          { name: '26-30', y: data['26-30'] },
          { name: '31-35', y: data['31-35'] },
          { name: '35+', y:  data['35+'] }
        ]
      }]
    });
  }
  renderRatingBarChart(data: any): void {
    this.ratingBarChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Rating Distribution of Employees (Bar Chart)'
      },
      xAxis: {
        categories: ['below 4.0','4.1-4.2', '4.3-4.4', '4.5-4.6', '4.7-4.8','4.9-5.0']
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'bar',
        name: 'Age Distribution',
        data: [
          data['below 4.0'],
          data['4.1-4.2'],
          data['4.3-4.4'],
          data['4.5-4.6'],
          data['4.7-4.8'],
          data['4.9-5.0'],
        ]
      }]
    });
  }

  renderRatingPieChart(data: any): void {
    this.ratingPieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Rating Distribution of Employees (Pie Chart)'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Rating Distribution',
        data: [
          { name: 'below 4.0', y: data['below 4.0'] },
          { name: '4.1-4.2', y: data['4.1-4.2'] },
          { name: '4.3-4.4', y: data['4.3-4.4'] },
          { name: '4.5-4.6', y: data['4.5-4.6'] },
          { name: '4.7-4.8', y: data['4.7-4.8'] },
          { name: '4.9-5.0', y: data['4.9-5.0'] }
        ]
      }]
    });
  }

  // Function to handle chart type selection
  selectChart(chartType: string): void {
    this.selectedChartType = chartType;
    
    // Re-fetch and render data for the selected chart type
    switch(chartType) {
      case 'genderBarChart':
        this.fetchGenderRatio();
        break;
      case 'genderPieChart':
        this.fetchGenderRatio();
        break;
      case 'ageBarChart':
        this.fetchAgeDistribution();
        break;
      case 'agePieChart':
        this.fetchAgeDistribution();
        break;
      case 'ratingBarChart':
        this.fetchRatingsDistribution();
        break;
      case 'ratingPieChart':
        this.fetchRatingsDistribution();
        break;
      default:
        break;
    }
  }
  
}

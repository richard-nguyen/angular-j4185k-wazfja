import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartComponent,IAccLoadedEventArgs, IAnimationCompleteEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import {DataService, Data} from './remote.service';
import { Observable } from  'rxjs';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('chart', {static: false})
  public chart: ChartComponent;
  public chartData: Data[] = [];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public animation : Object;
  public Obs : Observable<Data[]>;
  constructor(private dataService: DataService) { 
    this.Obs = new Observable((observer) => {
      observer.next(this.dataService.getData(true));
      setInterval(() => {
        observer.next(this.dataService.getData(false));
       }, 1000);
     });
   }
     public complete(args: IAccLoadedEventArgs): void {
    setInterval(() => {
      this.dataService.updateData();
    }, 400)    
  }
    //Initializing Primary X Axis
    ngOnInit(): void {
   this.primaryXAxis = {
      valueType: 'DateTime'
   };
  this.primaryYAxis = {
    labelFormat: '{value}°C',
    minimum : 5,
    maximum : 25
  };
  this.animation = {
    enable : false
  };
  
   this.Obs.subscribe((value) => {     
      debugger; 
      this.chartData = value;         
      if (this.chart && this.chart.series[0].dataSource) {
        this.chart.series[0].animation.enable = false;
        this.chart.series[0].dataSource = value;
        this.chart.refresh();
      }
    });    
   }
   
    

}
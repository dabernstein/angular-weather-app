import { Directive, ElementRef, OnInit, Component, Inject, LOCALE_ID} from '@angular/core';
import { formatDate, LowerCasePipe } from '@angular/common';
import { AppComponent } from '../app.component';

@Directive({
  selector: '[appForecast]'
})
export class ForecastDirective implements OnInit{

  constructor(private forecastContainer: ElementRef, private appData: AppComponent, @Inject(LOCALE_ID) public local: string) { 
    
  }

  ngOnInit() {
    this.dataBuild();
    //console.log(formatDate("2023-04-02 23:00", 'H', this.local));
  }

  createForecastBlocks(time: string, temp: number) {
    const outerElem: HTMLElement = document.createElement('div');
    outerElem.classList.add('hour-info');
    const innerTopElem: HTMLElement = document.createElement('div');
    innerTopElem.classList.add('hour');
    const innerBottomElem: HTMLElement = document.createElement('div');
    innerBottomElem.classList.add('hour-temp');

    if (time == "Now") {
      innerTopElem.textContent = time.replace(' ', '');
    }
    else {
      innerTopElem.textContent = time.toLowerCase().replace(' ', '');
    }
    innerBottomElem.textContent = Math.round(temp) + "°F";

    this.forecastContainer.nativeElement.appendChild(outerElem);
    outerElem.appendChild(innerTopElem);
    outerElem.appendChild(innerBottomElem);
  }

  dataBuild() {

    if (!this.appData.weatherData) return;
    const weatherData = this.appData.weatherData;
    const currentTime = formatDate(weatherData.location.localtime, 'H', this.local);
    
    const dayAmount: number = 2;
    for (let i = 0; i < dayAmount; i++) {
      if (i == 0) {
        for (let j = Number(currentTime); j <= 23; j++) { 
          if (j == Number(currentTime)) {
            this.createForecastBlocks("Now", weatherData.forecast.forecastday[i].hour[j].temp_f);
          }
          else {
            this.createForecastBlocks(formatDate(weatherData.forecast.forecastday[0].hour[j].time, 'h a', this.local), weatherData.forecast.forecastday[i].hour[j].temp_f);
          }
        }
      }
      else {
        for (let j = 0; j <= 23; j++) { 
          this.createForecastBlocks(formatDate(weatherData.forecast.forecastday[0].hour[j].time, 'h a', this.local), weatherData.forecast.forecastday[i].hour[j].temp_f);
        }
      }
    }

  }

}

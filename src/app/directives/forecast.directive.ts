import { Directive, ElementRef, EmbeddedViewRef, OnInit, Renderer2 } from '@angular/core';
import { AppComponent } from '../app.component';

@Directive({
  selector: '[appForecast]'
})
export class ForecastDirective implements OnInit{

  constructor(private forecastContainer: ElementRef, private appData: AppComponent, private renderer: Renderer2) { }

  ngOnInit() {

  }

  createForecastBlocks(time: string, temp: string) {
    const outerElem: HTMLElement = document.createElement('div');
    outerElem.classList.add('hour-info');
    const innerTopElem: HTMLElement = document.createElement('div');
    innerTopElem.classList.add('hour');
    const innerBottomElem: HTMLElement = document.createElement('div');
    innerBottomElem.classList.add('hour-temp');

    innerTopElem.textContent = time;
    innerBottomElem.textContent = temp + "°F";

    this.forecastContainer.nativeElement.appendChild(outerElem);
    outerElem.appendChild(innerTopElem);
    outerElem.appendChild(innerBottomElem);
  }

}

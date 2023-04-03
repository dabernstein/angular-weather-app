import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appForecastSlider]'
})
export class ForecastSliderDirective {

  constructor(private slider: ElementRef) { }
  
  isDown = false;
  startX: any;
  scrollLeft: any;
  
  @HostListener('mousedown', ['$event']) MouseDown(event: MouseEvent) {
    this.isDown = true;
    this.slider.nativeElement.classList.add('active');
    this.startX =  event.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }

  @HostListener('mouseup') MouseUp() {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }

  @HostListener('mouseleave') MouseLeave() {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }

  @HostListener('mousemove', ['$event']) moveEvent(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.slider.nativeElement.offsetLeft;
    const scroll = (x - this.startX);
    this.slider.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }

}

import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { RenderStrategy } from '../models';

@Directive({
  standalone: true,
  selector: '[appDepthThrottle]'
})
export class DepthThrottleDirective {
  @Input() appDepthThrottle: RenderStrategy = RenderStrategy.DEFAULT; 

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('click') onClick() {
    let color: string;
    
    switch(this.appDepthThrottle) { 
      case RenderStrategy.DEFAULT:
        color = '#ff4444';
        break;
      case RenderStrategy.ON_PUSH:
        color = '#ffaa00';
        break;
      case RenderStrategy.MANUAL:
        color = '#44ff44';
        break;
      case RenderStrategy.FROZEN:
        color = '#4444ff';
        break;
      default:
        color = '#cccccc';
    }

    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    
    setTimeout(() => {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }, 300);
  }
}
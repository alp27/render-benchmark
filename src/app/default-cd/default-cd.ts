
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-cd',
  template: `
    <div class="box">
      <p>Default CD - Value: {{ value }}</p>
    </div>
  `,
})
export class DefaultCdComponent {
  @Input() value = 0;
}
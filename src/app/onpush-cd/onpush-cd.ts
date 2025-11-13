
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-onpush-cd',
  template: `
    <div class="box onpush">
      <p>OnPush CD - Value: {{ value }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushCdComponent {
  @Input() value = 0;
}
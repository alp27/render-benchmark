import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-one',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div class="lazy-component" style="border: 2px solid blue; padding: 20px; margin: 10px;">
      <h3>🔥 Lazy Component 1</h3>
      <p>Bu component lazy loading ile yüklendi</p>
      <p>Zaman: {{ time }}</p>
      <div *ngFor="let item of items" class="item">
        {{ item }}
      </div>
    </div>
  `,
  styles: [`
    .item { padding: 4px; margin: 2px; background: #f0f0f0; }
    .lazy-component { background: #e3f2fd; }
  `]
})
export class LazyOneComponent {
  time = new Date().toLocaleTimeString();
  items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
}
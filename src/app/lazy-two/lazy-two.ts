import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-two',
  standalone: true,
  imports: [CommonModule], // ✅ CommonModule eklendi
  template: `
    <div class="lazy-component" style="border: 2px solid green; padding: 20px; margin: 10px;">
      <h3>🚀 Lazy Component 2</h3>
      <p>Bu component de lazy loading ile yüklendi</p>
      <p>Zaman: {{ time }}</p>
      <div *ngFor="let item of items" class="item">
        {{ item }}
      </div>
    </div>
  `,
  styles: [`
    .item { padding: 4px; margin: 2px; background: #f0f8ff; }
    .lazy-component { background: #e8f5e8; }
  `]
})
export class LazyTwoComponent {
  time = new Date().toLocaleTimeString();
  items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
}
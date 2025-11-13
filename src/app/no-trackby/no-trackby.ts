import { Component } from '@angular/core';

@Component({
  selector: 'app-no-trackby',
  template: `
    <h3>TrackBy Olmadan Liste</h3>
    <button (click)="shuffle()">Sırayı Karıştır</button>
    <ul>
      <li *ngFor="let item of items">{{ item.name }}</li>
    </ul>
  `,
})
export class NoTrackByComponent {
  items = Array.from({ length: 500 }, (_, i) => ({ id: i, name: 'Eleman ' + i }));

  shuffle() {
    this.items = [...this.items].sort(() => Math.random() - 0.5);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-trackby',
  template: `
    <h3>TrackBy ile Liste</h3>
    <button (click)="shuffle()">Sırayı Karıştır</button>
    <ul>
      <li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
    </ul>
  `,
})
export class TrackByComponent {
  items = Array.from({ length: 500 }, (_, i) => ({ id: i, name: 'Eleman ' + i }));

  shuffle() {
    this.items = [...this.items].sort(() => Math.random() - 0.5);
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}

import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detach-test',
  standalone: true,
  template: `
    <h3>ChangeDetectorRef.detach() Testi</h3>
    <p>Değer: {{ counter }}</p>
    <p>detectChanges() çağrı sayısı: {{ detectChangesCount }}</p>
    <p>Toplam detectChanges süresi: {{ totalDetectChangesTime.toFixed(2) }} ms</p>
    <p>Ortalama detectChanges süresi: {{ averageDetectChangesTime.toFixed(2) }} ms</p>
    
    <button (click)="increment()">Artır (manuel güncelle)</button>
    <button (click)="autoUpdate()">Otomatik Artış (her 1 sn)</button>
    <button (click)="massUpdate()">Toplu Güncelle (1000 kez)</button>
    <button (click)="resetStats()">İstatistikleri Sıfırla</button>
    
    <p *ngIf="detached">(Bileşen Angular değişiklik takibinden çıkarıldı)</p>
  `,
  styles: [`
    button { margin-right: 8px; margin-bottom: 8px; }
    h3 { margin-bottom: 8px; }
    p { margin: 4px 0; }
  `]
})
export class DetachTestComponent {
  counter = 0;
  detached = false;
  detectChangesCount = 0;
  totalDetectChangesTime = 0;
  intervalId: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.cd.detach();
    this.detached = true;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  increment() {
    this.counter++;
    this.measureDetectChanges();
  }

  autoUpdate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.intervalId = setInterval(() => {
        this.counter++;
        this.measureDetectChanges();
      }, 1000);
    }
  }

  massUpdate() {
    const iterations = 1000;
    console.time('massUpdate');
    
    for (let i = 0; i < iterations; i++) {
      this.counter++;
      this.measureDetectChanges();
    }
    
    console.timeEnd('massUpdate');
  }

  measureDetectChanges() {
    const startTime = performance.now();
    this.cd.detectChanges();
    const endTime = performance.now();
    
    const duration = endTime - startTime;
    this.detectChangesCount++;
    this.totalDetectChangesTime += duration;
    
    console.log(`detectChanges() #${this.detectChangesCount}: ${duration.toFixed(2)} ms`);
  }

  get averageDetectChangesTime(): number {
    return this.detectChangesCount > 0 
      ? this.totalDetectChangesTime / this.detectChangesCount 
      : 0;
  }

  resetStats() {
    this.detectChangesCount = 0;
    this.totalDetectChangesTime = 0;
    this.counter = 0;
  }
}
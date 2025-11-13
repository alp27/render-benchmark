import { Component, ComponentRef, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>🚀 Lazy Loading Performans Testi</h3>
    
    <div class="controls">
      <button (click)="loadLazyOne()" [disabled]="loading">
        {{ isComponent1Loaded ? '✅ Lazy 1 Yüklendi' : '📥 Lazy 1 Yükle' }}
      </button>
      
      <button (click)="loadLazyTwo()" [disabled]="loading">
        {{ isComponent2Loaded ? '✅ Lazy 2 Yüklendi' : '📥 Lazy 2 Yükle' }}
      </button>
      
      <button (click)="loadBoth()" [disabled]="loading">
        📥 Her İkisini Birden Yükle
      </button>
      
      <button (click)="clear()" [disabled]="loading">
        🗑️ Temizle
      </button>
    </div>

    <div class="stats">
      <p><strong>Performans Metrikleri:</strong></p>
      <p>Lazy 1 Yükleme Süresi: {{ loadTime1 ? loadTime1 + ' ms' : 'Henüz yüklenmedi' }}</p>
      <p>Lazy 2 Yükleme Süresi: {{ loadTime2 ? loadTime2 + ' ms' : 'Henüz yüklenmedi' }}</p>
      <p>Toplam Yükleme Süresi: {{ totalLoadTime ? totalLoadTime + ' ms' : 'Henüz yüklenmedi' }}</p>
      <p>Yüklenen Component Sayısı: {{ loadedComponentsCount }}</p>
      <p *ngIf="loading">⏳ Yükleniyor...</p>
    </div>

    <div class="components-container">
      <ng-container #componentContainer></ng-container>
    </div>
  `,
  styles: [`
    .controls { margin: 15px 0; }
    button { 
      margin-right: 10px; 
      margin-bottom: 10px;
      padding: 8px 16px;
    }
    .stats { 
      background: #f5f5f5; 
      padding: 15px; 
      border-radius: 5px;
      margin: 15px 0;
    }
    .stats p { margin: 5px 0; }
    .components-container { margin-top: 20px; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class LazyTestComponent {
  @ViewChild('componentContainer', { read: ViewContainerRef }) 
  componentContainer!: ViewContainerRef;

  loading = false;
  loadTime1: number | null = null;
  loadTime2: number | null = null;
  totalLoadTime: number | null = null;
  
  isComponent1Loaded = false;
  isComponent2Loaded = false;
  
  constructor(private cd: ChangeDetectorRef) {}

  get loadedComponentsCount(): number {
    return (this.isComponent1Loaded ? 1 : 0) + (this.isComponent2Loaded ? 1 : 0);
  }

  async loadLazyOne() {
    if (this.isComponent1Loaded) return;
    
    this.loading = true;
    const startTime = performance.now();
    
    try {
      const { LazyOneComponent } = await import('../lazy-one/lazy-one');
      
      const endTime = performance.now();
      this.loadTime1 = Math.round(endTime - startTime);
      
      this.componentContainer.createComponent(LazyOneComponent);
      this.isComponent1Loaded = true;
      this.updateTotalLoadTime();
      
      console.log('LazyOneComponent yüklendi:', this.loadTime1 + 'ms');
      
    } catch (error) {
      console.error('LazyOneComponent yükleme hatası:', error);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  async loadLazyTwo() {
    if (this.isComponent2Loaded) return;
    
    this.loading = true;
    const startTime = performance.now();
    
    try {
      const { LazyTwoComponent } = await import('../lazy-two/lazy-two');
      
      const endTime = performance.now();
      this.loadTime2 = Math.round(endTime - startTime);
      
      this.componentContainer.createComponent(LazyTwoComponent);
      this.isComponent2Loaded = true;
      this.updateTotalLoadTime();
      
      console.log('LazyTwoComponent yüklendi:', this.loadTime2 + 'ms');
      
    } catch (error) {
      console.error('LazyTwoComponent yükleme hatası:', error);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  async loadBoth() {
    if (this.isComponent1Loaded && this.isComponent2Loaded) return;
    
    const startTime = performance.now();
    this.loading = true;
    
    try {
      // Bireysel yükleme sürelerini sıfırla
      const individualStartTime1 = performance.now();
      const individualStartTime2 = performance.now();
      
      const promises = [];
      
      if (!this.isComponent1Loaded) {
        promises.push(this.loadLazyOneWithTime(individualStartTime1));
      }
      
      if (!this.isComponent2Loaded) {
        promises.push(this.loadLazyTwoWithTime(individualStartTime2));
      }
      
      await Promise.all(promises);
      
      const endTime = performance.now();
      this.totalLoadTime = Math.round(endTime - startTime);
      
      console.log('Tüm componentler yüklendi. Toplam süre:', this.totalLoadTime + 'ms');
      console.log('Bireysel süreler - Lazy1:', this.loadTime1 + 'ms, Lazy2:', this.loadTime2 + 'ms');
      
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  // loadBoth için özel yükleme metodları
  private async loadLazyOneWithTime(startTime: number): Promise<void> {
    if (this.isComponent1Loaded) return;
    
    try {
      const { LazyOneComponent } = await import('../lazy-one/lazy-one');
      
      const endTime = performance.now();
      this.loadTime1 = Math.round(endTime - startTime);
      
      this.componentContainer.createComponent(LazyOneComponent);
      this.isComponent1Loaded = true;
      
    } catch (error) {
      console.error('LazyOneComponent yükleme hatası:', error);
    }
  }

  private async loadLazyTwoWithTime(startTime: number): Promise<void> {
    if (this.isComponent2Loaded) return;
    
    try {
      const { LazyTwoComponent } = await import('../lazy-two/lazy-two');
      
      const endTime = performance.now();
      this.loadTime2 = Math.round(endTime - startTime);
      
      this.componentContainer.createComponent(LazyTwoComponent);
      this.isComponent2Loaded = true;
      
    } catch (error) {
      console.error('LazyTwoComponent yükleme hatası:', error);
    }
  }

  clear() {
    this.componentContainer.clear();
    this.isComponent1Loaded = false;
    this.isComponent2Loaded = false;
    this.loadTime1 = null;
    this.loadTime2 = null;
    this.totalLoadTime = null;
    this.cd.detectChanges();
  }

  private updateTotalLoadTime() {
    // Sadece bireysel yüklemeler için toplam hesapla
    // Paralel yüklemede totalLoadTime zaten doğru hesaplanıyor
    if (this.loadTime1 && this.loadTime2 && !this.totalLoadTime) {
      this.totalLoadTime = this.loadTime1 + this.loadTime2;
    }
  }
}
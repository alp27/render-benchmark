import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultCdComponent } from './default-cd/default-cd';
import { OnpushCdComponent } from './onpush-cd/onpush-cd';
import { TrackByComponent } from './trackby/trackby';
import { NoTrackByComponent } from './no-trackby/no-trackby';
import { DetachTestComponent } from './detach-test/detach-test';
import { LazyTestComponent } from './lazy-test/lazy-test';
import { PurePipeTestComponent } from './pure-pipe-test/pure-pipe-test';
import { DepthTestComponent } from './depth-test/depth-test';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DefaultCdComponent,
    OnpushCdComponent,
    TrackByComponent,
    NoTrackByComponent,
    DetachTestComponent,
    LazyTestComponent,
    PurePipeTestComponent,
    DepthTestComponent
  ],
  selector: 'app-root',
  template: `
    <h2>Angular Performans Testleri</h2>

    <label>
      Test Seçin:
      <select [(ngModel)]="selectedTest">
        <option value="default">1️⃣ Change Detection (Default)</option>
        <option value="onpush">2️⃣ Change Detection (OnPush)</option>
        <option value="noTrackBy">3️⃣ Liste (TrackBy Yok)</option>
        <option value="trackBy">4️⃣ Liste (TrackBy Var)</option>
        <option value="detach">5️⃣ ChangeDetectorRef.detach()</option>
        <option value="lazy">6️⃣ Lazy Loading Test</option>
        <option value="purePipe">7️⃣ Pure Pipe Test</option>
        <option value="depthThrottling">8️⃣ 🔥 Dynamic Depth Throttling</option>
      </select>
    </label>

    <br /><br />
    
    <div *ngIf="selectedTest === 'lazy'">
      <p><strong>Lazy Loading Testi Aktif - Aşağıdaki butonlarla test edebilirsiniz</strong></p>
    </div>
    
    <div *ngIf="selectedTest === 'detach'">
      <p><strong>Detach Testi Aktif - Aşağıdaki butonlarla test edebilirsiniz</strong></p>
    </div>

    <div *ngIf="selectedTest === 'depthThrottling'">
      <p><strong>🔥 Dynamic Depth Throttling Testi Aktif - Derinliğe göre otomatik optimizasyon</strong></p>
    </div>
    
    <div *ngIf="selectedTest !== 'lazy' && selectedTest !== 'detach' && selectedTest !== 'depthThrottling'">
      <label>
        Eleman sayısı:
        <input type="number" [(ngModel)]="count" min="1" max="1000000" />
      </label>
      <button (click)="runTest()">Testi Başlat</button>
      <p *ngIf="result !== null">Render süresi: {{ result }} ms</p>
    </div>

    <div class="grid">
      <ng-container *ngIf="show && selectedTest !== 'lazy' && selectedTest !== 'detach' && selectedTest !== 'depthThrottling'">
        <!-- Test 1: Default -->
        <!-- <app-default-cd
          *ngIf="selectedTest === 'default'"
          *ngFor="let i of arr"
          [value]="i">
        </app-default-cd> -->

        <!-- Test 2: OnPush -->
        <!-- <app-onpush-cd
          *ngIf="selectedTest === 'onpush'"
          *ngFor="let i of arr"
          [value]="i">
        </app-onpush-cd> -->

        <!-- Test 3: TrackBy Yok -->
        <app-no-trackby
          *ngIf="selectedTest === 'noTrackBy'">
        </app-no-trackby>

        <!-- Test 4: TrackBy Var -->
        <app-trackby
          *ngIf="selectedTest === 'trackBy'">
        </app-trackby>
      </ng-container>
      
      <!-- Lazy Loading Testi -->
      <app-lazy-test *ngIf="selectedTest === 'lazy'"></app-lazy-test>
      
      <!-- Detach Testi -->
      <app-detach-test *ngIf="selectedTest === 'detach'"></app-detach-test>

      <!-- Pure Pipe Testi -->
      <app-pure-pipe-test *ngIf="selectedTest === 'purePipe'"></app-pure-pipe-test>

      <!-- Dynamic Depth Throttling Testi -->
      <app-depth-test *ngIf="selectedTest === 'depthThrottling'"></app-depth-test>
    </div>

    <div *ngIf="selectedTest !== 'lazy' && selectedTest !== 'detach' && selectedTest !== 'depthThrottling'" class="test-info">
      <h4>Test Bilgisi:</h4>
      <p *ngIf="selectedTest === 'default'"><strong>Default Change Detection:</strong> Angular'ın varsayılan değişiklik kontrol mekanizması</p>
      <p *ngIf="selectedTest === 'onpush'"><strong>OnPush Change Detection:</strong> Sadece @Input değerleri değiştiğinde kontrol yapar</p>
      <p *ngIf="selectedTest === 'noTrackBy'"><strong>TrackBy Olmadan Liste:</strong> Her değişiklikte tüm liste yeniden oluşturulur</p>
      <p *ngIf="selectedTest === 'trackBy'"><strong>TrackBy ile Liste:</strong> Sadece değişen elemanlar yeniden oluşturulur</p>
      <p *ngIf="selectedTest === 'purePipe'"><strong>Pure Pipe Test:</strong> Pure vs Impure pipe'ların performans karşılaştırması</p>
    </div>

    <div *ngIf="selectedTest === 'depthThrottling'" class="test-info">
      <h4>🔥 Dynamic Depth Throttling Test Bilgisi:</h4>
      <p><strong>Akıllı Render Optimizasyonu:</strong> Component ağacının derinliğine göre otomatik olarak en uygun change detection stratejisini seçer</p>
      <p><strong>Stratejiler:</strong></p>
      <ul>
        <li><strong>Default (1-2 level):</strong> Tüm ağacı kontrol eder</li>
        <li><strong>OnPush (3-5 level):</strong> Sadece değişen input'ları kontrol eder</li>
        <li><strong>Manual (6-8 level):</strong> Manuel olarak kontrol edilir</li>
        <li><strong>Frozen (9+ level):</strong> Çok derin ağaçlar için donmuş mod</li>
      </ul>
      <p><strong>Test Edilebilir:</strong> Derinlik ekleyip azaltarak farklı stratejilerin otomatik seçimini gözlemleyebilirsiniz</p>
    </div>
  `,
  styles: [`
    .grid { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 6px; 
      margin-top: 20px;
      min-height: 200px;
    }
    .box { 
      border: 1px solid #aaa; 
      padding: 4px; 
      min-width: 80px; 
      text-align: center; 
    }
    h2 { 
      margin-bottom: 10px; 
      color: #333;
      text-align: center;
    }
    select, input { 
      margin-left: 6px; 
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button { 
      margin-left: 10px;
      padding: 6px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .test-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #007bff;
    }
    .test-info h4 {
      margin-top: 0;
      color: #495057;
    }
    .test-info p {
      margin: 5px 0;
      color: #6c757d;
    }
    .test-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .test-info li {
      margin: 5px 0;
      color: #6c757d;
    }
    label {
      font-weight: 500;
      color: #495057;
    }
    p {
      margin: 8px 0;
    }
  `],
})
export class AppComponent {
  selectedTest = 'default';
  count = 1000;
  arr: number[] = [];
  show = false;
  result: number | null = null;

  runTest() {
    if (this.selectedTest === 'lazy' || this.selectedTest === 'detach' || this.selectedTest === 'depthThrottling') {
      return;
    }

    this.show = false;
    this.result = null;

    const start = performance.now();
    
    setTimeout(() => {
      this.arr = Array.from({ length: this.count }, (_, i) => i);
      this.show = true;

      setTimeout(() => {
        const end = performance.now();
        this.result = +(end - start).toFixed(2);
        console.log('Render süresi:', this.selectedTest, this.result, 'ms');
        
        if (this.result > 1000) {
          console.warn('⚠️  Performans uyarısı: Render süresi 1 saniyeden fazla!');
        } else if (this.result > 500) {
          console.info('ℹ️  Orta seviye render süresi');
        } else {
          console.log('✅ İyi performans!');
        }
      });
    });
  }

  ngOnInit() {
    console.log('🎯 Angular Performans Test Uygulaması Başlatıldı');
    console.log('📊 Mevcut Testler:');
    console.log('   1. Default Change Detection');
    console.log('   2. OnPush Change Detection'); 
    console.log('   3. TrackBy Olmadan Liste');
    console.log('   4. TrackBy İle Liste');
    console.log('   5. ChangeDetectorRef.detach()');
    console.log('   6. Lazy Loading Test');
    console.log('   7. Pure Pipe Test');
    console.log('   8. 🔥 Dynamic Depth Throttling');
    console.log('');
    console.log('🔥 Yeni Özellik: Dynamic Depth Throttling');
    console.log('   - Derinliğe göre otomatik strateji seçimi');
    console.log('   - Adaptive change detection optimizasyonu');
    console.log('   - Performans kazanç analizi');
  }
}
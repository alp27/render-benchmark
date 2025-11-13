import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatDataPipe } from '../pipes/format-data-pipe';
import { ImpureFormatPipe } from '../pipes/impure-format-pipe';
@Component({
  selector: 'app-pure-pipe-test',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    FormatDataPipe, 
    ImpureFormatPipe
  ],
  template: `
    <div class="pipe-test-container">
      <h3>🔧 Pure vs Impure Pipe Performans Testi</h3>
      
      <!-- Kontroller -->
      <div class="control-panel">
        <div class="input-group">
          <label>Değer:</label>
          <input [(ngModel)]="inputValue" placeholder="Bir değer girin" />
        </div>
        
        <div class="input-group">
          <label>Format Tipi:</label>
          <select [(ngModel)]="selectedFormat">
            <option value="default">Varsayılan</option>
            <option value="uppercase">Büyük Harf</option>
            <option value="lowercase">Küçük Harf</option>
            <option value="currency">Para Birimi</option>
            <option value="percentage">Yüzde</option>
            <option value="reverse">Ters Çevir</option>
          </select>
        </div>

        <div class="button-group">
          <button (click)="updateValue()" class="btn btn-primary">
            🔄 Değeri Güncelle
          </button>
          
          <button (click)="triggerChangeDetection()" class="btn btn-secondary">
            🎯 Change Detection Tetikle
          </button>
          
          <button (click)="addItem()" class="btn btn-success">
            ➕ Liste Öğesi Ekle
          </button>
          
          <button (click)="reset()" class="btn btn-danger">
            🗑️ Sıfırla
          </button>
        </div>
      </div>

      <!-- Performans Metrikleri -->
      <div class="metrics-panel">
        <h4>📊 Performans Karşılaştırması</h4>
        
        <div class="metrics-grid">
          <div class="metric-card pure">
            <h5>✅ Pure Pipe</h5>
            <p><strong>Çalışma Sayısı:</strong> {{ purePipeRuns }}</p>
            <p><strong>Son Çıktı:</strong> {{ inputValue | formatData:selectedFormat }}</p>
          </div>
          
          <div class="metric-card impure">
            <h5>❌ Impure Pipe</h5>
            <p><strong>Çalışma Sayısı:</strong> {{ impurePipeRuns }}</p>
            <p><strong>Son Çıktı:</strong> {{ inputValue | impureFormat:selectedFormat }}</p>
          </div>
        </div>

        <div class="performance-info">
          <p><strong>🎯 Performans Farkı:</strong></p>
          <p>Pure Pipe: <strong>{{ purePipeRuns }}</strong> kez çalıştı</p>
          <p>Impure Pipe: <strong>{{ impurePipeRuns }}</strong> kez çalıştı</p>
          <p *ngIf="purePipeRuns > 0 && impurePipeRuns > 0" class="difference">
            Impure Pipe, Pure Pipe'dan <strong>{{ getPerformanceDifference() }}x daha fazla</strong> çalıştı!
          </p>
        </div>
      </div>

      <!-- Liste Testi -->
      <div class="list-test">
        <h4>📝 Liste Render Performans Testi</h4>
        
        <div class="list-controls">
          <button (click)="shuffleList()" class="btn btn-warning">
            🔀 Listeyi Karıştır
          </button>
          <span>Öğe Sayısı: {{ items.length }}</span>
        </div>

        <div class="lists-container">
          <div class="list-section">
            <h5>✅ Pure Pipe ile Liste</h5>
            <div class="item" *ngFor="let item of items; trackBy: trackByFn">
              {{ item }} | {{ item | formatData:selectedFormat }}
            </div>
          </div>
          
          <div class="list-section">
            <h5>❌ Impure Pipe ile Liste</h5>
            <div class="item" *ngFor="let item of items; trackBy: trackByFn">
              {{ item }} | {{ item | impureFormat:selectedFormat }}
            </div>
          </div>
        </div>
      </div>

      <!-- Açıklamalar -->
      <div class="explanations">
        <h4>💡 Nasıl Çalışır?</h4>
        
        <div class="explanation-grid">
          <div class="explanation-card">
            <h6>✅ Pure Pipe</h6>
            <ul>
              <li>Sadece input değerleri değişirse çalışır</li>
              <li>Değişiklik kontrolü için referans değişikliği gerekir</li>
              <li>Yüksek performans</li>
              <li>Önerilen yaklaşım</li>
            </ul>
          </div>
          
          <div class="explanation-card">
            <h6>❌ Impure Pipe</h6>
            <ul>
              <li>Her change detection döngüsünde çalışır</li>
              <li>Referans değişmese bile tetiklenir</li>
              <li>Düşük performans</li>
              <li>Sadece özel durumlarda kullanılmalı</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Styles aynı kalabilir */
    .pipe-test-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h3 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
    }

    .control-panel {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .input-group {
      margin-bottom: 15px;
    }

    .input-group label {
      display: inline-block;
      width: 120px;
      font-weight: 600;
    }

    .input-group input, .input-group select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary { background: #007bff; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-success { background: #28a745; color: white; }
    .btn-warning { background: #ffc107; color: #212529; }
    .btn-danger { background: #dc3545; color: white; }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .metrics-panel {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 2px solid #e9ecef;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .metric-card {
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid;
    }

    .metric-card.pure {
      border-left-color: #28a745;
      background: #f8fff9;
    }

    .metric-card.impure {
      border-left-color: #dc3545;
      background: #fff8f8;
    }

    .performance-info {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
    }

    .difference {
      color: #dc3545;
      font-weight: bold;
    }

    .list-test {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 2px solid #e9ecef;
    }

    .list-controls {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 15px;
    }

    .lists-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      max-height: 400px;
      overflow-y: auto;
    }

    .list-section {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 15px;
    }

    .list-section h5 {
      margin-top: 0;
      text-align: center;
    }

    .item {
      padding: 8px;
      margin: 4px 0;
      background: #f8f9fa;
      border-radius: 4px;
      border-left: 3px solid #007bff;
    }

    .explanations {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
    }

    .explanation-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .explanation-card {
      padding: 15px;
      border-radius: 8px;
      background: white;
    }

    .explanation-card h6 {
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 2px solid;
    }

    .explanation-card:first-child h6 {
      border-bottom-color: #28a745;
    }

    .explanation-card:last-child h6 {
      border-bottom-color: #dc3545;
    }

    .explanation-card ul {
      padding-left: 20px;
    }

    .explanation-card li {
      margin-bottom: 8px;
    }

    @media (max-width: 768px) {
      .metrics-grid,
      .lists-container,
      .explanation-grid {
        grid-template-columns: 1fr;
      }
      
      .button-group {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }
    }
  `]
})
export class PurePipeTestComponent implements OnDestroy {
  inputValue = 'Test Değeri';
  selectedFormat = 'default';
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  
  purePipeRuns = 0;
  impurePipeRuns = 0;

  private originalConsoleLog: any;

  constructor(private cd: ChangeDetectorRef) {
    this.setupPipeMonitoring();
  }

  ngOnDestroy() {
    // Console'u eski haline getir
    if (this.originalConsoleLog) {
      console.log = this.originalConsoleLog;
    }
  }

  updateValue() {
    this.inputValue = `Değer ${Math.floor(Math.random() * 1000)}`;
    console.log('🔄 Değer güncellendi:', this.inputValue);
  }

  triggerChangeDetection() {
    console.log('🎯 Change Detection manuel tetiklendi');
    this.cd.detectChanges();
  }

  addItem() {
    const newItem = `Item ${this.items.length + 1}`;
    this.items.push(newItem);
    console.log('➕ Yeni öğe eklendi:', newItem);
  }

  shuffleList() {
    this.items = [...this.items.sort(() => Math.random() - 0.5)];
    console.log('🔀 Liste karıştırıldı');
  }

  reset() {
    this.inputValue = 'Test Değeri';
    this.selectedFormat = 'default';
    this.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    this.purePipeRuns = 0;
    this.impurePipeRuns = 0;
    console.log('🗑️ Test sıfırlandı');
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  private setupPipeMonitoring() {
    this.originalConsoleLog = console.log;
    
    console.log = (...args) => {
      // Sadece pipe loglarını yakala, diğer logları normal devam ettir
      const firstArg = args[0];
      
      if (typeof firstArg === 'string') {
        if (firstArg.includes('FormatDataPipe çalıştı')) {
          this.purePipeRuns++;
          // ⚠️ detectChanges() çağırma - sonsuz döngü yaratır!
        } else if (firstArg.includes('ImpureFormatPipe çalıştı')) {
          this.impurePipeRuns++;
          // ⚠️ detectChanges() çağırma - sonsuz döngü yaratır!
        }
      }
      
      // Orijinal console.log'u çağır
      this.originalConsoleLog.apply(console, args);
    };
  }

  getPerformanceDifference(): number {
    if (this.purePipeRuns === 0) return 0;
    return Math.round((this.impurePipeRuns / this.purePipeRuns) * 100) / 100;
  }
}
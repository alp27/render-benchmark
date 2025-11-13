import { Component } from '@angular/core';
import { DepthThrottleService } from '../services/depth-throttle';
import { RenderStrategy, TestResult, DepthNode } from '../models';
import { DepthThrottleDirective } from '../directives/depth-throttle';

@Component({
  standalone: true,
  imports: [DepthThrottleDirective], // ✅ Artık NgIf ve NgFor gerek yok
  selector: 'app-depth-test',
  template: `
    <div class="container">
      <h1>🔄 Dynamic Depth Throttling</h1>
      
      <div class="depth-controls">
        <button (click)="decreaseDepth()" [disabled]="currentDepth <= 1">[-] Derinlik Azalt</button>
        <span class="depth-display">Mevcut Derinlik: {{currentDepth}}</span>
        <button (click)="increaseDepth()" [disabled]="currentDepth >= 10">[+] Derinlik Ekle</button>
      </div>

      <button class="test-btn" (click)="runTest()">🎯 TEST ET</button>

      @if (testResult) {
        <div class="results">
          <h3>--- SONUÇLAR ---</h3>
          <div class="result-item">
            <span>🤖 Akıllı Strateji:</span>
            <strong [class]="getStrategyClass(testResult.strategy)">{{testResult.strategy}}</strong>
            <span>(Derinlik {{testResult.depth}} için optimize)</span>
          </div>
          <div class="result-item">
            <span>⏱️ Render Süresi:</span>
            <strong>{{testResult.renderTime}}ms</strong>
          </div>
          <div class="result-item">
            <span>📊 Performans Kazanımı:</span>
            <strong [class]="testResult.performanceGain >= 0 ? 'positive' : 'negative'">
              %{{testResult.performanceGain}}
            </strong>
          </div>
        </div>
      }

      <div class="manual-controls">
        <h3>--- MANUEL KONTROL ---</h3>
        <div class="strategy-buttons">
          @for (strategy of strategies; track strategy) {
            <button 
  [appDepthThrottle]="strategy"  
  (click)="testManualStrategy(strategy)"
  class="strategy-btn">
  {{strategy}} Strateji
</button>
          }
        </div>
      </div>

      <div class="tree-preview">
        <h3>🌳 Ağaç Önizleme ({{treeStructure}})</h3>
        <div class="tree-visual">
          @for (level of getTreeLevels(); track level) {
            <span class="tree-level">Level {{level}}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 20px auto; padding: 20px; font-family: Arial; }
    .depth-controls { display: flex; justify-content: center; align-items: center; gap: 15px; margin: 20px 0; }
    .depth-display { font-weight: bold; font-size: 18px; }
    button { padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .test-btn { background: #007bff; color: white; font-size: 16px; padding: 12px 24px; }
    
    .results { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .result-item { display: flex; align-items: center; gap: 10px; margin: 10px 0; }
    
    .strategy-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .strategy-btn { background: #6c757d; color: white; }
    
    .tree-preview { margin-top: 20px; }
    .tree-visual { display: flex; gap: 5px; margin-top: 10px; }
    .tree-level { background: #e9ecef; padding: 5px 10px; border-radius: 3px; font-size: 12px; }
    
    .strategy-default { color: #dc3545; }
    .strategy-onpush { color: #fd7e14; }
    .strategy-manual { color: #28a745; }
    .strategy-frozen { color: #007bff; }
    
    .positive { color: #28a745; }
    .negative { color: #dc3545; }
  `]
})
export class DepthTestComponent {
  currentDepth: number = 3;
  testResult: TestResult | null = null;
  strategies = Object.values(RenderStrategy);
  treeStructure: string = '';

  constructor(private depthService: DepthThrottleService) {
    this.updateTreeStructure();
  }

  increaseDepth() {
    if (this.currentDepth < 10) {
      this.currentDepth++;
      this.updateTreeStructure();
    }
  }

  decreaseDepth() {
    if (this.currentDepth > 1) {
      this.currentDepth--;
      this.updateTreeStructure();
    }
  }

  runTest() {
    this.testResult = this.depthService.runTest(this.currentDepth);
  }

  testManualStrategy(strategy: RenderStrategy) {
    const defaultTime = this.depthService.simulateRender(RenderStrategy.DEFAULT, this.currentDepth);
    const manualTime = this.depthService.simulateRender(strategy, this.currentDepth);
    const performanceGain = this.depthService.calculatePerformanceGain(manualTime, defaultTime);

    this.testResult = {
      strategy: strategy,
      renderTime: manualTime,
      performanceGain: performanceGain,
      depth: this.currentDepth
    };
  }

  getStrategyClass(strategy: RenderStrategy): string {
    return `strategy-${strategy.toLowerCase().replace(' ', '')}`;
  }

  getTreeLevels(): number[] {
    return Array.from({length: this.currentDepth}, (_, i) => i + 1);
  }

  private updateTreeStructure() {
    const tree = this.depthService.createDepthTree(this.currentDepth);
    this.treeStructure = `${this.countNodes(tree)} node, ${this.currentDepth} level`;
  }

  private countNodes(node: DepthNode): number {
    let count = 1;
    node.children.forEach(child => count += this.countNodes(child));
    return count;
  }
}
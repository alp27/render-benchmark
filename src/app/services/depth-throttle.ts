// depth-throttle.service.ts
import { Injectable } from '@angular/core';
import { RenderStrategy, TestResult, DepthNode } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DepthThrottleService {
  
  getOptimalStrategy(depth: number): RenderStrategy {
    if (depth <= 2) return RenderStrategy.DEFAULT;
    if (depth <= 5) return RenderStrategy.ON_PUSH;
    if (depth <= 8) return RenderStrategy.MANUAL;
    return RenderStrategy.FROZEN;
  }

  simulateRender(strategy: RenderStrategy, depth: number): number {
    // Render süresini stratejiye göre simüle et
    const baseTime = depth * 15; // Derinlik arttıkça temel süre artar
    
    switch(strategy) {
      case RenderStrategy.DEFAULT:
        return baseTime;
      case RenderStrategy.ON_PUSH:
        return baseTime * 0.6;
      case RenderStrategy.MANUAL:
        return baseTime * 0.3;
      case RenderStrategy.FROZEN:
        return baseTime * 0.1;
      default:
        return baseTime;
    }
  }

  calculatePerformanceGain(currentTime: number, defaultTime: number): number {
    return Math.round(((defaultTime - currentTime) / defaultTime) * 100);
  }

  runTest(currentDepth: number): TestResult {
    const optimalStrategy = this.getOptimalStrategy(currentDepth);
    const defaultTime = this.simulateRender(RenderStrategy.DEFAULT, currentDepth);
    const optimalTime = this.simulateRender(optimalStrategy, currentDepth);
    const performanceGain = this.calculatePerformanceGain(optimalTime, defaultTime);

    return {
      strategy: optimalStrategy,
      renderTime: optimalTime,
      performanceGain: performanceGain,
      depth: currentDepth
    };
  }

  createDepthTree(depth: number): DepthNode {
    const root = new DepthNode(1, 'Root');
    this.addChildren(root, depth - 1);
    return root;
  }

  private addChildren(node: DepthNode, remainingDepth: number): void {
    if (remainingDepth <= 0) return;
    
    for (let i = 1; i <= 2; i++) { // Her node 2 çocuk yapar
      const child = new DepthNode(node.level + 1, `Level ${node.level + 1}-${i}`);
      node.children.push(child);
      this.addChildren(child, remainingDepth - 1);
    }
  }
}
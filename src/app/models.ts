// models.ts
export enum RenderStrategy {
  DEFAULT = 'Default',
  ON_PUSH = 'OnPush', 
  MANUAL = 'Manual',
  FROZEN = 'Frozen'
}

export interface TestResult {
  strategy: RenderStrategy;
  renderTime: number;
  performanceGain: number;
  depth: number;
}

export class DepthNode {
  constructor(
    public level: number,
    public name: string,
    public children: DepthNode[] = []
  ) {}
}
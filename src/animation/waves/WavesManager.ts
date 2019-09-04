import bowser from 'bowser';
import Disposable from 'seng-disposable';
import { DisposableEventListener } from 'seng-disposable-event-listener';
import CanvasWaveLine from './CanvasWaveLine';
import IWaveShapeConfig from './IWaveShapeConfig';

export default class WavesManager extends Disposable {
  protected static TOTAL_SAMPLES: number = 150;

  protected canvasElement!: HTMLCanvasElement;
  protected context!: CanvasRenderingContext2D;

  protected lines: CanvasWaveLine[] = [];

  protected time: number = 0;

  protected parentElement: HTMLElement;

  protected resizeListener: DisposableEventListener | null = null;

  protected shapes: Array<IWaveShapeConfig> = [];

  protected lastWidth: number = 0;

  private isRunning: boolean = false;

  constructor(parent: HTMLElement, hasManualResize: boolean = false) {
    super();

    this.parentElement = parent;
    this.createCanvas();

    if (!hasManualResize) {
      this.resizeListener = new DisposableEventListener(
        window,
        'resize',
        this.updateSize.bind(this),
      );
    }
  }

  public init(shapes: Array<IWaveShapeConfig>): void {
    this.shapes = shapes;

    shapes.forEach((shape, index) => {
      const start = index * 2;
      this.lines[start] = new CanvasWaveLine({
        yOffset: 75,
        yDerivative: 0,
        frequency: -0.5,
        amplifier: 75,
        spatialFrequency: 1250,
      });
      this.lines[start + 1] = new CanvasWaveLine({
        yOffset: 475,
        yDerivative: 0,
        frequency: -0.5,
        amplifier: 75,
        spatialFrequency: 1250,
      });
    });

    this.update();
  }

  public start(): void {
    this.isRunning = true;
    this.update();
  }

  public stop(): void {
    this.isRunning = false;
  }

  public update(): void {
    const { width, height } = this.canvasElement;
    this.context.clearRect(0, 0, width, height);

    this.time = Date.now() / 1000;

    for (let i = 0; i < this.lines.length; i += 2) {
      this.drawWave(this.context, '#fff', [this.lines[i], this.lines[i + 1]], this.time);
    }

    if (!this.isRunning) return;

    window.requestAnimationFrame(() => this.update());
  }

  protected createCanvas(): void {
    this.canvasElement = document.createElement('canvas');
    this.context = <CanvasRenderingContext2D>this.canvasElement.getContext('2d');

    this.updateSize();

    this.parentElement.appendChild(this.canvasElement);
  }

  protected updateSize(): void {
    const { offsetWidth, offsetHeight } = this.parentElement;

    if (offsetWidth !== this.lastWidth || !bowser.mobile) {
      this.canvasElement.width = offsetWidth;
      this.canvasElement.height = offsetHeight;

      this.lastWidth = offsetWidth;
    }
  }

  protected drawWave(
    context: CanvasRenderingContext2D,
    fillStyle: string | CanvasGradient | CanvasPattern,
    lines: Array<CanvasWaveLine>,
    time: number,
  ): void {
    const { width } = this.canvasElement;

    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(0, lines[0].sample(0, time));
    // tslint:disable-next-line:no-increment-decrement
    for (let s = 0; s <= WavesManager.TOTAL_SAMPLES; s++) {
      const x = (s * width) / WavesManager.TOTAL_SAMPLES;
      context.lineTo(x, lines[0].sample(x, time));
    }

    // tslint:disable-next-line: no-increment-decrement
    for (let s = WavesManager.TOTAL_SAMPLES; s >= 0; s--) {
      const x = (s * width) / WavesManager.TOTAL_SAMPLES;
      context.lineTo(x, lines[1].sample(x, time));
    }

    context.fill();
  }

  public dispose(): void {
    this.isRunning = false;

    if (this.resizeListener) {
      this.resizeListener.dispose();
    }

    super.dispose();
  }
}

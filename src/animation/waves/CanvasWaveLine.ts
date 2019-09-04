import Disposable from 'seng-disposable';
import IWaveShapeOptions from './IWaveShapeOptions';

export default class CanvasWaveLine extends Disposable {
  private waveOptions!: IWaveShapeOptions;
  private freqOffset: number = 0;
  private lastUpdate: number = 0;

  private defaultOptions: IWaveShapeOptions = {
    yOffset: 100,
    yDerivative: 0,
    spatialFrequency: 500,
    amplifier: 20,
    frequency: 0.5,
  };

  constructor(options: Partial<IWaveShapeOptions>) {
    super();
    this.setOptions(options);
  }

  public setOptions(options: Partial<IWaveShapeOptions>): void {
    this.waveOptions = Object.assign({}, this.defaultOptions, options);
  }

  public get options(): IWaveShapeOptions {
    return this.waveOptions;
  }

  public sample(x: number, t: number): number {
    if (t !== this.lastUpdate) {
      const dt = t - this.lastUpdate;
      this.lastUpdate = t;
      this.freqOffset += this.waveOptions.frequency * dt;
    }

    let y = this.waveOptions.yOffset;
    y += this.waveOptions.yDerivative * x;
    y +=
      this.waveOptions.amplifier *
      Math.sin((x / this.waveOptions.spatialFrequency) * Math.PI * 2 + this.freqOffset);
    return y;
  }
}

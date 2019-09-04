import IWaveShapeOptions from './IWaveShapeOptions';

export default interface IWaveShape {
  top: Partial<IWaveShapeOptions>;
  bottom: Partial<IWaveShapeOptions>;
  background: string;
}

import { Injectable } from '@angular/core';

export interface IConfig {
  speed: number;
  worldSize: number;
  startPoint: [number, number];
  keys: {
    arrowUp: number;
    arrowDown: number;
    arrowLeft: number;
    arrowRight: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  init(): IConfig {
    const config: IConfig = {
      speed: 6,
      worldSize: 10,
      startPoint: [5, 5],
      keys: {
        arrowUp: 38,
        arrowDown: 40,
        arrowLeft: 37,
        arrowRight: 39
      }
    };
    console.log('init config', config);
    return config;
  }

}

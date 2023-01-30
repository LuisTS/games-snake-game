import { Injectable } from '@angular/core';
import { IConfig } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor() { }

  init(config: IConfig) {
    Array.from({ length: config.worldSize }, (_, idx) => ++idx).map(_ => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.classList.add('h-10');

      Array.from({ length: config.worldSize }, (_, idx) => ++idx).map(_ => {
        const input = document.createElement('input');
        input.classList.add('w-10');
        input.classList.add('h-10');
        input.type = 'checkbox';
        row.appendChild(input);
      });
      this.getWorld()?.appendChild(row);
    });
    console.log('init world', this.getWorld());
  }

  getWorld(): Element {
    return document?.querySelector('.world')!;
  }

  getRows(): NodeListOf<Element> {
    return document?.querySelectorAll('.row')!;
  }

  availableRows(available: boolean) {
    this.getRows().forEach((row: Element) =>
      Array.from(row.children).forEach((input: any) =>
        input.disabled = !available)
      );
  }

  getScore(): any {
    return document?.querySelector('.score')!;
  }

}

import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { IConfig } from './config.service';
import { WorldService } from './world.service';

export type TDirection = 'up' | 'down' | 'left' | 'right';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  snake: [number, number][] = [[5, 5]];

  private currentScore: number = 0;
  private movingDirection!: TDirection;
  private moveInterval!: any;

  constructor(
    private worldSrv: WorldService
  ) { }

  getItemAt(x: number, y: number): any {
    const rows: NodeListOf<Element> = this.worldSrv.getRows();
    return rows[y -1].children[x - 1];
  }

  checkItemAt(x: number, y: number, checked: boolean) {
    this.getItemAt(x, y).checked = checked;
  }

  placeAppleAt(x: number, y: number) {
    this.getItemAt(x, y).type = 'radio';
    this.checkItemAt(x, y, true);
  }

  removeAppleAt(x: number, y: number) {
    this.getItemAt(x, y).type = 'checkbox';
    this.checkItemAt(x, y, false);
  }

  getApplePosition() {
    const position: [number, number] = [1, 1];
    const rows: NodeListOf<Element> = this.worldSrv.getRows();
    rows.forEach((row: Element, rowIndex: number) => {
      Array.from(row.children).forEach((input: any, inputIndex: number) => {
        if (input.type === 'radio') {
          position[0] = inputIndex + 1;
          position[1] = rowIndex + 1;
        }
      });
    })
    return position;
  }

  getRandomPosition() {
    const availablePositions: [number, number][] = [];
    const rows: NodeListOf<Element> = this.worldSrv.getRows();
    rows.forEach((row: Element, rowIndex: number) => {
      Array.from(row.children).forEach((input: any, inputIndex: number) => {
        if (input.type === 'checkbox' && input.checked === false) {
          availablePositions.push([inputIndex + 1, rowIndex + 1]);
        }
      });
    });
    const index = Math.floor(Math.random() * (availablePositions.length) - 1) + 1;
    return availablePositions[index];
  }

  increaseScore() {
    const score: any = this.worldSrv.getScore();
    this.currentScore = parseInt(score.innerText, 10);
    score.innerText = this.currentScore + 1;
  }

  handleInput(config: IConfig) {
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
      switch (ev?.keyCode) {
        case config?.keys.arrowUp: this.movingDirection = this.movingDirection === 'down' ? 'down' : 'up'; break;
        case config?.keys.arrowDown: this.movingDirection = this.movingDirection === 'up' ? 'up' : 'down'; break;
        case config?.keys.arrowLeft: this.movingDirection = this.movingDirection === 'right' ? 'right' : 'left'; break;
        case config?.keys.arrowRight: this.movingDirection = this.movingDirection === 'left' ? 'left' : 'right'; break;
      }

      if (this.moveInterval === undefined) {
        this.moveInterval = setInterval(() => {
          this.move(this.movingDirection || 'left', config?.worldSize);
        }, 1000 / config?.speed);
      }
    });
  }

  move(movingDirection: TDirection, worldSize: number) {
    console.log('move to ', movingDirection);
    const apple: [number, number] = this.getApplePosition();
    const snakeHead: [number, number] = [...this.snake[0]];
    const snakeTail: [number, number] = [...this.snake[this.snake.length - 1]];

    switch (movingDirection) {
      case 'up': snakeHead[1] = snakeHead[1] === 1 ? worldSize : snakeHead[1] - 1; break;
      case 'down': snakeHead[1] = snakeHead[1] === worldSize ? 1 : snakeHead[1] + 1; break;
      case 'left': snakeHead[0] = snakeHead[0] === 1 ? worldSize : snakeHead[0] - 1; break;
      case 'right': snakeHead[0] = snakeHead[0] === worldSize ? 1 : snakeHead[0] + 1; break;
    }

    // check collision
    if (this.bitingSnake(snakeHead)) {
      this.worldSrv.getScore().innerText = 'Game Over...';
      this.worldSrv.availableRows(false);
      this.stop();
    }

    if (this.bitingApple(snakeHead, apple)) {
      this.snake.push(snakeTail); // add new tail
      this.placeAppleAt(...this.getRandomPosition());
      this.removeAppleAt(...apple);
      this.increaseScore();
      this.updateSnake(snakeHead);
    } else {
      this.updateSnake(snakeHead);
      this.checkItemAt(...snakeTail, false);
    }
  }

  bitingSnake(snakeHead: [number, number]): boolean {
    return this.getItemAt(...snakeHead).type === 'checkbox' && this.getItemAt(...snakeHead).checked;
  }

  bitingApple(snakeHead: [number, number], apple: [number, number]): boolean {
    return snakeHead[0] === apple[0] && snakeHead[1] === apple[1];
  }

  stop() {
    clearInterval(this.moveInterval);
  }

  updateSnake(head: [number, number]) {
    this.snake.unshift(head); // add new head
    this.snake.pop(); // remove old tail
    this.snake.forEach((snakePart: [number, number]) => {
      this.checkItemAt(...snakePart, true); // check snake inputs
    });
  }

}

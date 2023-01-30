import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConfigService, IConfig } from './services/config.service';
import { SnakeService } from './services/snake.service';
import { WorldService } from './services/world.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'snake game 🐍';
  config!: IConfig;

  constructor(
    private configSrv: ConfigService,
    private worldSrv: WorldService,
    private snakeSrv: SnakeService
  ) { }

  ngOnInit() {
    this.config = this.configSrv.init();
  }

  ngAfterViewInit() {
    this.worldSrv.init(this.config);
    this.snakeSrv.handleInput(this.config);
    this.snakeSrv.placeAppleAt(...this.snakeSrv.getRandomPosition());
  }

}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, delay, delayWhen, from, of, switchMap } from 'rxjs';
import { OperatorsService, Photo } from '../../services/operators.service';

@Component({
  selector: 'app-rxjs-operators-one',
  templateUrl: './rxjs-operators-one.component.html',
  styleUrls: ['./rxjs-operators-one.component.scss']
})
export class RxjsOperatorsOneComponent implements OnInit {

  paused$ = new BehaviorSubject(false);
  currentPhotos$ = new BehaviorSubject<Photo[]>([{
    id: this.getRandom(),
    url: 'https://'
  }]);

  constructor(private operatorsSrv: OperatorsService) { }

  ngOnInit(): void {

    const currentPhoto$ = this.currentPhotos$.pipe(
      // Emit one photo at a time
      switchMap((photos: Photo[]) => from(photos)), // Change current stream to new from(...) stream whose origin comes from concatMap
      concatMap((photo: Photo) =>
        // of({ ...photo, id: photo.id + ' changed' }) // Without delay
        // Create a new stream for each individual photo with delay
        of(photo).pipe(
          // Creating a stream for each individual photo
          // will allow us to delay the start of the stream
          delayWhen(() =>
            this.paused$.pipe(
              switchMap((isPaused: boolean) =>
                isPaused ? of('').pipe(delay(3000)) : of('').pipe(delay(1000)))
            )
          )
        )
      )
    );

    currentPhoto$.subscribe((r: Photo) => {
      console.log("🚀 ~ file: rxjs-operators-one.component.ts:38 ~ r", r);
    });

  }

  add() {
    const photo: Photo = {
      id: this.getRandom(),
      url: 'https://'
    };
    console.log("🤖 ~ file: rxjs-operators-one.component.ts:52 ~ add ~ photo", photo)

    this.currentPhotos$.next([
      ...this.currentPhotos$.getValue(),
      photo
    ])
  }

  pause() {
    console.log("🐎 ~ file: rxjs-operators-one.component.ts:63 ~ pause", this.paused$.getValue());
    this.paused$.next(!this.paused$.getValue());
  }

  private getRandom(): string {
    return Math.floor(Math.random() * 1000).toString()
  }

}

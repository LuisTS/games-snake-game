import { Injectable } from '@angular/core';
import { from } from 'rxjs';

export interface Photo {
  id: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor() { }

  currentPhotos$ = from<Photo[]>([
    {
      id: '1',
      url: 'https://'
    },
    {
      id: '2',
      url: 'https://'
    }
  ]);

}

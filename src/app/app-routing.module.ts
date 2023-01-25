import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsOperatorsOneComponent } from './pages/rxjs-operators-one/rxjs-operators-one.component';

const routes: Routes = [
  {
    path: 'rxjs-operators-one',
    component: RxjsOperatorsOneComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

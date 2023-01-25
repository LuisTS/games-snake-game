import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsOperatorsOneComponent } from './pages/rxjs-operators-one/rxjs-operators-one.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsOperatorsOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {HomeModule} from "./home/home.module";
import { HomeComponent } from './home/home.component';
import { userReducer } from "./store/user/user.reducer";
import { UserEffects } from './store/user/user.effects';
import { HttpClientModule } from '@angular/common/http'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    HttpClientModule,
    HomeModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 })
    // HomeComponent
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

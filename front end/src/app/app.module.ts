import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { SpecComponent } from './spec/spec.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginServiceController } from './service/login.service';
import { GlobalMessageService } from './service/global-msg';
import { OnlineComponent } from './online/online.component';
import { PubNubWebsocket } from './service/websocket/websocket';
import { PubNubAngular } from 'pubnub-angular2';
import { WebsocketEventGetter } from './service/websocket-event-getter';
import { AuthGuard } from './auth/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SpecComponent,
    HomeComponent,
    LoginComponent,
    OnlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthGuard,
    LoginServiceController,
    WebsocketEventGetter,
    GlobalMessageService,
    PubNubWebsocket,
    PubNubAngular
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

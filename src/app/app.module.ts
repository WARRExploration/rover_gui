import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSliderModule, MatToolbarModule, MatGridListModule} from '@angular/material';

import 'hammerjs';

import {ChartsModule} from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import { SteeringComponent } from './steering/steering.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CompositeViewComponent } from './composite-view/composite-view.component';
import { ConnectionComponent } from './connection/connection.component';

@NgModule({
  declarations: [
    AppComponent,
    TelemetryComponent,
    VideoFeedComponent,
    SteeringComponent,
    NavComponent,
    CompositeViewComponent,
    ConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    MatToolbarModule,
    ChartsModule,
    MatGridListModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

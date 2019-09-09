import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import { SteeringComponent } from './steering/steering.component';
import { MapComponent } from './map/map.component';
import { FallbackComponent } from './fallback/fallback.component';

const routes: Routes = [
  {path: 'steering', component: SteeringComponent},
  {path: 'video-feed', component: VideoFeedComponent},
  {path: 'telemetry', component: TelemetryComponent},
  {path: 'map', component: MapComponent},
  {path: 'fallback', component: FallbackComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

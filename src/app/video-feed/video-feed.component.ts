import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css']
})
export class VideoFeedComponent implements OnInit {

  streamUrl : string;

  constructor(private cs: ConnectionService) { 
    this.streamUrl = "https://media.tenor.com/images/53daa23a726fe6fc52934216b151d5ba/tenor.gif";
  }

  ngOnInit() {
    this.cs.currentConnectionStatus.subscribe(connected => {
      if (connected) {
        this.streamUrl = "http://"+this.cs.ip+":8080/stream?topic=/sensors/camera1/image_raw&quality=50&height=600&width=800";
      }
    })
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectionService } from '../connection.service';
import * as ROSLIB from 'roslib';


var goalTopic;
var seq;

var goal = new ROSLIB.Message({
  header: {
    seq: seq++,
    stamp: {
      secs: 0,
      nsecs: 0
    },
    frame_id: "base_link"
  },
  pose: {
    position: {
      x: 0.0,
      y: 0.0,
      z: 0.0
    },
    orientation: {
      x: 0.0,
      y: 0.0,
      z: 0.0,
      w: 0.0
    }
  }
});

function updateMsg(xgoal, ygoal) {
  goal = new ROSLIB.Message({
    header: {
      seq: seq++,
      stamp: {
        secs: 0,
        nsecs: 0
      },
      frame_id: "base_link"
    },
    pose: {
      position: {
        x: xgoal,
        y: ygoal,
        z: 0.0
      },
      orientation: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        w: 0.0
      }
    }
  });
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {

  @ViewChild('top', { static: true }) canvasTop: ElementRef<HTMLCanvasElement>;
  @ViewChild('map', { static: true }) canvasMap: ElementRef<HTMLCanvasElement>;
  top;
  map;
  ctxTop;
  ctxMap;



  constructor(private connection: ConnectionService) {
    goalTopic = new ROSLIB.Topic({
      ros: this.connection.roverOS,
      name: '/move_base_simple/goal',
      messageType: 'geometry_msgs/PoseStamped.msg'
    });
    seq = 0;

  }

  setPos(click: MouseEvent) {

    console.log(click.offsetX);
    console.log(click.offsetY);
    this.ctxTop.clearRect(0, 0, this.top.width, this.top.height);
    this.ctxTop.beginPath();
    this.ctxTop.arc(click.offsetX, click.offsetY, 13, 0, 2 * Math.PI);
    this.ctxTop.fill();
    this.ctxTop.fillStyle = 'limegreen';
    this.ctxTop.beginPath();
    this.ctxTop.arc(click.offsetX, click.offsetY, 10, 0, 2 * Math.PI);
    this.ctxTop.fill();
    this.ctxTop.fillStyle = 'navy';
    updateMsg((click.offsetX/9.811), (click.offsetY/9.811));
    goalTopic.publish(goal);
    console.log(goal);
  }

  ngOnInit() {
    this.top = this.canvasTop.nativeElement;
    this.map = this.canvasMap.nativeElement;
    this.ctxTop = this.top.getContext('2d');
    this.ctxTop.fillStyle = 'navy';
    this.ctxMap = this.map.getContext('2d');
    this.ctxMap.fillStyle = 'limegreen';
  }

}

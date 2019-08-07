import { Component, OnInit, Output } from '@angular/core';
import { ConnectionService } from '../connection.service';
import * as ROSLIB from 'roslib';

//Initialize message, Has to be gloabl for send loop
var twist = new ROSLIB.Message({
  linear: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  angular: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
});

//Placeholder topic, depends on connection service (has to be global for send loop)
var cmdVel;

@Component({
  selector: 'app-steering',
  templateUrl: './steering.component.html',
  styleUrls: ['./steering.component.css']
})



export class SteeringComponent implements OnInit {

  forwardValue: number;
  rotationalValue: number;
  isPublishing: boolean;
  sendButtonText: string;

  //Declare looping function (needed for send button)
  publishLoop;

  constructor(private connection: ConnectionService) {
    //Initialize attr
    this.forwardValue = 0.0;
    this.rotationalValue = 0.0;
    this.isPublishing = false;
    this.sendButtonText = "Start sending";
    //Initialize correct topic
    cmdVel = new ROSLIB.Topic({
      ros: this.connection.roverOS,
      name: '/rover_diff_drive_controller/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

  }

  updateMsg() {
    twist = new ROSLIB.Message({
      linear: {
        x: this.forwardValue,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: this.rotationalValue
      }
    });
  }



  
  //Loop of send button
  toggleSend() {
    if (this.isPublishing) {
      clearInterval(this.publishLoop);
      this.sendButtonText = "Start sending";
    } else {
      this.publishLoop = setInterval(this.publishMsg, 1000);
      this.sendButtonText = "Stop sending";
    }
    this.isPublishing = !this.isPublishing;
  }

    //Inner function, never used directly
    publishMsg() {
      cmdVel.publish(twist);
    }

  //Reset Button-Handlers
  resetForw() {
    this.forwardValue = 0.0;
    this.updateMsg();
  }

  resetRot() {
    this.rotationalValue = 0.0;
    this.updateMsg();
  }

  reset() {
    this.forwardValue = 0.0;
    this.rotationalValue = 0.0;
    this.updateMsg();
  }

  ngOnInit() {
  }



}

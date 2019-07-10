import { Component, OnInit, Output } from '@angular/core';
import { ConnectionService } from '../connection.service';
import * as ROSLIB from 'roslib';

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

//Placeholder topic, depends on connection service
var cmdVel; 

@Component({
  selector: 'app-steering',
  templateUrl: './steering.component.html',
  styleUrls: ['./steering.component.css']
})



export class SteeringComponent implements OnInit {

  constructor(private connection: ConnectionService) {
    //Initialize correct topic
    cmdVel = new ROSLIB.Topic({
      ros: this.connection.ros,
      name: '/rover_diff_drive_controller/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

   }




  forwardValue = 0.0;
  rotationalValue = 1.0;
  isPublishing = false;
  sendButton = "Start sending";

  updateMsg(value) {
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

  publishMsg() {
    cmdVel.publish(twist);
  }

  //Initialize looping Function
  publishLoop;

  toggleSend() {
    if (this.isPublishing) {
      clearInterval(this.publishLoop);
      this.sendButton = "Start sending";
    } else {
      this.publishLoop = setInterval(this.publishMsg, 1000);
      this.sendButton = "Stop sending";
    }
    this.isPublishing = !this.isPublishing;
  }

  ngOnInit() {
  }



}

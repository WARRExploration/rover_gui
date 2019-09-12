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

function updateMsg(forw, rot) {
  twist = new ROSLIB.Message({
    linear: {
      x: forw,
      y: 0.0,
      z: 0.0
    },
    angular: {
      x: 0.0,
      y: 0.0,
      z: rot
    }
  });
}


//Placeholder topic, depends on connection service (has to be global for send loop)
var cmdVel;

var gp;

var gpForw = 0;
var gpRot  = 0;


window.addEventListener("gamepadconnected", (event) => {
  console.log("A gamepad connected:");
  // console.log(event.gamepad);
  gp = navigator.getGamepads()[0];
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("A gamepad disconnected:");
  // console.log(event.gamepad);
  gp = null;
});

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






  //Loop of send button
  toggleSend() {
    var self = this;
    if (this.isPublishing) {
      clearInterval(this.publishLoop);
      this.sendButtonText = "Start sending";
    } else {
      self.publishLoop = setInterval(function() {
        if(gp != null){
          gp = navigator.getGamepads()[0];
          gpForw = gp.axes[3] * -5;
          gpRot = gp.axes[2] *-5;
          updateMsg(gpForw, gpRot);
          self.forwardValue = Math.round(gpForw*100)/100;
          self.rotationalValue = Math.round(gpRot*100)/100;
        } else {
          updateMsg(self.forwardValue, self.rotationalValue)
        }
        cmdVel.publish(twist);
      }, 100);
      this.sendButtonText = "Stop sending";
    }
    this.isPublishing = !this.isPublishing;
  }

  //Reset Button-Handlers
  resetForw() {
    this.forwardValue = 0.0;
    updateMsg(0, this.rotationalValue);
  }

  resetRot() {
    this.rotationalValue = 0.0;
    updateMsg(this.forwardValue, 0);
  }

  reset() {
    this.forwardValue = 0.0;
    this.rotationalValue = 0.0;
    updateMsg(0,0);
  }

  ngOnInit() {
  }



}

import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';

const rosBridgeUrl = 'ws://localhost:9090';

var ros = new ROSLIB.Ros({
  url: rosBridgeUrl
});


var connected = true;


ros.on('connection', function () {
  connected = true;
  console.log('Connected to websocket server.');
  
});

ros.on('error', function (error) {
  connected = false;
  console.log('Error connecting to websocket server: ', error);
  
});

ros.on('close', function () {
  connected = false;
  console.log('Connection to websocket server closed.');
  
});

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  ros: ROSLIB.Ros;

  constructor() {
    //Import as Attribute so other modules can access it
    this.ros = ros;
   }

   isConnected(){
     return connected;
    
   }


  toggle() {
    if (connected) {
      ros.close();
      console.log("disconnecting");
    } else {
      ros.connect(rosBridgeUrl);
      console.log("retrying");
    }
    
  }

  
}

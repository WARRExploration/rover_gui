import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  /* iP : String;
  rosBridgeUrl : String;
  roverOS : ROSLIB.Ros; */
  /*  iP = '10.151.12.59'; */

  ip : string;
  rosbridgeURL: string;
  /* connected: boolean; */
  roverOS: ROSLIB.Ros;

  connectionStatus = new BehaviorSubject<boolean>(false);
  currentConnectionStatus = this.connectionStatus.asObservable();


  constructor() {
    //Initialize Attributes
    this.ip = "lelele";
    this.rosbridgeURL = "ws://"+this.ip +":9090";

    this.roverOS = new ROSLIB.Ros({
      url: this.rosbridgeURL
    });
    //Setup new roverOS
    this.initializeRoverOS();
  }

  //Configure Event Responses
  initializeRoverOS() {
    var service = this;
    this.roverOS.on('connection', function () {

      service.connectionStatus.next(true);
      console.log('Connected to websocket server.');

    });
    this.roverOS.on('error', function (error) {

      service.connectionStatus.next(false);
      console.log('Error connecting to websocket server: ', error);
    });
    this.roverOS.on('close', function () {

      service.connectionStatus.next(false);
      console.log('Connection to websocket server closed.');
    });
  }

  connect(ip:string){
    this.roverOS.close();
    this.ip = ip;
    this.rosbridgeURL = 'ws://'+this.ip+':9090';
    this.roverOS.connect(this.rosbridgeURL);
  }

  disconnect(){
    this.roverOS.close();
  }

}

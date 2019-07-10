import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import * as ROSLIB from 'roslib';
import { Chart } from 'chart.js';

//Placeholder topic, depends on connection service
var jointStates;
var nrOfDatapoints = 0;
var intervalCounter = 0;

function addData(chart, label, data, startIndex) {
  var i = startIndex;
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data[i++]);
});
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
  });
  chart.update();
}

var velocityChart;
var rockerPositionChart;

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent implements OnInit {

  

  constructor(private connection: ConnectionService) {
    //Initialize correct topic
    jointStates = new ROSLIB.Topic({
      ros: this.connection.ros,
      name: '/joint_states',
      messageType: 'sensor_msgs/JointState'
    });
  }

  isSubscribedToJoints = false;
  subscribeJointButton = "Subscribe";

  toggleJointSubscribe() {
    if (this.isSubscribedToJoints) {
      jointStates.unsubscribe();
      this.subscribeJointButton = "Subscribe";
    } else {
      jointStates.subscribe(function (message) {
        if(intervalCounter === 0){
        addData(velocityChart, (new Date()).getSeconds(), message.velocity, 0);
        addData(rockerPositionChart, (new Date()).getSeconds(), message.position, 4);
        if(nrOfDatapoints <= 10){
          nrOfDatapoints++;
        }else{
          removeData(velocityChart);
          removeData(rockerPositionChart);
          
        }
      }
        intervalCounter = (intervalCounter +1)%10;
      
      });
      this.subscribeJointButton = "Unsubscribe";
    }
    this.isSubscribedToJoints = !this.isSubscribedToJoints;
  }


  

  ngOnInit() {
    velocityChart = new Chart( 'velocityCanvas', {
      type: 'line',
        data: {
        labels: [],
          datasets: [
            {
              label: 'Wheel-Speed',
              data: [],
              backgroundColor: 'blue',
              borderColor: 'blue',
              fill: false,
            }
          ]
      }
    })
    rockerPositionChart = new Chart( 'rockerPositionCanvas', {
      type: 'line',
        data: {
        labels: [],
          datasets: [
            {
              label: 'Left Rocker',
              data: [],
              backgroundColor: 'red',
              borderColor: 'red',
              fill: false,
            },
            {
              label: 'Right Rocker',
              data: [],
              backgroundColor: 'green',
              borderColor: 'green',
              fill: false,
            }
          ]
      }
    })
  }

  

}

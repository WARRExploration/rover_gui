import { Component } from '@angular/core';
import {ConnectionService} from './connection.service';
import { throwToolbarMixedModesError } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'roverGui';
  connectionStatus: string; 
  connectionButton: string; 

  constructor(private connection: ConnectionService){
  this.updateView();
  }

  updateView(){
    if(this.connection.isConnected()){
      this.connectionStatus = "Connected";
      this.connectionButton = "Disconnect";
    }else{
      this.connectionStatus = "Not connected";
      this.connectionButton = "Reconnect";
    }
  }

  toggle() {
    //Forward to service
    this.connection.toggle();
    //Update text
    this.updateView();  
  }

 



}

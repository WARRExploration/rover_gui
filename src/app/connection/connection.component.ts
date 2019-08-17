import { Component, OnInit} from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  inputIP : string = "localhost";
  connectionStatus: string= "not connected";

  

  constructor(private cs: ConnectionService){

  }

  connect(){
   this.cs.connect(this.inputIP);
  }

  disconnect(){
    this.cs.disconnect();
  }

  ngOnInit() {
    this.cs.currentConnectionStatus.subscribe(connected => {if(connected){
      this.connectionStatus = "connected";
    }else{
      this.connectionStatus = "not connected";
    }})
  }

}

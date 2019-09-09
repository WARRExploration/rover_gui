import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';




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

  constructor() {
    

  }

  setPos(click: MouseEvent) {
    
    console.log(click.offsetX);
    console.log(click.offsetY);
    this.ctxTop.clearRect(0, 0, this.top.width, this.top.height);
    this.ctxTop.beginPath();
    this.ctxTop.arc(click.offsetX, click.offsetY, 10, 0, 2 * Math.PI);
    this.ctxTop.fill();
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

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass']
})
export class CanvasComponent implements AfterViewInit {
  canvasHeight = 700;
  canvasWidth = 500;

  @ViewChild('canvasElement', {static: false})
  private canvas: ElementRef;
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.ctx.globalCompositeOperation = 'destination-over';

    this.setImage();
    this.setText();
  }

  setText() {
    this.ctx.font = '30px Arial';
    this.ctx.fillText('Hello World', 10, 50);
  }

  setImage() {
    const background = new Image();
    background.src = 'http://placehold.it/500x700';
    background.onload = () => {
      this.ctx.drawImage(background, 0, 0);
    };
  }
}

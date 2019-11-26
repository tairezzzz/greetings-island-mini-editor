import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @Input()
  height = 700;
  @Input()
  width = 500;
  @Input()
  textParams: CanvasTextParamsInterface;
  @Input()
  image: File;

  @ViewChild('canvasElement', {static: false})
  private canvas: ElementRef;
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.ctx.globalCompositeOperation = 'destination-over';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.draw();
  }

  draw() {
    this.clearRect();
    this.setText();
    this.setImage();
  }

  clearRect() {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setText() {
    if (!this.textParams) {
      return;
    }

    const {text, font, color, x, y, size} = this.textParams;
    this.ctx.textAlign = 'start';
    this.ctx.textBaseline = 'top';
    this.ctx.font = `${size}px ${font}, sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  setImage() {
    if (!this.image) {
      return;
    }

    const background = new Image();
    background.src = URL.createObjectURL(this.image);
    background.onload = () => {
      this.ctx.drawImage(background, 0, 0);
    };
  }
}

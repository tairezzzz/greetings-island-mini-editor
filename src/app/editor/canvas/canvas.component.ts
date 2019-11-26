import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements AfterViewInit, OnChanges, OnInit {
  @Input()
  height;
  @Input()
  width;
  @Input()
  textParams: CanvasTextParamsInterface;
  @Input()
  image: File;

  @ViewChild('canvasElement', {static: false})
  private canvas: ElementRef;

  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private imageCanvas: HTMLCanvasElement;
  private imageCtx: CanvasRenderingContext2D;

  private textCanvas: HTMLCanvasElement;
  private textCtx: CanvasRenderingContext2D;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.ctx.globalCompositeOperation = 'destination-over';
    this.setBackgroungColor();
  }

  ngOnInit(): void {
    /* virtual canvases - not appended to the DOM*/
    this.imageCanvas = this.renderer.createElement('canvas');
    this.imageCtx = this.imageCanvas.getContext('2d');
    this.configVirtualCanvas(this.imageCanvas, this.imageCtx);

    /* virtual canvases - not appended to the DOM*/
    this.textCanvas = this.renderer.createElement('canvas');
    this.textCtx = this.textCanvas.getContext('2d');
    this.configVirtualCanvas(this.textCanvas, this.textCtx);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const img = changes.image;
    const textParams = changes.textParams;

    if (img && img.currentValue !== img.previousValue) {
      this.drawImage();
    }

    if (textParams && textParams.currentValue !== textParams.previousValue) {
      this.drawText();
    }
  }

  configVirtualCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    canvas.height = this.height;
    canvas.width = this.width;
    context.fillRect(0, 0, this.width, this.height);
  }

  drawText() {
    this.clearRect(this.textCtx);
    const {text, font, color, x, y, size} = this.textParams;
    this.textCtx.textAlign = 'start';
    this.textCtx.textBaseline = 'top';
    this.textCtx.font = `${size}px ${font}, sans-serif`;
    this.textCtx.fillStyle = color;
    this.textCtx.fillText(text, x, y);

    this.draw();
  }

  drawImage() {
    const background = new Image();
    background.src = URL.createObjectURL(this.image);
    background.onload = () => {
      this.clearRect(this.imageCtx);
      this.imageCtx.drawImage(background, 0, 0);

      this.draw();
    };
  }

  draw() {
    this.clearRect(this.ctx);

    if (this.textParams) {
      this.ctx.drawImage(this.textCanvas, 0, 0);
    }
    if (this.image) {
      this.ctx.drawImage(this.imageCanvas, 0, 0);
    }

    this.setBackgroungColor();
  }

  clearRect(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
  }

  setBackgroungColor(color = 'white') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  getBase64Url() {
    const canvas = this.canvas.nativeElement;
    return canvas.toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  }
}

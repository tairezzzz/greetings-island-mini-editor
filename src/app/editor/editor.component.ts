import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent {
  @ViewChild(CanvasComponent, {static: true})
  canvasComponent: CanvasComponent;

  canvasTextParams: CanvasTextParamsInterface;
  canvasImage: File;
  canvasHeight = 700;
  canvasWidth = 500;
  fonts = [
    'Ibarra Real Nova',
    'Josefin Sans',
    'Lobster',
    'Roboto',
  ];

  form = new FormGroup({
    text: new FormControl('test', [Validators.required, Validators.maxLength(50)]),
    font: new FormControl('Roboto', [Validators.required]),
    color: new FormControl('#000000', [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm)]),
    x: new FormControl(15, [Validators.required, Validators.min(0), Validators.max(this.canvasWidth)]),
    y: new FormControl(15, [Validators.required, Validators.min(0), Validators.max(this.canvasHeight)]),
    size: new FormControl(20, [Validators.required, Validators.min(0), Validators.max(50)]),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.canvasTextParams = this.form.value;
    this.form.reset();
  }

  onFileChange(fileList: FileList) {
    this.canvasImage = fileList.item(0);
  }

  download(ev) {
    ev.target.href = this.canvasComponent.getBase64Url();
  }

}

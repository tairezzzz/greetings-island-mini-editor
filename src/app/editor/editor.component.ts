import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent {
  canvasTextParams: CanvasTextParamsInterface;
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

  // ngOnInit() {
  //   this.form.setValue({
  //     text: 'ad',
  //     font: 'Josefin Sans',
  //     color: '#333333',
  //     x: 15,
  //     y: 15,
  //     size: 20
  //   });
  // }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.canvasTextParams = this.form.value;
  }
}

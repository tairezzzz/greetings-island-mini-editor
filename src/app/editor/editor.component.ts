import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent {
  canvasHeight = 700;
  canvasWidth = 500;
  fonts = [
    'Ibarra Real Nova',
    'Josefin Sans',
    'Lobster',
    'Roboto',
  ];

  form = new FormGroup({
    text: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    font: new FormControl('', [Validators.required]),
    color: new FormControl(null, [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm)]),
    x: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.canvasWidth)]),
    y: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.canvasHeight)]),
    size: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(50)]),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}

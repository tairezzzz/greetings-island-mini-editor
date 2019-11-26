import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { EditorComponent } from './editor.component';
import { CanvasModule } from './canvas/canvas.module';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CanvasModule,
  ],
  exports: [EditorComponent]
})
export class EditorModule { }

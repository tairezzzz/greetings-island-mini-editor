import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { CanvasModule } from './canvas/canvas.module';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CanvasModule
  ],
  exports: [EditorComponent]
})
export class EditorModule { }

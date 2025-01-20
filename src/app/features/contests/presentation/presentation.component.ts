import { Component, inject, model, OnInit, signal } from '@angular/core';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WordListComponent } from '../word-list/word-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
  
})
export class PresentationComponent  {
 readonly output = signal('');
   readonly input = model('');
   readonly dialog = inject(MatDialog);
 
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
     this.input.set('hello');
     const dialogRef = this.dialog.open(WordDialogComponent, {
       height: '200px',
       width: '300px',
       enterAnimationDuration,
       exitAnimationDuration,
       data: { input: this.input(), output: this.output() },
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
       if (result !== undefined) {
         this.output.set(result);
       }
     });
   }
}

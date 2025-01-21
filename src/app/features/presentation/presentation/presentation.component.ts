import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { WordlistsService } from '../../editor/wordlists/wordlists.service';
import { Wordlist } from '../../editor/wordlist/wordlist.model';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { WordDialogComponent } from '../../editor/word-dialog/word-dialog.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [AsyncPipe,DatePipe,MatButtonModule],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
  
})
export class PresentationComponent  {
 readonly output = signal('');
   readonly input = model('');
   readonly dialog = inject(MatDialog);
 private readonly route: ActivatedRoute = inject(ActivatedRoute);
   private readonly wordlistsService:WordlistsService = inject(WordlistsService)
   wordlist$!:Observable<Wordlist>;
  constructor() {
   
  }
 
  ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
   this.wordlist$ =this.route.paramMap.pipe(
     tap(params=>console.log(params.get('id'))),
     mergeMap(params => this.wordlistsService.getSnapshotChanges().pipe(
       map(wordlists=>wordlists[wordlists.findIndex(w=>w.id===params.get('id'))])
     )
     )
   )
  }
  
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

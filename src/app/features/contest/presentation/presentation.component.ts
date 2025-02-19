import { Component, inject, Input, model, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { WordlistsService } from '../wordlists/wordlists.service';
import { Word, Wordlist } from '../wordlist/wordlist.model';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatButtonModule],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']

})
export class PresentationComponent {
  readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
  readonly output = signal('');
  readonly input = model('');
  readonly dialog = inject(MatDialog);
  wordlist$!: Observable<Wordlist>;
  @Input() word!: Word;
  constructor() {

  }

  ngOnInit(): void {
this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
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

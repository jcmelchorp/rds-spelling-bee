import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  input,
  model,
  NgModule,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  concat,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
  Subscription,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import { Grades, Word, Wordlist } from '../wordlist/wordlist.model';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WordlistsService } from '../wordlists/wordlists.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { WordlistComponent } from '../wordlist/wordlist.component';
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgIfContext } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule, FlexModule } from 'ngx-flexible-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';
import { WordchipsComponent } from '../wordchips/wordchips.component';
import * as confetti from 'canvas-confetti';
import {
  bounceInDownOnEnterAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
  bounceInUpOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  flipOnEnterAnimation,
  hingeOnLeaveAnimation,
  hueRotateAnimation,
  jackInTheBoxAnimation,
  jackInTheBoxOnEnterAnimation,
  jelloAnimation,
  lightSpeedInOnEnterAnimation,
  lightSpeedOutOnLeaveAnimation,
  rotateInUpRightAnimation,
  rotateOutUpRightAnimation,
  rubberBandAnimation,
  zoomInUpAnimation,
  zoomInUpOnEnterAnimation,
  zoomOutUpAnimation,
} from 'angular-animations';

@Component({
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatOptionModule,
    WordchipsComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    WordchipsComponent,
  ],
  animations: [
    bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter2', delay: 200 }),
    bounceInDownOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter4', delay: 200 }),
    jackInTheBoxOnEnterAnimation({ anchor: 'enter5', delay: 200 }),
    rubberBandAnimation({ anchor: 'rubberBand', delay: 500 }),
    jelloAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestComponent implements OnInit {
  private readonly wordlistService = inject(WordlistsService);
  readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
  readonly output = signal('');
  readonly input = model('');
  readonly dialog = inject(MatDialog);
  animation = 'rubberBand';
  animationState = false;
  animationWithState = false;
  hueBtnState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }
  word!: Word;
  disableSelect: string = 'false';
  wordlists$!: Observable<Wordlist[]>;
  wordlist$: Observable<Wordlist> = new Observable<Wordlist>();
  wordlist!: Wordlist;
  wordsCount: number = 1;
  showB: BehaviorSubject<boolean> = new BehaviorSubject(false);
  levels = Grades;
  gradeControl: FormControl = new FormControl<Wordlist>({});
  duration = 15 * 1000;
  animationEnd = Date.now() + this.duration;
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  constructor() {
    // this.balloonContainer = this.elRef.nativeElement;
    this.wordlist$ = this.gradeControl.valueChanges.pipe(
      switchMap((grade: string) =>
        this.wordlistService.list().pipe(
          map((wordlists) => wordlists.find((wl) => wl.level === grade)!),
          tap((wordlist) => {
            this.wordlist = wordlist;
            // Hack for debugging fast
            // this.wordlist.words=this.wordlist.words!.map(word => {
            //     if (Number(word.id!) <=55) {word.staged = true;} else {word.staged = false;}
            //     return word;
            // });
          })
        )
      ),
      tap(() => this.gradeControl.disable())
    );
  }

  ngOnInit(): void {}

  startReading(word: Word) {
    this.word = word;
    this.openDialog('2000ms', '500ms');
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.input.set(
      this.word.id +
        '|' +
        this.word.label! +
        '|' +
        this.word.definition! +
        '|' +
        this.word.example!
    );
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: 'fit-content',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      backdropClass: 'backDrop', // mat-dialog css class
      disableClose: true,  // If you click outside the mat-dialog box window, it will not close.
      autoFocus: false,
      //panelClass: 'custom-dialog',
      data: { input: this.input(), output: this.output() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.output.set(result);
        if (this.wordsCount === this.wordlist.words?.length) {
          //this.celebrate();
         // this.celebrate();
          // this.interval()
          //alert('The Spelling Bee contest has finished!')
          this.gradeControl.enable();
        } else {
          console.log(this.word);
          this.wordsCount++;
        }
      }
    });
  }

  // randomInRange(min: number, max: number) {
  //   return Math.random() * (max - min) + min;
  // }

  // interval: any = () => {
  //   var timeLeft = this.animationEnd - Date.now();

  //   if (timeLeft <= 0) {
  //     return clearInterval(this.interval);
  //   }

  //   var particleCount = 50 * (timeLeft / this.duration);
  //   // since particles fall down, start a bit higher than random
  //   confetti.default({
  //     ...this.defaults,
  //     particleCount,
  //     origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //   });
  //   confetti.default({
  //     ...this.defaults,
  //     particleCount,
  //     origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  //   });
  // };

  // celebrate() {
  //   const duration = 10000; // in milliseconds

  //   confetti.default({
  //     particleCount: 100,
  //     spread: 160,
  //     origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //   });
  //   // Clear confetti after a certain duration
  //   setTimeout(() => confetti.default.reset(), duration);
  // }
}

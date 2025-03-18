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
  OnDestroy,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  concat,
  findIndex,
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
import {
  AsyncPipe,
  JsonPipe,
  NgClass,
  NgFor,
  NgIf,
  NgIfContext,
} from '@angular/common';
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
import { SpeechService } from '../../../core/services/speech.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../../../core/auth/models/user.model';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserId,
} from '../../../store/selectors/auth.selectors';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ContestService } from '../services/contest.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    NgxSpinnerModule,
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
export class ContestComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly _wordlistService = inject(WordlistsService);
  private readonly _auth = inject(AuthService);
  private readonly _contests = inject(ContestService);
  readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
  readonly _speech: SpeechService = inject(SpeechService);
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
  disableSelect: boolean = false;
  wordlists$!: Observable<Wordlist[]>;
  wordlist$!: Observable<Wordlist>;
  wordlist!: Wordlist;
  wordlistId!: string;
  user$!: Observable<User>;
  userId$!: Observable<string>;
  userId!: string;
  subs: Subscription = new Subscription();
  wordsCount: number = 1;
  filteredWordlist: BehaviorSubject<Wordlist> = new BehaviorSubject(
    {} as Wordlist
  );
  levels = Grades;
  // gradeControl: FormControl = new FormControl<Wordlist>({});
  duration = 15 * 1000;
  animationEnd = Date.now() + this.duration;
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  // @ViewChild('brand', { static: true }) brand!: ElementRef;
  pageArray: number[] = [];
  page = 0;
  dataSource = new MatTableDataSource<Word>();
  filteredData: Word[] = [];

  constructor(public dialogo: MatDialog, private store: Store<AppState>) {}
  ngOnDestroy(): void {
    if (!this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.subs = this.store
      .select(selectUserId)
      .subscribe((uid) => (this.userId = uid));
  }

  //   canDeactivate() {
  //     let conf:boolean=false;
  //     console.log('i am navigating away');
  //     this.dialogo
  //     .open(ConfirmDialogComponent, {
  //       data: `¿Deseas abandonar el concurso?`
  //     }).afterClosed()
  //     .subscribe((confirmado: boolean) => {
  //       console.log(confirmado)
  //       conf=confirmado;
  //       return conf
  //     });
  //     return conf
  // }

  onGradeChange(event: any) {
    let level: string = event.value.replace('°', '');
    //  console.log(level);
    this.wordlist$ = this._wordlistService.getByGrade(level).pipe(
      map((wordlist) => {
        this.wordlistId = wordlist.id!;
        return wordlist;
      }),
      switchMap((wordlist) =>
        this._contests.getById(this.userId, this.wordlistId).pipe(
          map((wl) => {
            if (wl) {
              wl.words?.forEach((word) => {
                console.log(word.id);
                wordlist.words!.find((w) => w.id === word.id)!.staged = true;
                // this.dataSource.data.find((w) => w.id === word.id)!.staged=true
              });
            } else {
              this._contests.saveWordlist(this.userId, wordlist);
            }
            let wordsCount = wordlist.words?.length!;
            let arr = [4, 3, 2, 1];
            for (var index in arr) {
              this.pageArray.push(Math.floor(wordsCount / Number(arr[index])));
            }
            this.loadPaginatedData(wordlist.words!);
            this.linkListToPaginator({
              pageIndex: this.page,
              pageSize: wordsCount,
              pageSizeOptions: this.pageArray,
            });
            return wordlist;
          })
        )
      )
    );
  }

  // this._contests.getById(this.userId, wordlist.id!).pipe(
  //   map(wl => {
  //     if (wl.words!.length > 0) {
  //       wl.words?.map((word) => word.id)
  //         .map((wid) => {
  //           wordlist.words!.find((w) => w.id == wid)!.staged = true;
  //         });
  //     } else {
  //        this._contests.saveWord(this.userId, wl)
  //     }
  //     return wordlist;
  //   })
  // )

  loadPaginatedData(dataObj: Word[]): void {
    this.dataSource.data = dataObj;
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  linkListToPaginator(obj: any): void {
    // console.log(obj);
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.filteredData = this.dataSource.filteredData.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.linkListToPaginator({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    });
  }

  clearContest() {
    let cleanData = this.dataSource.data.map((d) => {
      return { ...d, staged: false };
    });
    console.log(cleanData);
    this.wordlist$ = this._contests.removeContest(this.userId, this.wordlistId);
    let wordsCount = cleanData.length!;
    let arr = [4, 3, 2, 1];
    for (var index in arr) {
      this.pageArray.push(Math.floor(wordsCount / Number(arr[index])));
    }
    this.loadPaginatedData(cleanData);
    this.linkListToPaginator({
      pageIndex: this.page,
      pageSize: wordsCount,
      pageSizeOptions: this.pageArray,
    });
  }

  wordFlow() {
    // console.log('Word Flow');
    let words = this.dataSource.data.filter((word) => word.staged === false);
    this.showSpinner();
    this._speech.playSound();
    this._speech.speechText('Your word is:' as string);
    this.wordsCount = words!.length;
    let randomIndex: number = Math.floor(Math.random() * this.wordsCount);
    let word = words![randomIndex];
    setTimeout(() => {
      this.playWordId(word);
    }, 2500);
    this.emitWord(word);
    this.dataSource.data.find((d) => d.id == word.id)!.staged = true;
    // this.filteredWordlist.next(this.wordlist);
    // console.log(this.filteredData);

    // if (wordsCount == 0) {
    //   alert('El concurso ha terminado');
    // } else if (wordsCount <= this.wordlist.words!.length) {

    //   console.log('Word remain emitted #', wordsCount);
    // } else {
    //   alert('El concurso ha terminado');
    // }
  }

  emitWord(word: Word) {
    setTimeout(() => {
      this.word = word;
      this._speech.speechText(word.label!);
      this.openDialog('2000ms', '500ms');
    }, 2500);
  }

  playWordId(word: Word) {
    this._speech.speechText('number ' + Number(word.id).toLocaleString());
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2500);
  }

  // startReading(word: Word) {
  //   this.word = word;
  //   this.openDialog('2000ms', '500ms');
  // }

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
      disableClose: true, // If you click outside the mat-dialog box window, it will not close.
      autoFocus: false,
      //panelClass: 'custom-dialog',
      data: { input: this.input(), output: this.output() },
    });

    dialogRef.afterClosed().subscribe(
      // map(
      (result: string) => {
        console.log(result);
        let obj = {};
        if (result !== undefined) {
          obj = {
            label: result.split('|')[1],
            id: Number(result.split('|')[0]).toLocaleString(),
          };
        }
        this._contests.addWordContest(this.userId, this.wordlistId, this.word);
      }
      // ),
      // switchMap((o) =>
      //   this.userId$.pipe(
      //     switchMap((uid) => this._auth.addWordContest(uid, this.wordlistId, o))
      //   )
      // )
    );

    if (this.wordsCount === this.dataSource.data.length) {
      //this.celebrate();
      // this.celebrate();
      // this.interval()
      //alert('The Spelling Bee contest has finished!')
      // this.gradeControl.enable();
    } else {
      console.log(this.word);
      this.wordsCount++;
    }
  }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.subs.unsubscribe();
  // }
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

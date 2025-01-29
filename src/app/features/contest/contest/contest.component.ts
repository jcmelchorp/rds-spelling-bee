import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, Input, input, model, NgModule, OnInit, output, signal, ViewChild } from "@angular/core";
import { BehaviorSubject, concat, map, merge, mergeAll, mergeMap, Observable, Subscription, switchAll, switchMap, tap } from "rxjs";
import { Grades, Word, Wordlist } from "../../editor/wordlist/wordlist.model";
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { WordlistsService } from "../../editor/wordlists/wordlists.service";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCommonModule, MatOptionModule } from "@angular/material/core";
import { WordlistComponent } from "../../editor/wordlist/wordlist.component";
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgIfContext } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule, FlexModule } from "ngx-flexible-layout";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { WordDialogComponent } from "../../editor/word-dialog/word-dialog.component";
import { WordchipsComponent } from "../wordchips/wordchips.component";
import * as confetti from 'canvas-confetti';

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
        WordchipsComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ContestComponent implements OnInit {
    private readonly wordlistService = inject(WordlistsService);
    readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
    readonly output = signal('');
    readonly input = model('');
    readonly dialog = inject(MatDialog);
    // @ViewChild('balloons', { static: false }) elRef!: ElementRef;
    // balloonContainer!: HTMLElement;
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
            switchMap((grade: string) => this.wordlistService.list().pipe(
                map(wordlists => wordlists.find((wl) => wl.level === grade)!),
                tap(wordlist => {
                    this.wordlist = wordlist;
                    // Hack for debugging fast
                    // this.wordlist.words=this.wordlist.words!.map(word => {
                    //     if (Number(word.id!) <=55) {word.staged = true;} else {word.staged = false;}
                    //     return word;
                    // });
                })
            )),
            tap(() => this.gradeControl.disable())
        );
    }

    ngOnInit(): void {
    }

    startReading(word: Word) {
        this.word = word;
        this.openDialog('4000ms', '300ms');
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.input.set(this.word.label!);
        const dialogRef = this.dialog.open(WordDialogComponent, {
            enterAnimationDuration,
            exitAnimationDuration,
            backdropClass: 'backDrop',  // mat-dialog css class
            //disableClose: true,  // If you click outside the mat-dialog box window, it will not close.
            autoFocus: false,
            data: { input: this.input(), output: this.output() },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.output.set(result);
                if (this.wordsCount === this.wordlist.words?.length) {
                    this.celebrate(); this.celebrate();
                    // this.interval()
                    //alert('The Spelling Bee contest has finished!')
                    this.gradeControl.enable();
                } else {
                    console.log(this.word)
                    this.wordsCount++;
                    console.log(this.wordsCount)
                }
            }
        });
    }



    randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    interval: any = () => {
        var timeLeft = this.animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(this.interval);
        }

        var particleCount = 50 * (timeLeft / this.duration);
        // since particles fall down, start a bit higher than random
        confetti.default({ ...this.defaults, particleCount, origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti.default({ ...this.defaults, particleCount, origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    };

    celebrate() {
        const duration = 10000; // in milliseconds

        confetti.default({
            particleCount: 100,
            spread: 160,
            origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        // Clear confetti after a certain duration
        setTimeout(() => confetti.default.reset(), duration);
    }

    showBalloons() {
        // this.showB.next(true);
        // console.log('show balloons')
        this.createBalloons(30)
        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.removeBalloons();
            // this.showB.next(false);
        }, 10000);
    }



    random(num: number) {
        return Math.floor(Math.random() * num);
    }

    getRandomStyles() {
        var r = this.random(255);
        var g = this.random(255);
        var b = this.random(255);
        var mt = this.random(200);
        var ml = this.random(50);
        var dur = this.random(5) + 5;
        return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
    }

    createBalloons(num: any) {
        for (var i = num; i > 0; i--) {
            var balloon = document.createElement("div");
            balloon.className = "balloon";
            balloon.style.cssText = this.getRandomStyles();
            // console.log(balloon)
            // this.balloonContainer.append(balloon);
        }
    }

    removeBalloons() {
        // this.balloonContainer.style.opacity = '0';
        setTimeout(() => {
            // this.balloonContainer.remove()
        }, 500)
    }

} 
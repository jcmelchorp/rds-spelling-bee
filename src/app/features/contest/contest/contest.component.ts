import { ChangeDetectionStrategy, Component, inject, Input, input, model, NgModule, OnInit, output, signal } from "@angular/core";
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
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { WordDialogComponent } from "../../editor/word-dialog/word-dialog.component";

@Component({
    templateUrl: './contest.component.html',
    styleUrl: './contest.component.scss',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatOptionModule,
        WordlistComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        FlexLayoutModule,
        NgxSpinnerModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ContestComponent implements OnInit {
    private readonly wordlistService = inject(WordlistsService);
    readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
    readonly output = signal('');
    readonly input = model('');
    readonly dialog = inject(MatDialog);
    word!: Word;

    wordlists$!: Observable<Wordlist[]>;
    wordlist$: Observable<Wordlist> = new Observable<Wordlist>();
    wordlist!: Wordlist;

    levels = Grades;
    gradeControl: FormControl = new FormControl<Wordlist>({});

    constructor() {
        this.wordlist$ = this.gradeControl.valueChanges.pipe(
            switchMap((grade: string) => this.wordlistService.list().pipe(
                map(wordlists => wordlists.find((wl) => wl.level === grade)!),
                tap(wordlist => this.wordlist = wordlist)
            ))
        );
    }

    ngOnInit(): void {
    }

    startReading(word: Word) {
        this.word = word;
        console.log('Reading started', event);
        this.openDialog('500ms', '500ms');
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.input.set(this.word.label!);
        const dialogRef = this.dialog.open(WordDialogComponent, {
            height: '200px',
            width: '300px',
            enterAnimationDuration,
            exitAnimationDuration,
             backdropClass: "custom-backdrop",
             autoFocus: false,
             data: { input: this.input(), output: this.output() },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.output.set(result);
            }
        });
    }
} 
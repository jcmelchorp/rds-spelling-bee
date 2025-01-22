import { ChangeDetectionStrategy, Component, inject, NgModule, OnInit } from "@angular/core";
import { BehaviorSubject, concat, map, merge, mergeAll, mergeMap, Observable, Subscription, switchAll, switchMap, tap } from "rxjs";
import { Grades, Wordlist } from "../../editor/wordlist/wordlist.model";
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
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ContestComponent implements OnInit {
    private readonly wordlistService = inject(WordlistsService);

    wordlists$!: Observable<Wordlist[]>;
    wordlist$: Observable<Wordlist> = new Observable<Wordlist>();
    wordlist!: Wordlist;

    levels = Grades;
    gradeControl: FormControl = new FormControl<Wordlist>({}, Validators.required);;

    constructor() {
        this.wordlist$ = this.gradeControl.valueChanges.pipe(
            mergeMap((grade: string) => this.wordlistService.list().pipe(
                map(wordlists => wordlists.find((wl) => wl.level === grade)!)
            ))
        );
    }
    ngOnInit(): void {
       
    }
} 
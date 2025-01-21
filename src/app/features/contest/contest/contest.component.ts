import { Component, inject, OnInit } from "@angular/core";
import { map, mergeMap, Observable, Subscription, switchMap, tap } from "rxjs";
import { Grades, Wordlist } from "../../editor/wordlist/wordlist.model";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WordlistsService } from "../../editor/wordlists/wordlists.service";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCommonModule, MatOptionModule } from "@angular/material/core";
import { WordlistComponent } from "../../editor/wordlist/wordlist.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    templateUrl: './contest.component.html',
    styleUrl: './contest.component.scss',
    standalone: true,
    imports: [
        WordlistComponent,
        AsyncPipe,
        JsonPipe,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatOptionModule,
        MatFormField,
        MatLabel
    ]
})

export class ContestComponent implements OnInit {
    private readonly wordlistService = inject(WordlistsService);
    dataSource!: MatTableDataSource<Wordlist>;

    wordlists$!: Observable<Wordlist[]>;
    wordlist$!: Observable<Wordlist>;
    wordlist!: Wordlist;
    isLoading$!: Observable<boolean>;
    isLoaded$!: Observable<boolean>;
    levelKeys = Object.keys(Grades);
    levels = Grades;
    // subscription!: Subscription;
    // filterValues: FormGroup;
    


    constructor(
        private fb: FormBuilder,
    ) {
        // Init form
        // this.filterValues = this.fb.group({
        //     levelKey: new FormControl('SEC1'),
        // });
        // this.filterValues.patchValue({ levelKey: 'SEC1' });
       this.wordlist$= this.wordlistService.getSnapshotChanges((ref) =>
            ref.orderBy('level', 'desc')
        ).pipe(
            map(wordlists => {
                let wl= wordlists.find(wl => wl.level === 'SEC1');
                // this.dataSource = new MatTableDataSource([wl]);
                console.log(wl)
return wl?wl:{};
            })
        );
    }

    ngOnInit(): void {

        // this.wordlist$!= this.filterValues.valueChanges
        //     .pipe(
        //         tap((changes) => Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key])),
        //         tap((o) => console.log(o)),
        // mergeMap((obj) => this.selectWordlist(obj.levelKey)),
        //     );
        //this.selectFilter();
    }
    // setFilter(filter: any) {
    //   this.iptvsEntityService.filter$
    //   this.iptvsEntityService.setFilter({ countryCode: countryCode });
    // }

    selectWordlist(grade: string) {
        return this.wordlists$
            .pipe(
                map((wordlists) => wordlists.filter((wl) => wl.level === grade).pop())
            );
    }
    
    notify(wordId: string) {
        console.log(wordId)
        // this.wordlist$ = this.selectWordlist(wordId);
    }

    

    // get levelKey(): string {
    //     return this.filterValues.get('levelKey')!.value;
    // }
    
    // get subdivisions(): string[] {
    //   return this.filterValues.get('subdivisions').value;
    // }
    // selectFilter() {
    //     let obj = {
    //         levelKey: this.levelKey
    //     };
    //     Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    //     this.iptvsEntityService.setFilter(...[obj]);
    //     // console.log(obj)
    // }

    // onCountryChange(event: any) {
    // this.selectCountryCode = event.value;
    // console.log("onCountryChange", this.selectCountryCode);
    // this.subdivisionKeys = Object.keys(this.subdivisions[this.selectCountryCode]);
    // this.filterValues.patchValue({ countryCode: this.selectCountryCode });
    // this.selectFilter();
    // }
    // expandDocumentTypes(group: any) {
    //   console.log("expanding dropdown", group);
    //   let names = this.subdivisions[group];
    //   this.isExpandCategory[group] = !this.isExpandCategory[group];
    //   // expand only selected parent dropdown category with that childs
    // }

    // toggleSelection(event: any, name: any, group: any) {
    //   console.log("toggleSelection", name, event.checked, group);
    //   if (event.checked) {
    //     console.log("stastateRecordtelist", this.stateRecord);
    //     this.stateRecord.push(name);
    //     this.states.setValue(this.stateRecord);
    //     console.log("toggleselection ", this.states.value);
    //   }
    //   else {
    //     console.log("else toggleselection", name, group, this.states.value);
    //     this.states.setValue(this.states.value.filter((x: any) => x !== name));
    //     console.log("after filter ", this.states.value);
    //     //this.states.setValue([]);
    //   }
    // }

    // toggleParent(event: any, group: any) {
    //   group.checked = event.checked;
    //   console.log("event", event.checked, "group", group, "states value", this.states.value);
    //   let states = this.states.value;
    //   states = states ? states : [];
    //   if (event.checked) {
    //     states.push(...group.names)
    //   } else {
    //     console.log("else", states);
    //     group.names.forEach((x: string) => states.splice(states.indexOf(x), 1));
    //   }
    //   this.states.setValue(states);
    //   console.log("statesvalue", this.states.value);
    //   if (!event.checked) {
    //     this.states.setValue(this.states.value.filter((x: any) => !x.includes(group.names)))
    //     //this.states.setValue([]);
    //   }
    //   console.log("final statesvalue", this.states.value);
    // }
  





    // expandDocumentTypes(group: any) {
    //   console.log("expanding dropdown", group);
    //   this.isExpandCategory[group.letter] = !this.isExpandCategory[group.letter];
    //   // expand only selected parent dropdown category with that childs
    // }

    // toggleSelection(event: any, name: any, group: any) {
    //   console.log("toggleSelection", name, event.checked, group);
    //   if (event.checked) {
    //     console.log("stastateRecordtelist", this.stateRecord);
    //     this.stateRecord.push(name);
    //     this.states.setValue(this.stateRecord);
    //     console.log("toggleselection ", this.states.value);
    //   }
    //   else {
    //     console.log("else toggleselection", name, group, this.states.value);
    //     this.states.setValue(this.states.value.filter((x: any) => x !== name));
    //     console.log("after filter ", this.states.value);
    //     //this.states.setValue([]);
    //   }
    // }

    // toggleParent(event: any, group: any) {
    //   group.checked = event.checked;
    //   console.log("event", event.checked, "group", group, "states value", this.states.value);
    //   let states = this.states.value;
    //   states = states ? states : [];
    //   if (event.checked) {
    //     states.push(...group.names)
    //   } else {
    //     console.log("else", states);
    //     group.names.i.forEach((x: string) => states.splice(states.indexOf(x), 1));
    //   }
    //   this.states.setValue(states);
    //   console.log("statesvalue", this.states.value);
    //   if (!event.checked) {
    //     this.states.setValue(this.states.value.filter((x: any) => !x.includes(group.names)))
    //     //this.states.setValue([]);
    //   }
    //   console.log("final statesvalue", this.states.value);
    //   this.filterValues.patchValue({ subdivisions: this.states.value });
    //   this.selectFilter();
    // }

} 
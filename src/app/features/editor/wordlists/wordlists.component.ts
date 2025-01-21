import { Component, inject } from "@angular/core";
import { WordlistsService } from "./wordlists.service";
import { Grades, Wordlist } from "../wordlist/wordlist.model";
import { CommonModule, JsonPipe, NgFor, NgForOf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { from, map, switchMap, take } from "rxjs";
import { WordlistComponent } from "../wordlist/wordlist.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterLink } from "@angular/router";
import { MatGridListModule } from "@angular/material/grid-list";


@Component({
    selector: 'app-wordlists',
    standalone: true,
    imports: [JsonPipe,CommonModule, RouterLink ,ReactiveFormsModule, FormsModule,MatCardModule,MatButtonModule,MatIconModule,MatFormFieldModule,NgForOf],
    templateUrl: './wordlists.component.html',
  })
  export class WordlistsComponent {
    wordlist: Wordlist = { words:[], createdTime: Date.now() };
    private readonly wordlistService = inject(WordlistsService);
  newWord:string='';
    wordlists$ = this.wordlistService.getSnapshotChanges((ref) =>
      ref.orderBy('level', 'desc')
    );
  
   
    async submit() {
      this.wordlistService
        .add(this.wordlist)
        .pipe(take(1))
        .subscribe({
          next: () => {
            console.warn('success');
            this.wordlist = { ...this.wordlist};
            console.log(this.wordlist)
          },
          error: () => {
            console.error('error');
          },
        });
    }
  
    updateWordlist(wordlist: Wordlist) {
      this.wordlistService.update(wordlist);
    }
  
    deleteWordlist(wordlist: Wordlist) {
      this.wordlistService.delete(wordlist);
    }
  }
  
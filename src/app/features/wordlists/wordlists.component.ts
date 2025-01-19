import { Component, inject } from "@angular/core";
import { WordlistsService } from "./wordlists.service";
import { Grades, Wordlist } from "./wordlist.model";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs";

@Component({
    selector: 'app-wordlists',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './wordlists.component.html',
  })
  export class WordlistsComponent {
    wordlist: Wordlist = { id:'', words:[], createdTime: Date.now() };
    private readonly wordlistService = inject(WordlistsService);
  
    wordlists$ = this.wordlistService.getSnapshotChanges((ref) =>
      ref.orderBy('createdTime', 'desc')
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
  
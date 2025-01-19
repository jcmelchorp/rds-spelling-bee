import { Component, inject } from "@angular/core";
import { WordlistsService } from "./wordlists.service";
import { Grades, Wordlist } from "../wordlist.model";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { from, map, switchMap, take } from "rxjs";
import { WordlistComponent } from "../wordlist/wordlist.component";

@Component({
    selector: 'app-wordlists',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, WordlistComponent],
    templateUrl: './wordlists.component.html',
  })
  export class WordlistsComponent {
    wordlist: Wordlist = { words:[], createdTime: Date.now() };
    private readonly wordlistService = inject(WordlistsService);
  newWord:string='';
    wordlists$ = this.wordlistService.getSnapshotChanges((ref) =>
      ref.orderBy('level', 'desc')
    );
  
    addWord(id:string) {
            this.wordlists$.pipe(
              map(wordlists=> {
                let wl=wordlists.find(wordlist=>wordlist.id===id);
                wl?.words?.push(this.newWord);
                this.updateWordlist(wl!);
              }),
              take(1),
            );
    }
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
  
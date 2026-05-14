import { Component, inject, signal } from "@angular/core";
import { WordlistsService } from "./wordlists.service";
import {  Word, Wordlist } from "../wordlist/wordlist.model";
import { NgForOf, AsyncPipe, DatePipe, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { take } from "rxjs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipOption, MatChipListbox, MatChipRow, MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-wordlists',
    standalone: true,
  //   styles: `
  //   .background{
  //     height: calc(100% - 55px);
  //     background: 
  //   radial-gradient(black 3px, transparent 4px),
  //   radial-gradient(black 3px, transparent 4px),
  //   linear-gradient(#fff 4px, transparent 0),
  //   linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
  //   linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
  // #fff;
  // background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
  // background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  //   }
    
  
  //   `,  
  styleUrls: ['./wordlists.component.scss'],
    imports: [AsyncPipe, NgForOf, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatExpansionModule, MatChipListbox, MatChipOption, MatChipRow, NgIf, MatProgressSpinner],
    templateUrl: './wordlists.component.html',
  })
  export class WordlistsComponent {
    readonly panelOpenState = signal(false);
    private readonly wordlistService = inject(WordlistsService);
    wordlist: Wordlist={id: '', level: '', words: [],timestamp: Date.now()};
    wordlists$ = this.wordlistService.list();
    readonly addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    readonly words = signal<Word[]>([]);
    readonly announcer = inject(LiveAnnouncer);

  
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
      this.wordlistService.update(wordlist.id!, wordlist);
    }
  
    deleteWordlist(wordlist: Wordlist) {
      this.wordlistService.delete(wordlist.id!);
    }

    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our word
      if (value) {
        this.words.update(words => [...words, {label: value}]);
      }
  
      // Clear the input value
      event.chipInput!.clear();
    }
  
    remove(word: Word): void {
      this.words.update(words => {
        const index = words.indexOf(word);
        if (index < 0) {
          return words;
        }
  
        words.splice(index, 1);
        this.announcer.announce(`Removed ${word.label}`);
        return [...words];
      });
    }
  
    edit(word: Word, event: MatChipEditedEvent) {
      const value = event.value.trim();
  
      // Remove word if it no longer has a name
      if (!value) {
        this.remove(word);
        return;
      }
  
      // Edit existing word
      this.words.update(words => {
        const index = words.indexOf(word);
        if (index >= 0) {
            words[index].label = value;
          return [...words];
        }
        return words;
      });
    }
  
  }
  
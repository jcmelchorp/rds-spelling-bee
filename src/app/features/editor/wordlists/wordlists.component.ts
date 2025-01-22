import { Component, inject } from "@angular/core";
import { WordlistsService } from "./wordlists.service";
import {  Wordlist } from "../wordlist/wordlist.model";
import { NgForOf,AsyncPipe,DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterLink } from "@angular/router";
import { take } from "rxjs";

@Component({
    selector: 'app-wordlists',
    standalone: true,
    imports: [DatePipe,AsyncPipe,NgForOf, RouterLink ,ReactiveFormsModule, FormsModule,MatCardModule,MatButtonModule,MatIconModule,MatFormFieldModule],
    templateUrl: './wordlists.component.html',
  })
  export class WordlistsComponent {
    private readonly wordlistService = inject(WordlistsService);
    wordlist: Wordlist={id: '', level: '', words: [],timestamp: Date.now()};
    wordlists$ = this.wordlistService.list();
  
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
  }
  
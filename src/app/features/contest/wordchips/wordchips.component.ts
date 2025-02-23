import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  inject,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Word, Wordlist } from '../wordlist/wordlist.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-wordchips',
  standalone: true,
  imports: [
    NgClass,
    NgxSpinnerModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatChipsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatOptionModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './wordchips.component.html',
  styleUrl: './wordchips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordchipsComponent implements OnInit /*, OnChanges*/ {
  readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({ required: true }) object!: Wordlist;
  @Output() onWordEmit = new EventEmitter<Word>();
  filteredData: Word[] = [];
  // @HostListener('document:keyup', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'Space':
  //       this.startContest(this.filteredData)
  //       break;
  //   }
  // }
  defaultElevation = 2;
  raisedElevation = 4;
  size = 300;
  page = 0;
  dataSource = new MatTableDataSource<Word>();
  uttr: SpeechSynthesisUtterance;
  constructor() {
    let voicesList: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
    this.uttr = new SpeechSynthesisUtterance();
    let lang = 'en-US';
    this.uttr.lang = lang;
    this.uttr.rate = 0.75;
    this.uttr.pitch = 0.9;
    this.uttr.voice = voicesList.filter((voice) => voice.lang === lang).pop()!;

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes)
  //   if (changes['objects'].currentValue) {
  //     this.loadPaginatedData(changes['objects'].currentValue);
  //     this.linkListToPaginator({ pageIndex: this.page, pageSize: this.paginator.pageSize });
  //   }
  // }

  ngOnInit(): void {
    this.loadPaginatedData(this.object.words!);
    this.linkListToPaginator({ pageIndex: this.page, pageSize: this.size });
    }

  loadPaginatedData(dataObj: Word[]): void {
    this.dataSource.data = dataObj;
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  linkListToPaginator(obj: any): void {
    console.log(obj);
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

  wordFlow(words: Word[]) {
    this.showSpinner();
    this.playSound('/assets/media/ascenso.mp3');
    words = words.filter((w) => w.staged === false);
    let wordsCount: number = words.length;
    if (wordsCount == 0) {
      alert('El concurso ha terminado');
    } else if (wordsCount <= this.object.words!.length) {
      let randomIndex: number = Math.floor(Math.random() * wordsCount);
      let word = words[randomIndex];
      words[randomIndex].staged = true;

      setTimeout(() => {
        this.playWordId(word)
      }, 2500);
      this.emitWord(word);
      console.log('Word remain emitted #', wordsCount);
    } else {
      alert('El concurso ha terminado');
    }
  }

  emitWord(word: Word) {
    setTimeout(() => {
      this.onWordEmit.emit(word);
    }, 2500);
  }

  playWordId(word: Word) {
    this.speechText(`number ${Number(word.id)}`);
  }

  speechText(text: string) {
    this.uttr.text = text;
    window.speechSynthesis.speak(this.uttr);
  }

  playSound(arg0: string): void {
    let audio = new Audio(arg0);
    audio.onended = () => this.speechText('Your word is:');
    audio.load();
    audio.play();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}

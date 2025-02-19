import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, model, OnChanges, OnInit, Output, signal, SimpleChanges, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { merge, of, startWith, switchMap } from "rxjs";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Word, Wordlist } from "./wordlist.model";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { MatDialog } from "@angular/material/dialog";
import { WordDialogComponent } from "../word-dialog/word-dialog.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-wordlist',
  standalone: true,
  imports: [NgxSpinnerModule, FlexLayoutModule, MatCardModule, ReactiveFormsModule, FormsModule, MatTableModule, MatOptionModule, MatIconModule, MatPaginatorModule, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './wordlist.component.html',
  styleUrl: './wordlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordlistComponent implements OnInit, OnChanges, AfterViewInit {
  readonly spinner: NgxSpinnerService = inject(NgxSpinnerService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Word>;
  @Input({ required: true }) object!: Wordlist;
  @Output() onWordEmit = new EventEmitter<Word>();
  dataSource!: MatTableDataSource<Word>;
  defaultElevation = 2;
  raisedElevation = 4;
  isLoading = false;
  displayedColumns = ['label'];


  constructor() {
    this.dataSource = new MatTableDataSource();
  }


  ngOnInit(): void {
    console.log(this.object);
    this.dataSource.data = this.object.words!;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['object'].currentValue) {
      this.dataSource.data = changes['object'].currentValue.words;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.object.words!;

    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  startContest(words: Word[], enterAnimationDuration: string, exitAnimationDuration: string) {
    this.showSpinner();
    let randIndex = Math.floor(Math.random() * words.length)
    let word = words[randIndex];
    this.onWordEmit.emit(word);
    console.log(word);
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

}
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
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
import { MaterialElevationDirective } from "../../../shared/directives/material-elevation.directive";

@Component({
  selector: 'app-wordlist',
  standalone: true,
  imports: [MaterialElevationDirective,CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatOptionModule, MatIconModule, MatPaginatorModule, RouterLink,MatButtonModule],
  templateUrl: './wordlist.component.html',
  styleUrl: './wordlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordlistComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<Word>;
  @Input({ required: true }) object!: Wordlist;
  @Output() onIptvEmit = new EventEmitter<Word>();
  dataSource!: MatTableDataSource<Word>;
  defaultElevation = 2;
  raisedElevation = 4;
  isLoading = false;
  displayedColumns = ['label'];
  constructor() {
    this.dataSource = new MatTableDataSource();
  }


  ngOnInit(): void {
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

startContest(words: Word[]) {
}
}
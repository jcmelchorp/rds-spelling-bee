import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { merge, of, startWith, switchMap } from "rxjs";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { Word, Wordlist } from "./wordlist.model";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'app-wordlist',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatOptionModule, MatIconModule, MatPaginatorModule, RouterLink],
    templateUrl: './wordlist.component.html',
  })
  export class WordlistComponent {
    @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<Word>;
  @Input({ required: true }) object!: Wordlist;
  @Output() onIptvEmit = new EventEmitter<Word>();
  dataSource: MatTableDataSource<Word>=new MatTableDataSource();
  defaultElevation = 2;
  raisedElevation = 4;
  isLoading = false;
  displayedColumns = ['label'];
  constructor(private _liveAnnouncer: LiveAnnouncer) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['object'].currentValue) {
      this.dataSource = new MatTableDataSource(changes['object'].currentValue.words);

      // this.table.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.isLoading = false;
    }
  }
  ngOnInit(): void {

    console.log(this.object);
    // this.dataSource.filter = this.selectedCountry
    // this.linkListToPaginator();

    // this.dataSource = new IptvListDataSource(this.iptvDtoService);
    // this.linkListToPaginator();
  }
  ngAfterViewInit(): void {
    this.dataSource.data = this.object.words as Word[];

    // console.log(this.dataSource);
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.table.dataSource = this.dataSource;
    // this.isLoading = false;
    // this.isLoaded = true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // playUrl(url: string) {
  //   this.onIptvEmit.emit(url);
  // }
  // goIptv(id: string) {
  //   this._router.navigate(['/iptvs', id]);
  // }

  // this method will link data to paginator
  linkListToPaginator() {
    // merge simply joins all this operators and creates an       //observable that listen to paginator page events
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        // creates an obserbable of sample data
        return of(this.dataSource.data);
      }))
      .subscribe(res => {
        const from = this.paginator.pageIndex * 10;
        const to = from + 10;
        this.dataSource.data = res.slice(from, to);
      });
  }
  }
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { WordlistService } from '../../editor/wordlist/wordlist.service';
import { Wordlist } from '../../editor/wordlist.model';
import { WordlistsService } from '../../editor/wordlists/wordlists.service';
import { findIndex, map, merge, mergeMap, Observable, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-word-list',
    standalone: true,
    imports: [AsyncPipe,JsonPipe,DatePipe],
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WordListComponent implements OnInit{
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly wordlistsService:WordlistsService = inject(WordlistsService)
  wordlist$!:Observable<Wordlist>;
 constructor() {
  
 }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.wordlist$ =this.route.paramMap.pipe(
    tap(params=>console.log(params.get('id'))),
    mergeMap(params => this.wordlistsService.getSnapshotChanges().pipe(
      map(wordlists=>wordlists[wordlists.findIndex(w=>w.id===params.get('id'))])
    )
    )
  )
 }
}
 



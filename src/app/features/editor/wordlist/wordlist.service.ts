import { Injectable } from '@angular/core';
import { FireStoreService } from '../../../core/services/firestore.service';
import { Wordlist } from './wordlist.model';


@Injectable({ providedIn: 'root' })
export class WordlistService extends FireStoreService<Wordlist> {
  constructor() {
    super('wordlists');
  }
}
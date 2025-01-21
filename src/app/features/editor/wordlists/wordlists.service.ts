import { Injectable } from '@angular/core';
import { Wordlist } from '../wordlist/wordlist.model';
import { FireStoreService } from '../../../core/services/firestore.service';

@Injectable({ providedIn: 'root' })
export class WordlistsService extends FireStoreService<Wordlist> {
  constructor() {
    super('wordlists');
  }
}

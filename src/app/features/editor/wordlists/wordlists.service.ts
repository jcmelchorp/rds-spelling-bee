import { Injectable } from '@angular/core';
import { Wordlist } from '../wordlist.model';
import { FireStoreService } from '../../../core/services/firestore.service';

@Injectable({ providedIn: 'root' })
export class WordlistsService extends FireStoreService<Wordlist> {
  constructor() {
    super('wordlists');
  }
}

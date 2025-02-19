import { Injectable } from '@angular/core';
import { Wordlist } from '../wordlist/wordlist.model';
import { FirebaseService } from '../../../core/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class WordlistsService extends FirebaseService<Wordlist> {
  constructor() {
    super('wordlists');
  }
}

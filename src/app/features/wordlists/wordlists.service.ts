import { Injectable } from '@angular/core';
import { Wordlist } from './wordlist.model';
import { FireStoreService } from '../../core/services/firestore.service';

export interface Todo {
  id?: string;
  name: string;
  isDone: boolean;
  createdTime: number;
}

@Injectable({ providedIn: 'root' })
export class WordlistsService extends FireStoreService<Wordlist> {
  constructor() {
    super('wordlists');
  }
}

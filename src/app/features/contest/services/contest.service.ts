import { inject, Injectable } from '@angular/core';
import { Word, Wordlist } from '../wordlist/wordlist.model';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  refEqual,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, map, timestamp } from 'rxjs';
import { User as AuthUser } from '../../../core/auth/models/user.model';
import { firebaseSerialize } from '../../../core/models/firebase.model';

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  private _firestore = inject(Firestore);
  protected readonly collectionName: string = 'users';

  collectionRef() {
    return collection(this._firestore, this.collectionName);
  }

  getById(uid: string, contestId: string) {
    // const docQuery= query(collection(this._firestore,this.collectionName,uid,'/contest'), where("id","==",contestId))
    const docRef = doc(this._firestore, this.collectionName, uid);
    // if (docSnap.exists()) {
    return from(
      getDoc(docRef).then((user) => {
        let contest: Wordlist = user.get('contests')[contestId];
        return contest as Wordlist;
      })
    );
  }

  saveWordlist(uid: string, contest: any) {
    const docRef = doc(this._firestore, this.collectionName, `${uid}`);
    return from(
      getDoc(docRef).then((user) => {
        let contests: Wordlist[] = user.get('contests');
        return updateDoc(docRef, {
          contests: {
            ...contests,
            [contest.id]: { ...contest, words: [], timestamp: Date.now() },
          },
        }).then(() => contest);
      })
    );
  }

  removeContest(uid: string, contestId: string) {
    const docRef = doc(this._firestore, this.collectionName, uid);
    return from(
      getDoc(docRef).then((user) => {
        let contest = user.get('contests')[contestId];
        contest.words=[];
        let contests= user.get('contests');
        contests[contest.id] = contest
        // console.log(contests)
        return updateDoc(docRef, {
          contests
        }).then(() => contest);
      })
    );
  }
  
  addWordContest(uid: string, contestId: string, word: Word) {
    const docRef = doc(this._firestore, this.collectionName, uid);
    return from(
      getDoc(docRef).then((user) => {
        let words= user.get('contests')[contestId].words;
        words.push(word);
        let contest = user.get('contests')[contestId];
        contest.words=words;
        let contests= user.get('contests');
        contests[contest.id] = contest
        // console.log(contests)
        return updateDoc(docRef, {
          contests
        })
      })
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { Wordlist } from '../wordlist/wordlist.model';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
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
        let contests = user.get('contests') as Wordlist[];
        if (contests.find(c=>c.id==contestId)) {
          return contests.filter((c) => c.id == contestId).pop() as Wordlist;
        } else {
          return {id:contestId,words:[]} as Wordlist
        }
      })
    );
    // }
    //  else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    //   return docSnap.data() as Wordlist

    // }
  }

  saveWord(uid: string, contest: Wordlist) {
    const docRef = doc(this._firestore, this.collectionName, uid);
    let contests:Wordlist[]=[];
    getDoc(docRef).then(user => {
      contests = user.get('contests') as Wordlist[];
      contests.push(contest)
    })
 return from(updateDoc(docRef, {contests}).then(()=>contest));
  }
}

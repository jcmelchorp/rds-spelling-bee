import { Injectable, inject } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Wordlist } from '../../features/editor/wordlist/wordlist.model';
import { collection, doc, getDoc, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export abstract class FireStoreService<T extends { id?: string }> {
  protected readonly firestore = inject(AngularFirestore);
  protected readonly collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  collection(queryFn?: QueryFn) {
    return this.firestore.collection<T>(this.collectionName, queryFn);
  }

  getSnapshotChanges(queryFn?: QueryFn) {
    return this.firestore
      .collection<T>(this.collectionName, queryFn)
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((d) => {
            const data: T = { id: d.payload.doc.id, ...d.payload.doc.data() };
            return data;
          })
        )
      );
  }

   async getById(id: string) {
    // const docQuery= query(collection(this.firestore.firestore,this.collectionName,id), where("id","==",id))
    const docRef = doc(this.firestore.firestore,this.collectionName,id);
    const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return of(docSnap.data() as T)
    // }
    //  else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    //   return docSnap.data() as Wordlist

    // }
   
  }

  add(data: T) {
    return from(this.firestore.collection<T>(this.collectionName).add(data));
  }

  update(data: T) {
    return from(
      this.firestore
        .collection<T>(this.collectionName)
        .doc(data.id)
        .update(data)
    );
  }

  delete(data: T) {
    return from(
      this.firestore.collection<T>(this.collectionName).doc(data.id).delete()
    );
  }
}

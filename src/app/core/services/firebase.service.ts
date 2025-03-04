import { inject, Inject } from '@angular/core';
import { from, map, Observable, take } from 'rxjs';
import {
  child,
  Database,
  push,
  ref,
  update,
  objectVal,
  listVal,
  remove,
  query,
  orderByChild,
  limitToFirst,
  equalTo,
  object,
} from '@angular/fire/database';
import { firebaseSerialize, IFirebase } from '../models/firebase.model';
export class FirebaseService<T> implements IFirebase<T> {
  protected readonly rtdb = inject(Database);
  public readonly tCollection: string;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string
  ) {
    this.tCollection = collectionName;
    if (!this.tCollection) {
      throw new Error('Firestore called with no collection name');
    }
  }
  add(entity: T): Observable<T> {
    const key: string = push(child(ref(this.rtdb), this.tCollection)).key!;
    const dbref = ref(this.rtdb, `/${this.tCollection}/${key}`);
    return from(update(dbref, firebaseSerialize(entity))).pipe(
      map((x) => firebaseSerialize(entity))
    );
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    const dbref = ref(this.rtdb, `/${this.tCollection}/${id}`);
    return from(update(dbref, firebaseSerialize({ ...entity }))).pipe(
      map((x) => firebaseSerialize(entity))
    );
  }
  getById(id: string): Observable<T> {
    const dbref = ref(this.rtdb, this.tCollection);
    return objectVal<T>(child(dbref, id)).pipe(take(1));
  }
  getByGrade(grade: string): Observable<T> {
    const dbref = ref(this.rtdb, this.tCollection);
    const queryRef = query(
      dbref,
      orderByChild('level'),
      limitToFirst(1),
      equalTo(grade)
    );
    return object(queryRef).pipe(
      take(1),
      map((x) => {
        const data:T = {
          id: Object.keys(x.snapshot.val()).pop(),
          ...Object.values(x.snapshot.val()).pop() as T,
        };
        return data;
      })
    );
  }
  delete(id: string): Observable<string> {
    const dbref = ref(this.rtdb, `/${this.tCollection}/${id}`);
    return from(remove(dbref)).pipe(
      take(1),
      map((_) => id)
    );
  }
  list(): Observable<T[]> {
    const dbref = ref(this.rtdb, this.tCollection);
    return listVal<T>(dbref).pipe(take(1));
  }
}

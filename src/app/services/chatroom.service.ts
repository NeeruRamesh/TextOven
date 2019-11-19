import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatrooms: Observable<any>;

  constructor(
    private db: AngularFirestore
  ) {
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }
}

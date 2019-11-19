import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatrooms: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.selectedChatroom = this.changeChatroom.switchMap(chatroomId => {
      if (chatroomId) {
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      }
      return Observable.of(null);
    });
    this.selectedChatroomMessages = this.changeChatroom.switchMap(chatroomId => {
      if (chatroomId) {
        return db.collection(`chatrooms/${chatroomId}/messages`).valueChanges();
      }
      return Observable.of(null);
    })
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }
}

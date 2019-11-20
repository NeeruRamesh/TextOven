import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {


  // replace dummData with Firebase data
  // public dummyData = [
  //   {
  //     message: 'Sed enim velit, condimentum nec tincidunt non, elementum sed nisi.',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Steve',
  //       lastName: 'Smith',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  //   {
  //     message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Bob',
  //       lastName: 'Anderson',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  //   {
  //     message: 'Ut eu elit sodales leo ultricies pulvinar. Fusce iaculis magna gravida tempus congue. Ut sit amet nulla sed nisi cursus mattis quis at lacus. Proin commodo, justo in elementum scelerisque, sem urna vulputate enim, ac posuere purus diam ac velit. Sed enim velit, condimentum nec tincidunt non, elementum sed nisi. Cras pharetra dui eu scelerisque pharetra. Curabitur auctor feugiat nibh eget molestie. Duis scelerisque auctor mi, sit amet efficitur magna vulputate quis. Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero. Praesent eu tristique felis. Nunc vestibulum enim et justo dignissim lacinia nec et diam.',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Sally',
  //       lastName: 'Jones',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  //   {
  //     message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Sally',
  //       lastName: 'Jones',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   }
  // ];


  @ViewChild('scrollContainer', { static: false }) private scrollContainer: ElementRef;

  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>;


  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
      })
    );
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
      })
    );
  }



  ngOnInit() {
    this.scrollToBottom();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {

    }
  }
}

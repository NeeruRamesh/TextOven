import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


//firetore
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Modules
import { AlertModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';


// Guards
import { AuthGuard } from './guards/auth.guard';

// Services
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { ChatroomService } from './services/chatroom.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthService,
    AuthGuard,
    ChatroomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
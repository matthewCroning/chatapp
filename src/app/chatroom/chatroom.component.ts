import { AuthService } from './../services/auth.service';
import { ChatroomService } from './../services/chatroom.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  @ViewChild('messageBox',  {static: false}) private messageBox: ElementRef;
  @HostListener('document:keypress', ['$event'])
  private _roomSub: Subscription;
  room;
  roomId;
  message;
  constructor(private ChatroomService: ChatroomService, private AuthService: AuthService) {
 
   }

  roomChangedHandler(roomId) {
    this.roomId = roomId;
    this.ChatroomService.getRoom(roomId);
    console.log(roomId);
    this.scrollToBottom();
  }

  sendMessage(room, message){
    if(this.room){
      console.log("room name: " + room);
      console.log("message: " + message);
      message = this.AuthService.getUsername() + " : " + message;
      this.ChatroomService.sendMessage(room, message);
      console.log("room: " + room);
      this.message = "";
    }
  }

  scrollToBottom(): void {
    try {
        this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.ChatroomService.getRooms();
    this._roomSub = this.ChatroomService.room.subscribe(data => {
     this.room = data;
     console.log("this.room data = " + data);
    });  
  }

  ngOnDestroy(){
    console.log("ngOnDestroy()");
    this._roomSub.unsubscribe();
  }


  

 
}

import { ChatroomService } from './../../services/chatroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  roomName;
  constructor(private ChatroomService: ChatroomService) {
 
  }

  ngOnInit() {
  }

  createRoom(roomName){
    console.log(roomName);
    this.ChatroomService.createRoom(roomName);
  }
}

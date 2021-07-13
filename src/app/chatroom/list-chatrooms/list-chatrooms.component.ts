import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatroomService } from '../../services/chatroom.service';

@Component({
  selector: 'app-list-chatrooms',
  templateUrl: './list-chatrooms.component.html',
  styleUrls: ['./list-chatrooms.component.scss']
})
export class ListChatroomsComponent implements OnInit {

  private _roomsSub: Subscription;
  rooms;
  @Input() roomSelected: String;
 
  @Output() roomChanged: EventEmitter<String> =   new EventEmitter();

  
  constructor(private ChatroomService: ChatroomService) {
 
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.ChatroomService.getRooms();
    this._roomsSub = this.ChatroomService.rooms.pipe(
      ).subscribe(data => this.rooms = data);
  }

  ngOnDestroy(){
    console.log("ngOnDestroy()");
    this._roomsSub.unsubscribe();
  }

  changeRoom(roomName){
    console.log("room changed on click in list chatrooms = " + roomName);
    this.roomSelected = roomName;
    this.roomChanged.emit(this.roomSelected);
  }
}

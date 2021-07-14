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
  filteredRooms;
  filterInput;
  buttonSelected;
  @Input() roomSelected: String;
 
  @Output() roomChanged: EventEmitter<String> =   new EventEmitter();

  
  constructor(private ChatroomService: ChatroomService) {
 
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.ChatroomService.getRooms();
    this._roomsSub = this.ChatroomService.rooms.pipe(
      ).subscribe(data => {
        this.rooms = data
        this.filterRooms("");
      });
  }

  ngOnDestroy(){
    console.log("ngOnDestroy()");
    this._roomsSub.unsubscribe();
  }

  filterRooms(filter){
    this.filteredRooms = this.rooms;
    this.filteredRooms = this.rooms.filter(s => s.includes(filter));
  }

  changeRoom(roomName){
    console.log("room changed on click in list chatrooms = " + roomName);
    this.roomSelected = roomName;
    this.roomChanged.emit(this.roomSelected);
  }

  onClick(event) {
    console.log("hello");
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    var value = idAttr.nodeValue;
    console.log(idAttr);
    if(this.buttonSelected != null){
      console.log("button was selected before")
      document.getElementById(this.buttonSelected).classList.remove("btn-primary")
      document.getElementById(this.buttonSelected).classList.add("btn-outline-primary")
    }
    document.getElementById(idAttr).classList.remove("btn-outline-primary")
    document.getElementById(idAttr).classList.add("btn-primary")
    
    this.buttonSelected = idAttr;
  }

}

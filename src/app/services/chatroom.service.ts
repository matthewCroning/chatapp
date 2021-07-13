import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  rooms = this.socket.fromEvent<any>('rooms');
  room = this.socket.fromEvent<any>('room');
  constructor(private socket: Socket) {

  }

  getRooms(){
    this.socket.emit('getRooms');  
  }

  getRoom(roomId){
    this.socket.emit('getRoom', {roomId: roomId});
  }

  createRoom(roomName){
    this.socket.emit('createRoom', {roomId: roomName});
  }

  sendMessage(roomName, message){
    this.socket.emit('sendMessage', {roomId: roomName, message: message});
  }

}

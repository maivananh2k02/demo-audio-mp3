import {Component} from '@angular/core';
import {Observable} from "rxjs";
import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  val = true;
  audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  files = [
    {
      name: 'con mua ngang qua',
      url: 'https://zingmp3.vn/bai-hat/Con-Mua-Ngang-Qua-Team-Son-Tung-M-TP-Slim-V-DJ-Trang-Moon-Son-Tung-M-TP/ZW706B8D.html',
    },
    {
      name: 'co don danh cho ai',
      url: 'https://firebasestorage.googleapis.com/v0/b/dung-bc677.appspot.com/o/audio%2F1630598115909?alt=media&token=45858d43-3b61-47d8-bb65-176451a089c7 '
    }
  ];

  currentTime: string = '00:00:00';
  duration: string = '00:00:00';
  seek = 0;
  value = 0;


  streamObserver(url: any) {
    return new Observable(observer => {

      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      const handler = (event: Event) => {
        console.log(event);
        this.value = this.audioObj.duration;
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);

      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });

  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(seek: any) {
    this.audioObj.currentTime = seek.target.value;
  }


  openFile(val: any) {
    this.streamObserver(val).subscribe(event => {

    });
    console.log(val)
    this.val = false;
  }

  play() {
    this.audioObj.play();
    this.val = false;
  }

  pause() {
    this.audioObj.pause();
    this.val = true;
  }

  setVolume(val: any) {
    this.audioObj.volume = val.target.value;
  }

  timeFormat(time: any, format = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  return() {

  }

  next() {
    // this.audioObj.next()
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  phone: string;
  email: string;
  github: string;

  constructor() { }

  ngOnInit(): void {
    this.phone = '+36 (70) 3318-405',
    this.email = 'orsolya.suto.so@gmail.com',
    this.github = 'sorsi'
  }

}

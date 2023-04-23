import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  title = 'Dashboard';
 
  constructor(private titleService:Title) {
  }
 
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}

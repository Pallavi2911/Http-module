import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.module';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.onCreateAndSharePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}

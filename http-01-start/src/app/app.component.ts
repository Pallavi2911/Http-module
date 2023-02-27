import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    //posts.json added at the end of firebase url is just firebase requirement
    //Angular HTTP client will take our JavaScript object postData here and automatically convert it to JSON data for us.
    //that requests are only sent when you subscribe.
    this.http
      .post(
        'https://ng-complete-guide-5f4b0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }
  private fetchPosts() {
    this.http
      .get(
        'https://ng-complete-guide-5f4b0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .pipe(
        //use of map operator to transform response data
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }
  onClearPosts() {
    // Send Http request
  }
}

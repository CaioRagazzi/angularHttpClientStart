import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content }

        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-9697c.firebaseio.com/posts.json',
                postData
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchPosts() {
        return this.http
            .get<{ [key: string]: Post }>('https://ng-complete-guide-9697c.firebaseio.com/posts.json')
            .pipe(map((response) => {
                const postArray: Post[] = []
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        postArray.push({ ...response[key], id: key });
                    }
                }
                return postArray;
            }))
    }
}
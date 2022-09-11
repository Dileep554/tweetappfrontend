import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from '../interfaces/tweet';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.css']
})
export class EditTweetComponent implements OnInit {


  // editSubmitted: boolean = false;
   currentUser: User;
  tweetList: Tweet[] = [];
  currentTweet: Tweet = {
    id: null,
    tweetName: null,
    postDate: null,
    likes: 0,
    user: null,
    replies: null,
    tweetTag: null,
  };
  editTweetForm: FormGroup;
  // addTagClicked: boolean = false;
  // currentRouteUsername: string;

  constructor(public editDialogRef:MatDialogRef<EditTweetComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Tweet,
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.currentUser = this.authService.getCurrentUser();
    this.editTweetForm = this.formBuilder.group({
      tweetBody: ['', [Validators.required, Validators.maxLength(144)]],
    });
  }

  onCloseClick(): void {
    this.editDialogRef.close();
  }

  save() {
    this.editDialogRef.close(this.editTweetForm.value);
  }
  get f() {
    return this.editTweetForm.controls;
  }
}

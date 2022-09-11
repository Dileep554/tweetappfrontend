import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  Form,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { Tweet } from '../interfaces/tweet';
import { Router } from '@angular/router';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.currentUser = this.authService.getCurrentUser();
    this.tweetService
      .getAllUsers()
      .subscribe((data: any) => (this.userList = data));
  }

  currentUser: User;
  userList: User[];
}

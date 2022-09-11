import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyTweetComponent } from './reply-tweet.component';

describe('ReplyTweetComponent', () => {
  let component: ReplyTweetComponent;
  let fixture: ComponentFixture<ReplyTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

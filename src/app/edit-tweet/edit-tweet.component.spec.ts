import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTweetComponent } from './edit-tweet.component';

describe('EditTweetComponent', () => {
  let component: EditTweetComponent;
  let fixture: ComponentFixture<EditTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

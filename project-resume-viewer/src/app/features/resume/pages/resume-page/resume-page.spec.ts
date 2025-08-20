import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePage } from './resume-page';

describe('ResumePage', () => {
  let component: ResumePage;
  let fixture: ComponentFixture<ResumePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

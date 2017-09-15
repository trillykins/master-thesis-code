import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingComponent } from './create-voting.component';

describe('CreateVotingComponent', () => {
  let component: CreateVotingComponent;
  let fixture: ComponentFixture<CreateVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

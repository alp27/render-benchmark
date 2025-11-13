import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTrackby } from './no-trackby';

describe('NoTrackby', () => {
  let component: NoTrackby;
  let fixture: ComponentFixture<NoTrackby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTrackby]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTrackby);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

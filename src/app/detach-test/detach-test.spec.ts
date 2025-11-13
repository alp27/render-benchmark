import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetachTest } from './detach-test';

describe('DetachTest', () => {
  let component: DetachTest;
  let fixture: ComponentFixture<DetachTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetachTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetachTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

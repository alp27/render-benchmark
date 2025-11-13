import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurePipeTest } from './pure-pipe-test';

describe('PurePipeTest', () => {
  let component: PurePipeTest;
  let fixture: ComponentFixture<PurePipeTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurePipeTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurePipeTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTest } from './lazy-test';

describe('LazyTest', () => {
  let component: LazyTest;
  let fixture: ComponentFixture<LazyTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

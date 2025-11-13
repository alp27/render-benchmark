import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyOne } from './lazy-one';

describe('LazyOne', () => {
  let component: LazyOne;
  let fixture: ComponentFixture<LazyOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

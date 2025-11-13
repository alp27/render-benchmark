import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTwo } from './lazy-two';

describe('LazyTwo', () => {
  let component: LazyTwo;
  let fixture: ComponentFixture<LazyTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

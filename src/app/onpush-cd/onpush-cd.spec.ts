import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnpushCd } from './onpush-cd';

describe('OnpushCd', () => {
  let component: OnpushCd;
  let fixture: ComponentFixture<OnpushCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnpushCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnpushCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

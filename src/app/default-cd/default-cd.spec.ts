import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCd } from './default-cd';

describe('DefaultCd', () => {
  let component: DefaultCd;
  let fixture: ComponentFixture<DefaultCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pastorders } from './pastorders';

describe('Pastorders', () => {
  let component: Pastorders;
  let fixture: ComponentFixture<Pastorders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pastorders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pastorders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

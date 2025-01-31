import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GregorianCalendarComponent } from './gregorian-calendar.component';

describe('GregorianCalendarComponent', () => {
  let component: GregorianCalendarComponent;
  let fixture: ComponentFixture<GregorianCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GregorianCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GregorianCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

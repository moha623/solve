import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReturns } from './order-returns';

describe('OrderReturns', () => {
  let component: OrderReturns;
  let fixture: ComponentFixture<OrderReturns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReturns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReturns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

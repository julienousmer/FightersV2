import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFighterComponent } from './detail-fighter.component';

describe('DetailFighterComponent', () => {
  let component: DetailFighterComponent;
  let fixture: ComponentFixture<DetailFighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFighterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

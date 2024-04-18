import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterEditComponent } from './fighter-edit.component';

describe('FighterEditComponent', () => {
  let component: FighterEditComponent;
  let fixture: ComponentFixture<FighterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FighterEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFighterComponent } from './edit-fighter.component';

describe('FighterDetailsComponent', () => {
  let component: EditFighterComponent;
  let fixture: ComponentFixture<EditFighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFighterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

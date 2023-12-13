import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Fighter} from "../fighter.model";
import {Category} from "../../category/category.model";

@Component({
  selector: 'app-fighter-details',
  templateUrl: './fighter-details.component.html',
  styleUrls: ['./fighter-details.component.scss']
})
export class FighterDetailsComponent {

  @Input()
  model: Fighter | undefined | null;
  @Output()
  emitFighter: EventEmitter<Fighter> = new EventEmitter<Fighter>();

  fighterForm = this.fb.group({
    firstName: [''],
    name: [''],
    age: [0],
    weight: [0],
    height: [0],
    reach: [0],
    nbWin: [0],
    nbLose: [0],
    sexe: [''],
    category: [null]
  })

  ngOnInit() {

    if (this.model === null) {
      this.model = new Fighter(1, '', '', 0, 0, 0, 0, 0, 0, '', null);
    } else {
      // @ts-ignore
      this.fighterForm.patchValue(this.model!);
    }
  }

  constructor(private fb: FormBuilder) {
  }
}

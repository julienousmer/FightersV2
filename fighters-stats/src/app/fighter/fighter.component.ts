import {Component, OnInit} from '@angular/core';
import {Fighter} from "./fighter.model";
import {FighterService} from "./fighter.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class FighterComponent implements OnInit {

  fightersList: Array<Fighter> | undefined;
  currentFighter: Fighter | null | undefined;

  ngOnInit() {
    this.fighterService.getAllFighters().subscribe(resFighters => {
      this.fightersList = resFighters
    })
  }

  constructor(private fighterService: FighterService) {
  }


  setCurrentFighter(fighter: Fighter) {
    this.currentFighter = null;
    setTimeout(() => {
      this.currentFighter = fighter;
    }, 10)
  }

}

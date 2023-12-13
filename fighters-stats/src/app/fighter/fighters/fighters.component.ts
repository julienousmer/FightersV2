import {Component, OnInit} from '@angular/core';
import {FightersService} from "./fighters.service";
import {Fighter} from "../../models/fighter";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fightersList: Array<Fighter> | undefined;
  currentFighter!: Fighter | null;

  ngOnInit() {
    this.fighterService.getAllFighters().subscribe(resFighters => {
      this.fightersList = resFighters
    })
  }

  constructor(private fighterService: FightersService) {
  }


  setCurrentFighter(fighter: Fighter) {
    this.currentFighter = null;
    setTimeout(() => {
      this.currentFighter = fighter;
    }, 10)
  }

}

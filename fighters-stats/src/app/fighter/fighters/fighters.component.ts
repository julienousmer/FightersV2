import {Component, OnInit} from '@angular/core';
import {FightersService} from "./fighters.service";
import {Fighter} from "../../models/fighter";
import {WeightCategory, WeightCategoryUtil} from "../../enums/weightCategory";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fightersList: Array<Fighter> | undefined;

  ngOnInit() {
    console.log(WeightCategoryUtil.parse(WeightCategoryUtil.toString(WeightCategory.Featherweight)));
    this.fighterService.getAllFighters().subscribe(resFighters => {
      this.fightersList = resFighters
    })
  }

  constructor(private fighterService: FightersService) {
  }

}

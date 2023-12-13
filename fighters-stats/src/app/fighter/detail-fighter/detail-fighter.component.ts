import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FightersService} from "../../fighters/fighters.service";
import {Fighter} from "../../models/fighter";

@Component({
  selector: 'app-detail-fighter',
  templateUrl: './detail-fighter.component.html',
  styleUrls: ['./detail-fighter.component.scss']
})
export class DetailFighterComponent implements OnInit{

  @Input()
  fighter!: Fighter | undefined;

  constructor(
    private route: ActivatedRoute,
    private fightersService: FightersService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')){
        let idFighter = params.get('id');
        if (idFighter != null){
          this.fightersService.getById(parseInt(idFighter)).subscribe(resFighter => {
            console.log(resFighter);
            this.fighter = resFighter;
          })
        }
      }
    })
  }

}

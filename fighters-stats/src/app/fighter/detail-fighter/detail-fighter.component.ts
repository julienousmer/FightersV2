import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FightersService} from "../fighters/fighters.service";
import {Fighter} from "@models/shared";
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-detail-fighter',
  templateUrl: './detail-fighter.component.html',
  styleUrls: ['./detail-fighter.component.scss']
})
export class DetailFighterComponent implements OnInit{

  @Input()
  fighter!: Fighter | undefined;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fightersService: FightersService,
    private adminService: AdminService
  ) {
  }

  ngOnInit() {
    if (this.adminService.get_auth()){
      this.isEdit = true
    }
    this.route.paramMap.subscribe(params => {
      if (params.has('id')){
        let idFighter = params.get('id');
        if (idFighter != null){
          this.fightersService.getById(parseInt(idFighter)).subscribe(resFighter => {
            this.fighter = resFighter;
          })
        }
      }
    })
  }

}

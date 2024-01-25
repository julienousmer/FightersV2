import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IFighter} from "@models/shared";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-detail-fighter',
  templateUrl: './detail-fighter.component.html',
  styleUrls: ['./detail-fighter.component.scss']
})
export class DetailFighterComponent implements OnInit {

  @Input()
  fighter!: IFighter | undefined;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isEdit = true;
      this.http.put<IFighter>('http://localhost:3000/fighters/' + this.route.snapshot.params['id'], this.fighter).subscribe(data => {
        this.fighter = data;
      });

    } else {
      this.isEdit = false;
      this.http.get<IFighter>('http://localhost:3000/fighters/' + this.route.snapshot.params['id']).subscribe(data => {
        this.fighter = data;
      });
    }
  }

}

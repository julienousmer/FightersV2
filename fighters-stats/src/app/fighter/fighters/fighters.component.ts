import {Component, OnInit} from '@angular/core';
import {IFighter} from "@models/shared";
import {WeightCategory, WeightCategoryUtil} from "@models/shared";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fightersList: Array<IFighter> | undefined;

  ngOnInit() {
    this.http.get<Array<IFighter>>('http://localhost:3000/fighters').subscribe(data => {
      this.fightersList = data;
    });
  }

  constructor(private http: HttpClient) {
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFighter} from "@models/shared";
import {WeightCategory, WeightCategoryUtil} from "@models/shared";
import {HttpClient} from "@angular/common/http";
import {OnlineStatusService} from "../../../online-status.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {Dexie, liveQuery} from "dexie";
import {db} from "../../../indexed.db";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit, OnDestroy {

  fightersList: Array<IFighter> | undefined;
  fighterSubscribe!: Subscription;
  isOnline : boolean = true;

  ngOnInit() {
    this.http.get<Array<IFighter>>('http://localhost:3000/fighters').subscribe(data => {
      this.fightersList = data;
    });

    if (!this.fighterSubscribe){
      this.fighterSubscribe = this.onlineStatusService.connectionChanged.subscribe(isOnline => {
        if (isOnline) {this.sendItemsFromIndexedDb();this.isOnline=true;} else {this.isOnline=false;}
      })
    }
  }

  ngOnDestroy() {
    if(this.fighterSubscribe){
      this.fighterSubscribe.unsubscribe();
    }
  }

  constructor(private http: HttpClient, private onlineStatusService: OnlineStatusService) {


  }
  async listAllFighters(): Promise<Array<IFighter>> {
    return db.fighters
      .where({})
      .toArray();
  }

  async addFighter(fighter : IFighter){
    await db.fighters.add({...fighter});
  }

  private async sendItemsFromIndexedDb() {
    const allFighters : IFighter[] = await db.fighters.toArray();

    allFighters.forEach((item: IFighter) => {
      this.http.post("http://localhost:3000/fighters", JSON.stringify(item)).subscribe(() => {
        db.fighters.delete(item.id).then(() => {
          console.log(`Item deleted`);
        })
      });
    })
  }
}

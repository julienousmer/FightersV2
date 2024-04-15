import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFighter} from "@models/shared";
import {HttpClient} from "@angular/common/http";
import {OnlineStatusService} from "../../../online-status.service";
import {Subscription} from "rxjs";
import {db} from "../../../indexed.db";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit, OnDestroy {

  fightersForm: FormGroup = this.fb.group({fighters: this.fb.array([])});
  fightersList: Array<IFighter> | undefined;
  fighterSubscribe!: Subscription;
  isOnline: boolean = true;
  isLoaded: boolean = false;

  constructor(
    private http: HttpClient,
    private onlineStatusService: OnlineStatusService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (!this.fighterSubscribe) {
      this.fighterSubscribe = this.onlineStatusService.connectionChanged.subscribe(isOnline => {
        if (isOnline) {
          this.sendItemsFromIndexedDb().then(r => {
            console.log('online');
            this.isOnline = true;
          });
        } else {
          console.log('offline');
          this.isOnline = false;
        }
      })
    }

    this.http.get<Array<IFighter>>('http://localhost:3000/fighters').subscribe(data => {
      for (const fighter of data) {
        this.addFighterForm(fighter).then(r => console.log(r));
        this.isLoaded = true;
      }
      this.fightersList = data;
    });
  }

  ngOnDestroy() {
    if (this.fighterSubscribe) {
      this.fighterSubscribe.unsubscribe();
    }
  }

  async listAllFighters(): Promise<Array<IFighter>> {
    return db.fighters
      .where({})
      .toArray();
  }

  async addFighterToIndexedDb(fighter: IFighter) {
    await db.fighters.add({...fighter});
  }

  private async sendItemsFromIndexedDb() {
    const allFighters: IFighter[] = await db.fighters.toArray();

    allFighters.forEach((item: IFighter) => {
      this.http.post("http://localhost:3000/fighters", JSON.stringify(item)).subscribe(() => {
        db.fighters.delete(item.id).then(() => {
          console.log(`Item ${item.id} sent and deleted locally`);
        })
      });
    })
  }

  myFighterForm() {
    return (this.fightersForm.get('fighters')! as FormArray);
  }

  async addFighterForm(fighter: IFighter) {
    if (fighter) {
      const fighterForm = this.fb.group(
        {
          id: [fighter.id],
          firstname: [
            fighter.firstname,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(25),
            ],
          ],
          lastname: [
            fighter.lastname,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
            ],
          ],
          age: [
            fighter.age,
            [
              Validators.required,
              Validators.min(16),
              Validators.max(55),
            ],
          ],
          weight: [
            fighter.weight,
            [
              Validators.required,
              Validators.min(45),
              Validators.max(160),
            ],
          ],
          height: [
            fighter.height,
            [
              Validators.required,
              Validators.min(45),
              Validators.max(250),
            ],
          ],
          reach: [
            fighter.reach,
            [
              Validators.required,
              Validators.min(20),
              Validators.max(150),
            ],
          ],
          nbWin: [
            fighter.nbWin,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(100),
            ],
          ],
          nbLose: [
            fighter.nbLose,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(100),
            ],
          ],
          sexe: [
            fighter.sexe,
            [Validators.required],
          ],
          category: [fighter.category],
        }
      );
      this.myFighterForm().push(fighterForm);
    }
  }

  deleteFighterForm(fighterIndex: number) {
    this.myFighterForm().removeAt(fighterIndex);
  }

  addFighterFormLine() {
    
  }
}

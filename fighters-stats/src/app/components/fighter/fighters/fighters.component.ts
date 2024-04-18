import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFighter} from "@models/shared";
import {HttpClient} from "@angular/common/http";
import {OnlineStatusService} from "../../../services/online-status.service";
import {Subscription} from "rxjs";
import {db} from "../../../../config/indexed.db";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FighterService} from "../../../services/fighter.service";

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit, OnDestroy {

  fightersForm: FormGroup = this.fb.group({fighters: this.fb.array([])});
  fightersList!: Array<IFighter>;
  fighterSubscribe!: Subscription;
  onlineStatusSubscribe!: Subscription;
  isOnline: boolean = true;
  isLoaded: boolean = false;
  isEditing: boolean = false;
  editingFighter!: IFighter;

  constructor(
    private http: HttpClient,
    private onlineStatusService: OnlineStatusService,
    private fb: FormBuilder,
    private fighterService: FighterService,
  ) {
  }

  ngOnInit() {
    this.loadFighters();
    this.monitorConnectionStatus();
  }

  ngOnDestroy() {
    if (this.fighterSubscribe) {
      this.fighterSubscribe.unsubscribe();
    }
    if (this.onlineStatusSubscribe) {
      this.onlineStatusSubscribe.unsubscribe();
    }
  }

  loadFighters() {
    this.fighterSubscribe = this.fighterService.getFighters().subscribe({
      next: fighters => {
        this.fightersList = fighters;
        this.fightersList.forEach(fighter => this.addFighterForm(fighter));
        this.isLoaded = true
      },
      error: err => console.error(err)
    });
  }

  monitorConnectionStatus() {
    this.onlineStatusSubscribe = this.onlineStatusService.connectionChanged.subscribe({
      next: isOnline => {
        this.isOnline = isOnline;
        if (isOnline) {
          this.sendItemsFromIndexedDb().then(() => console.log('Connected, data send to database'));
        }
      },
      error: err => console.error(err)
    });
  }

  private async sendItemsFromIndexedDb() {
    const allFighters: IFighter[] = await db.fighters.toArray();

    allFighters.forEach((item: IFighter) => {
      this.fighterService.createFighter(item).subscribe({
        next: () => {
          db.fighters.delete(item.id);
          console.log(`Item ${item.id} sent and deleted locally`)
        },
        error: err => console.error(err)
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

  addNewFighterForm() {
    const newFighter = this.fb.group(
      {
        id: null,
        firstname: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        lastname: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        age: [99],
        weight: [
          null,
          [
            Validators.required,
            Validators.min(45),
            Validators.max(160),
          ],
        ],
        height: [
          null,
          [
            Validators.required,
            Validators.min(45),
            Validators.max(250),
          ],
        ],
        reach: [999],
        nbWin: [
          null,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
          ],
        ],
        nbLose: [
          null,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
          ],
        ],
        sexe: [
          'N',
        ],
        category: [null],
      }
    );
    this.myFighterForm().push(newFighter);
  }

  saveAllFighter() {
    const formFighters = this.myFighterForm().controls;

    formFighters.forEach(formFighter => {
      const formFighterData = formFighter.value;
      if (formFighterData.id) {
        this.fighterService.updateFighter(formFighterData.id, formFighterData).subscribe({
          next: (response) => console.log('Fighter updated', response),
          error: (error) => console.error('Error updating fighter', error)
      });
      } else {
        this.fighterService.createFighter(formFighterData).subscribe({
            next: (response) => console.log('Fighter added', response),
            error: (error) => console.error('Error adding fighter', error)
        });
      }
    });
  }

  editFighter(fighter: IFighter) {
    this.editingFighter = fighter;
    this.isEditing = true;
  }

  onFighterUpdated(fighter: IFighter) {
    const indexFighter = this.fightersList.findIndex(f => f.id == fighter.id);
    if (indexFighter !== -1) {
      this.fightersList[indexFighter] = fighter;
    } else {
      this.fightersList.push(fighter);
    }
    this.fightersForm = this.fb.group({fighters: this.fb.array([])});
    this.fightersList.forEach(fighter => this.addFighterForm(fighter));
    this.saveAllFighter();
    this.isEditing = false;
  }

  deleteFighter(fighter: IFighter) {
    this.fighterService.deleteFighter(fighter.id.toString()).subscribe({
      next: () => {
        this.isLoaded = false;
        this.fightersForm = this.fb.group({fighters: this.fb.array([])});
        this.loadFighters();
      },
      error: err => console.error(err)
    });
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { IFighter } from "@models/shared";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-edit-fighter',
  templateUrl: './edit-fighter.component.html',
  styleUrls: ['./edit-fighter.component.scss']
})
export class EditFighterComponent implements OnInit{

  @Input()
  model!: IFighter;
  @Input()
  isEdit!: boolean;
  @Output()
  emitFighter: EventEmitter<IFighter> = new EventEmitter<IFighter>();

  fighterForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    age: [0],
    weight: [0],
    height: [0],
    reach: [0],
    nbWin: [0],
    nbLose: [0],
    sexe: [''],
    category: [null]
  })

  ngOnInit() {
    console.log(this.model);
    console.log(this.isEdit);
    this.isEdit = this.isReadOnly();
    if (this.model === null) {
      this.model = {
        id: 1,
        firstname: "firstname1",
        lastname: "lastname1",
        age: 21,
        weight: 21,
        height: 21,
        reach: 21,
        nbWin: 21,
        nbLose: 21,
        sexe: 'M',
        category: null,
      }
    } else {
      // @ts-ignore
      this.fighterForm.patchValue(this.model!);
    }

  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {
  }

  isReadOnly(): boolean {
    return this.isEdit;
  }

  public toggleEdit(): Promise<boolean> | boolean{
    if (this.authService.isLoggedIn()){
      this.isEdit = true;
      return true;
    }else {
      return this.router.navigate(["/auth/login"], {
        queryParams: {
          redirectTo: this.model?.id
        }
      })
    }
  }
}

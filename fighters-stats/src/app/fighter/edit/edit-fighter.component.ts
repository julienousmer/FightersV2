import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { Fighter } from "@models/shared";
import {UserService} from "../../admin/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-fighter',
  templateUrl: './edit-fighter.component.html',
  styleUrls: ['./edit-fighter.component.scss']
})
export class EditFighterComponent {

  @Input()
  model: Fighter | undefined | null;
  @Input()
  isEdit!: boolean;
  @Output()
  emitFighter: EventEmitter<Fighter> = new EventEmitter<Fighter>();

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
    this.isEdit = this.isReadOnly
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
    private adminService: UserService
  ) {
  }

  get isReadOnly(): boolean {
    return this.isEdit;
  }

  public toggleEdit(): Promise<boolean> | boolean{
    if (this.adminService.get_auth()){
      this.isEdit = true;
      return true;
    }else {
      return this.router.navigate(["/admin/login"], {
        queryParams: {
          redirectTo: this.model?.id
        }
      })
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFighter} from "@models/shared";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-fighter-edit',
  templateUrl: './fighter-edit.component.html',
  styleUrls: ['./fighter-edit.component.scss']
})
export class FighterEditComponent implements OnInit{

  @Input() fighter!: IFighter;
  @Output() fighterUpdated: EventEmitter<IFighter> = new EventEmitter<IFighter>();
  fighterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    this.fighterForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      age: [
        0,
        [
          Validators.required,
          Validators.min(16),
          Validators.max(55),
        ]
      ],
      weight: [
        0,
        [
          Validators.required,
          Validators.min(45),
          Validators.max(160),
        ],
      ],
      height: [
        0,
        [
          Validators.required,
          Validators.min(45),
          Validators.max(250),
        ],
      ],
      reach: [
        0,
        [
          Validators.required,
          Validators.min(20),
          Validators.max(150),
        ]
      ],
      nbWin: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      nbLose: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      sexe: [
        '',
        [Validators.required]
      ],
      category: ['']
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/auth/login"]).then(() => {});
    }
    if (this.fighter) {
      this.fighterForm.patchValue(this.fighter);
    }
  }

  save(): void {
    if (this.fighterForm.valid) {
      const updateFighter = {...this.fighter, ...this.fighterForm.value};
      this.fighterUpdated.emit(updateFighter);
      this.router.navigate(["/fighter/list"]).then(() => {});
    }
  }

}

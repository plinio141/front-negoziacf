import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../models/User.interface';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  formValidator: FormGroup;
  phoneTypes = [
    { name: 'home', value: 1 },
    { name: 'Cel', value: 2 },
    { name: 'Work', value: 3 },
    { name: 'Other', value: 4 }
  ];

  genders = [
    { name: 'M', value: 1 },
    { name: 'F', value: 2 },
  ]

  constructor(
    public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formValidator = this.fb.group({
      firstName: [this.data.firstName, [Validators.required]],
      lastName: [this.data.lastName, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      phone: [this.data.phone, [Validators.required]],
      phoneType: [this.data.phoneType, [Validators.required]],
      sex: [this.data.sex, [Validators.required]]
    });
  }

  submit() {
    if (this.data._id) {
      this.userService.editUser(this.formValidator.value, this.data._id)
        .subscribe(data => {
          this.dialogRef.close();
        });
    } else {
      this.userService.saveUser(this.formValidator.value)
        .subscribe(data => {
          this.dialogRef.close();
        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../models/User.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';
import { UserService } from '../services/user.service';


const ELEMENT_DATA: IUser[] = [];

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

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

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'phoneType', 'sex', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog, private userService: UserService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  addUser() {
    const user: IUser = {
      firstName: '',
      lastName: '',
      email: '',
      phone: null,
      phoneType: null,
      sex: null
    }
    this.openDialog(user);
  }

  getPhoneType(user: IUser) {
    return this.phoneTypes.find(p => p.value === user.phoneType).name;
  }

  getGender(user: IUser) {
    return this.genders.find(p => p.value === user.sex).name;
  }

  editUser(user: IUser) {
    this.openDialog(user);
  }

  openDialog(user: IUser) {
    const dialogRef = this.dialog.open(FormUserComponent, {data: user});
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

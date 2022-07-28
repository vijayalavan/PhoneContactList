import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  data: any;
  userData: boolean = true;
  addUserForm: FormGroup | any;
  employees :any=[]
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this._formBuilder.group({
      id: [null],
      first_name: [null],
      last_name: [null],
      phoneNumber: [null],
      email: [null],
    });
  }

  view(user: any) {
    this.router.navigate(['/view'], { queryParams: { data: JSON.stringify(user) }, });
  }

  edit(user: any) {
    this.userData = false;
    this.addUserForm.patchValue({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phoneNumber: user.phoneNumber,
      email: user.email,
    })
  }

  delete(i: any) {
    this.employees.splice(i, 1);
  }

  add() {
    this.addUserForm.reset();
    this.userData = false;
  }

  onSubmit() {
    let reqJson: any = { ...this.addUserForm.value }
    if (reqJson?.id) {
      this.employees?.map((item: any) => {
        if (item.id === reqJson.id) {
          item.first_name = reqJson.first_name
          item.last_name = reqJson.last_name
          item.email = reqJson.email
          item.phoneNumber = reqJson.phoneNumber
        }
      })
      this.userData = true;
    } else {
      var lastArray: any = _.last(this.employees);
      reqJson.id = lastArray ? (lastArray.id + 1) : 1;
      this.employees?.push(reqJson);
      this.userData = true;
    }
  }

  back() {
    this.userData = true;
  }

}

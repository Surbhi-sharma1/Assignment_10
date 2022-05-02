import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HTTPServiceRequest } from '../httpRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { EdituserComponent } from '../edituser/edituser.component';
type User = {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  role: number;
  address: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [HTTPServiceRequest]
 
})
export class TableComponent implements OnInit {
  editable = false;
  editableRowId = -1;

  users: any = [];
  enableEdit!: boolean;
  enableEditIndex: any;
  showTable!: boolean;
  customer: any = [];
  role: any = [];

  constructor(private httpRequestService: HTTPServiceRequest, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.getUsers();
    this.getCustomerList();
  }

  getCustomerList() {
    this.httpRequestService.getCustomer().subscribe(Response => {
      this.customer = Response;
    })

  }
  getUsers() {
    this.httpRequestService.get().subscribe(Response => {
      this.users = Response;
    })
  }

  Update(user: User) {
    this.users.user = user;
    this.router.navigate(['/editUser/', user.id]);
  }

  onDelete(id: any) {
    this.httpRequestService.onDelete(id).subscribe(Response => {
      for (let i = 0; i < this.users.length; ++i) {
        if (this.users[i].id === id) {
          this.users.splice(i, 1);
        }
      }
    })
  }

}



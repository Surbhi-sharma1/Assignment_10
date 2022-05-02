import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HTTPServiceRequest } from '../httpRequestService';
import { User } from '../userModel';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  userData: any = [];
  user!: User;
  id!: string;
  data: any = [];
  role: any = [];

  editForm!: FormGroup;
  customerList: any = [];
  editable: boolean = false;
  constructor(private router: Router, protected readonly route: ActivatedRoute, private fb: FormBuilder, private httpRequestService: HTTPServiceRequest) {
    this.httpRequestService.get().subscribe(Response => {
      this.userData = Response;
    }
    )
  }
  ngOnInit() {
    this.httpRequestService.getCustomer().subscribe(Response => {
      this.customerList = Response;
    });
    this.httpRequestService.getRoleList().subscribe(Response => {
      this.role = Response;
    });


    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.editForm = this.fb.group({
      customerid: [],
      id: [],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      middlename: [''],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      role: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      address: ['', [Validators.required]]

    })

    this.httpRequestService.getUserId(parseInt(this.id)).subscribe(value => {

      if (value) {
        this.data = value[0];
        Object.keys(this.data).forEach((Key) => {
          this.editForm.patchValue({ [Key]: this.data[Key] });
        });

      }
    })
  }

  showDetails(user: any) {
    this.editForm.patchValue(user)
  }

  onSubmit() {
    this.httpRequestService.updateUser(this.editForm.value).subscribe((response) => {
      this.data = response;
      this.router.navigate(['/']);
    }
    )
  }
  cancelChanges() {
    this.httpRequestService.getUserId(parseInt(this.id)).subscribe(data => {
      this.editForm.patchValue(data)
    });
    this.router.navigate(['showUsers']);
  }
}

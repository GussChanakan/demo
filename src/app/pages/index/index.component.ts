import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {

    dataUser:any = []
    Dialog: boolean = false

    addStatus: boolean = false
    deleteStatus: boolean = false

    ngOnInit() {
        this.getAll()
        this.CreateForm()
    }

    constructor(
        private ApiService : ApiService,
        private FormBuilder : FormBuilder,
        // private ConfirmationService : ConfirmationService
    ) {}

    getAll() {
        this.ApiService.GetAllUser().subscribe({
            next:(res) => {
                this.dataUser = res
                console.log(this.dataUser)
            },
            error:(err) => {
                console.log(err)
            },
            complete() {},
        })
    }

    openAddDialog() {
        this.FormData.reset()
        this.Dialog = true
        this.addStatus = true
    }

    openEditDialog(item) {
        if(!this.deleteStatus) {
            this.Dialog = true
            this.addStatus = false
            this.getUserById(item)
        }
    }

    save(formValue) {
        console.log(formValue.value)
        let data = formValue.value
        this.ApiService.create(data).subscribe({
            next: (res) => {
                console.log(res)
                this.FormData.reset()
                this.Dialog = false

            },
            error: (err: Error) => {
                console.log(err)
            },
            complete: () => {
                this.getAll()
            },
        })
    }

    getUserById(item) {
        let id = item.id
        console.log(id)
        this.ApiService.GetUserById(id).subscribe({
            next:(res) => {
                console.log(res);
                let data = res['user'];

                let h = this.FormData.controls;
                h['id'].setValue(data['id']);
                h['fname'].setValue(data['fname']);
                h['lname'].setValue(data['lname']);
                h['username'].setValue(data['username']);
                h['password'].setValue(data['password']);
                h['email'].setValue(data['email']);
                h['avatar'].setValue(data['avatar']);
            },
            error:(err) => {
                console.log(err)
            },
            complete() {},
        })
    }

    update(formValue) {
        console.log(formValue.value)
        let data = formValue.value
        this.ApiService.update(data).subscribe({
            next: (res) => {
                console.log(res)
                this.FormData.reset()
                this.Dialog = false
            },
            error: (err: Error) => {
                console.log(err)
            },
            complete: () => {
                this.getAll()
            },
        })
    }

    deleteUser(item) {
        this.deleteStatus = true
        console.log(item)
        let Body ={
                body: {
                'id': item.id
            },
        }
        console.log(Body)
        this.ApiService.deleteUser(Body).subscribe({
            next: (res) => {
                console.log(res)
            },
            error: (err: Error) => {
                console.log(err)
            },
            complete: () => {
                this.deleteStatus = false
                this.getAll()
            },
        })   
    }

    FormData : FormGroup
    get h() { 
        return this.FormData.controls;
    }

    CreateForm() {
        this.FormData = this.FormBuilder.group ({
            id: new FormControl(),
            fname: new FormControl(),
            lname: new FormControl(),
            username: new FormControl(),
            password: new FormControl(),
            email: new FormControl(),
            avatar: new FormControl(),
        })
    }
}

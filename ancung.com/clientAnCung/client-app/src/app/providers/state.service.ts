import { UserService } from './user.service';
import { IUser } from './../models/IUser';
import { IQuan } from './../models/IQuan';
import { QuanAnService } from './quan-an.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class StatesService {
    private quan: BehaviorSubject<IQuan[]> = new BehaviorSubject(new Array());
    private user: BehaviorSubject<IUser[]> = new BehaviorSubject(new Array());
    get QuanAn() {
        return this.quan.asObservable();
    }
    get User() {
        return this.user.asObservable();
    }
    constructor(private quanansv: QuanAnService, private usersv: UserService) { }
    // thay doi
    getAll() {
        const sinhviens = this.quanansv.getAllRestaurents().subscribe(data => {
            this.quan.next(data);
        });
    }
    // getAll() {
    //     return this.quanansv.getAllRestaurents().subscribe(data => {
    //         return data;
    //     });
    // }    
    find(keyword: string) {
        this.quanansv.searchRestaurent(keyword).subscribe(results => {
            this.quan.next(results);
        });
    }
    getAllUser() {
        const users = this.usersv.getAllUser().subscribe(data => {
            this.user.next(data);
        });
    }
}

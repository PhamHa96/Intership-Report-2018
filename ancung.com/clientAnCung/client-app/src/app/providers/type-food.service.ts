import { map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ItypeFood } from '../models/ITypeFood';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TypeFoodService {
  private _dataTypeFood: BehaviorSubject<ItypeFood[]> = new BehaviorSubject(new Array());
  private urlGetTypeFood = 'http://localhost:3000/api/typefood';
  constructor(
    private http: Http, private token: TokenService
  ) { }
  private tokenGet = this.token.getToken();
  get getAllType() {
    return this._dataTypeFood.asObservable();
  }

  getDataTypeFood(): Promise<any> {
    return this.http.get(this.urlGetTypeFood).toPromise().then(response => {
      this._dataTypeFood.next(response.json());
      return response.json();
    }).catch(err => console.log('loi lay url get'));
  }
  // cach 2
  getAllTypeFood(): Observable<ItypeFood[]> {
    return this.http.get(this.urlGetTypeFood).map(data => {
      // console.log(data.json());
      return data.json() as ItypeFood[];
    });
  }
  getTypeFoodByID(id: String): Observable<ItypeFood> {
    return this.getAllTypeFood().map(type => {
      return type.find(t => {
        return t._id === id;
      });
    });
  }
  addNewTypeFood(name) {
    return this.http.post(this.urlGetTypeFood, { name: name }, this.tokenGet).pipe(map(res => {
      // console.log(res, 'res tra ve cua party in service');
      return res.json();
    }));
  }
  deleteTypeFood(id) {
    return this.http.delete(this.urlGetTypeFood + '/' + id, this.tokenGet).pipe(map(res => {
      return res.json();
    }));
  }
  updateTypeFood(id, name): Observable<any> {
    return this.http.put(this.urlGetTypeFood + '/' + id, name, this.tokenGet);
  }
}

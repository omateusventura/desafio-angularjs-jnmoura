import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll() {
    return this.httpClient.get(environment.apiUrl);
  }

  public findById(peopleId: number) {
    return this.httpClient.get(`${environment.apiUrl}/${peopleId}`);
  }

  public add(people: any) {
    return this.httpClient.post(environment.apiUrl, people);
  }

  public update(people: any, peopleId: number) {
    return this.httpClient.put(`${environment.apiUrl}/${peopleId}`, people);
  }
  public delete(peopleId: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${peopleId}`);
  }
}

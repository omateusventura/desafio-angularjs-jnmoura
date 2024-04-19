import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiUrl = 'http://localhost:5252/api/people';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll() {
    return this.httpClient.get(this.apiUrl);
  }

  public findById(peopleId: number) {
    return this.httpClient.get(`${this.apiUrl}/${peopleId}`);
  }

  public add(people: any) {
    return this.httpClient.post(this.apiUrl, people);
  }

  public update(people: any, peopleId: number) {
    return this.httpClient.put(`${this.apiUrl}/${peopleId}`, people);
  }
  public delete(peopleId: number) {
    return this.httpClient.delete(`${this.apiUrl}/${peopleId}`);
  }
}

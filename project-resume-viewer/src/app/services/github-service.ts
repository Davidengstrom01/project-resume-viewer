import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubRepo } from '../models/GitHubRepo';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://localhost:7013/api/github';
  private username = 'Davidengstrom01';

  constructor(private http: HttpClient) { }

  getRepos(): Observable<GitHubRepo[]> {

    const value = this.http.get<GitHubRepo[]>(`${this.apiUrl}/example`);

    console.log(value);

    return value;

    //return this.http.get<GitHubRepo[]>(`${this.apiUrl}/${this.username}/repos`);
  }
}

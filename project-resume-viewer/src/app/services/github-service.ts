import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubRepo } from '../models/GitHubRepo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = environment.apiUrl;
  private username = 'Davidengstrom01';

  constructor(private http: HttpClient) { }

  getRepos(): Observable<GitHubRepo[]> {

    const value = this.http.get<GitHubRepo[]>(`${this.apiUrl}/example`);

    console.log(value);

    return value;

    //return this.http.get<GitHubRepo[]>(`${this.apiUrl}/${this.username}/repos`);
  }
}

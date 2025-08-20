import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY, expand, map, reduce } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  private: boolean;
}

interface PageResult {
  repos: Repo[];
  link: string | null;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  private requestPage(username: string, page: number): Observable<PageResult> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (environment.githubToken) {
      headers['Authorization'] = `Bearer ${environment.githubToken}`;
    }

    return this.http
      .get<Repo[]>(`${this.baseUrl}/users/${username}/repos`, {
        observe: 'response',
        headers: new HttpHeaders(headers),
        params: {
          per_page: 100,
          page,
          sort: 'updated',
          direction: 'desc',
        },
      })
      .pipe(
        map((response: HttpResponse<Repo[]>) => ({
          repos: response.body ?? [],
          link: response.headers.get('Link'),
        }))
      );
  }

  fetchAllRepos(username: string): Observable<Repo[]> {
    const getNextPage = (link: string | null): number | null => {
      if (!link) return null;
      const nextPart = link
        .split(',')
        .map((l) => l.trim())
        .find((l) => l.endsWith('rel="next"'));
      if (!nextPart) return null;
      const match = nextPart.match(/<([^>]+)>/);
      if (!match) return null;
      try {
        const url = new URL(match[1]);
        const page = url.searchParams.get('page');
        return page ? parseInt(page, 10) : null;
      } catch {
        return null;
      }
    };

    return this.requestPage(username, 1).pipe(
      expand((result) => {
        const nextPage = getNextPage(result.link);
        return nextPage ? this.requestPage(username, nextPage) : EMPTY;
      }),
      map((result) => result.repos),
      reduce((acc, repos) => acc.concat(repos), [] as Repo[]),
      map((repos) =>
        repos.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      )
    );
  }
}

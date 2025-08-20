import { Injectable, signal } from '@angular/core';
import { GithubService, Repo } from '../services/github.service';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RepoStore {
  readonly repos = signal<Repo[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor(private githubService: GithubService) {}

  async prefetch(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const repos = await firstValueFrom(
        this.githubService.fetchAllRepos(environment.githubUsername)
      );
      this.repos.set(repos);
    } catch (err: any) {
      this.error.set(err?.message ?? 'Failed to load repositories');
    } finally {
      this.loading.set(false);
    }
  }
}

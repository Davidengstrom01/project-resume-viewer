import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github-service';
import { GitHubRepo } from '../../models/GitHubRepo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  repos: GitHubRepo[] = [];
  loading = false;
  error = false;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.loadRepos();
  }

  loadRepos(): void {
    this.loading = true;
    this.error = false;

    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.repos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch repos:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface Repo {
  name: string;
  html_url: string;
  private: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly http = inject(HttpClient);

  readonly repos$ = this.http
    .get<Repo[]>(`https://api.github.com/users/your-username/repos`)
    .pipe(
      map(repos =>
        repos
          .filter(repo => !repo.private)
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
}

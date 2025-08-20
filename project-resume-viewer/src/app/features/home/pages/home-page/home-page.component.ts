import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoStore } from '../../../../core/stores/repo.store';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly repoStore = inject(RepoStore);

  readonly repos = computed(() =>
    this.repoStore.repos().filter((repo) => !repo.archived)
  );
  readonly loading = this.repoStore.loading;
  readonly error = this.repoStore.error;
}

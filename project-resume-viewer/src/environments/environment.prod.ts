
export const environment = {
  production: true,
  githubUsername: 'your-username',
  githubToken: undefined as string | undefined,
  // Use same-origin relative path so the client talks to /api/Github and the backend host is hidden
  apiUrl: '/api/Github'
};

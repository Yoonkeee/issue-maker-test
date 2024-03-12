import { Octokit } from "octokit";

const octokit = new Octokit({
  // auth: process.env.VITE_DWHALE_TOKEN,
  auth: import.meta.env.VITE_DWHALE_TOKEN,
});
console.log(import.meta.env.VITE_DWHALE_TOKEN);

export const getRepos = () =>
  octokit.rest.repos
    .listForOrg({ org: "dwhale-dev", type: "private" })
    .then((res) =>
      res.data.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
      })),
    );

export const getIssueLabels = (repo) =>
  octokit.rest.issues
    .listLabelsForRepo({
      owner: "dwhale-dev",
      repo,
    })
    .then((res) => res.data.map((label) => label.name));

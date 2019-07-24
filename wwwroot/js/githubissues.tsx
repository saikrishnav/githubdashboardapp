import * as rm from 'typed-rest-client/RestClient';
import { ITableItem } from './Table';

export class GitHubIssues {

    private rest: rm.RestClient;
    private static readonly githubApi: string = "https://api.github.com/";

    constructor() {
        this.rest = new rm.RestClient("DashboardApp");
    }

    public async GetGitHubIssues(organization: string): Promise<ITableItem[]>
    {
        let repositories: IGithubRepository[] = await this.GetRepositoriesForOrganization(organization);
        let tableItems: ITableItem[] = [];

        for (const repository of repositories) {
            let repositoryIssues: IGitHubIssue[] = await this.GetIssuesForRepository(organization, repository.name);
            tableItems.push(
                {
                    numIssues: repositoryIssues.length,
                    repoLink: repository.html_url,
                    repoName: repository.name
                });
        }

        return tableItems;
    }

    private async GetRepositoriesForOrganization(organization: string): Promise<IGithubRepository[]>
    {
        let repositoriesApi: string = `orgs/${organization}/repos`;
        let response: rm.IRestResponse<IGithubRepository[]> = await this.rest.get(GitHubIssues.githubApi + repositoriesApi);
        console.log(response.result);
        return response.result;
    }

    private async GetIssuesForRepository(organization: string, repository: string): Promise<IGitHubIssue[]>
    {
        let issuesApi: string = `repos/${organization}/${repository}/issues`;
        let response: rm.IRestResponse<IGitHubIssue[]> = await this.rest.get(GitHubIssues.githubApi + issuesApi);
        console.log(response.result);
        return response.result;
    }

 

}

export interface IGitHubIssue {
   
}

export interface IGithubRepository {
    name: string;
    html_url: string;
}
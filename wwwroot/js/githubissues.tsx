import * as rm from 'typed-rest-client/RestClient';
import { ITableItem } from './Table';

export class GitHubIssues {

    private rest: rm.RestClient;
    private static readonly GITHUB_API: string = "https://api.github.com/";
    private static readonly NUMBER_RESULTS_PER_PAGE: number = 30;

    constructor() {
        this.rest = new rm.RestClient("DashboardApp");
    }

    public async GetGitHubIssues(organization: string, page: number): Promise<ITableItem[]>
    {
        let repositories: IGithubRepository[] = await this.GetRepositoriesForOrganization(organization, "public", "pushed", page);
        let tableItems: ITableItem[] = [];

        for (const repository of repositories) {
            tableItems.push(
                {
                    numIssues: repository.open_issues_count,
                    repoLink: repository.html_url,
                    repoName: repository.name
                });
        }

        return tableItems;
    }

    private async GetRepositoriesForOrganization(organization: string, repoType: string, sortMethod: string, page: number): Promise<IGithubRepository[]>
    {
        let repositoriesApi: string = `orgs/${organization}/repos?type=${repoType}&sort=${sortMethod}&page=${page}`;
        let response: rm.IRestResponse<IGithubRepository[]> = await this.rest.get(GitHubIssues.GITHUB_API + repositoriesApi);
        console.log(`Number of repositories for ${organization} fetched from page ${page} = ` +  response.result.length);
        return response.result;
    }

    private async GetNumberOfPagesOfRepositoriesForOrganization(organization: string): Promise<number> {
        let organizationApi: string = `orgs/${organization}`;
        let response: rm.IRestResponse<IGitHubOrganization> = await this.rest.get(GitHubIssues.GITHUB_API + organizationApi);
        return Math.ceil(response.result.public_repos / GitHubIssues.NUMBER_RESULTS_PER_PAGE);
    }

    private async GetIssuesForRepository(organization: string, repository: string): Promise<IGitHubIssue[]>
    {
        let issuesApi: string = `repos/${organization}/${repository}/issues`;
        let response: rm.IRestResponse<IGitHubIssue[]> = await this.rest.get(GitHubIssues.GITHUB_API + issuesApi);
        console.log(response.result);
        return response.result;
    }

 

}

export interface IGitHubIssue {
   
}

export interface IGithubRepository {
    name: string;
    html_url: string;
    open_issues_count: number;
}

export interface IGitHubOrganization {
    public_repos: number;
}
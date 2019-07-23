import * as rm from 'typed-rest-client/RestClient';
import { ITableItem } from './Table';
//import { ITableItem } from './TableData';

export class GitHubIssues {

    private rest: rm.RestClient;
    private static readonly githubApi: string = "https://api.github.com/";

    constructor() {
        this.rest = new rm.RestClient("DashboardApp");
    }

    public async GetGitHubIssues(): Promise<ITableItem[]>
    {
        await this.GetIssuesForRepository("microsoft", "azure-devops-node-api");


        const rawTableItems: ITableItem[] = [
            {
                numIssues: (await this.GetIssuesForRepository("microsoft", "azure-devops-node-api")).length,
                repoName: "Borg Cube"
                //{ iconProps: { render: renderStatus }, text: "Rory Boisvert" }
            },
            {
                numIssues: 49,
                repoName: "Darth Vader"
                //repoName: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Sharon Monroe" }
            },
            {
                numIssues: 18,
                repoName: "Lord Voldemort"
                //repoName: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Lucy Booth" }
            },
            {
                numIssues: 100,
                repoName: "Species 8472"
                //{ iconProps: { render: renderStatus }, text: "Rory Boisvert" }
            },
        ];
        return rawTableItems;
    }

    private async GetRepositoriesForOrganization(organization: string)
    {
         
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
    id: number
}
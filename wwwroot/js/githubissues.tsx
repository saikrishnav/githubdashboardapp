import * as httpm from 'typed-rest-client/HttpClient';
import { ITableItem } from './Table';

export class GitHubIssues {

    public async GetGitHubIssues(): Promise<ITableItem[]>
	{
		//let rest: httpm.HttpClient = new httpm.HttpClient("DashboardApp");// );
		//let response: httpm.HttpClientResponse = await rest.get("https://api.github.com/repos/Microsoft/dotnet/issues");

        //console.log(response);

        const rawTableItems: ITableItem[] = [
            {
                numIssues: 50,
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

}
import * as httpm from 'typed-rest-client/HttpClient';

export class GitHubIssues {

	public async GetGitHubIssues()
	{
		let rest: httpm.HttpClient = new httpm.HttpClient("DashboardApp");// );
		let response: httpm.HttpClientResponse = await rest.get("https://api.github.com/repos/Microsoft/dotnet/issues");

		console.log(response);
	}

}
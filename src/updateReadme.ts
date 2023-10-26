import { Octokit } from "@octokit/rest";

// Replace with the owner and repository name of the repository you want to update
const owner = "kunal00000";
const repo = "Contributions";

// Replace with the new README content you want to set
export default async function updateReadme(newReadmeContent: string) {
  // Initialize the Octokit client with your access token
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  // Get the current README content
  const { data: currentReadme } = await octokit.repos.getReadme({
    owner,
    repo
  });

  // Update the README with the new content
  console.log(currentReadme.content == newReadmeContent);
  if(currentReadme.content !== newReadmeContent){
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "README.md",
      message: "Update README by scraped content",
      content: Buffer.from(newReadmeContent).toString("base64"),
      sha: currentReadme.sha
    });
  }
}

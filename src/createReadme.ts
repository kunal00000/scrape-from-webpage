import fs from "fs";
import path from "path";
import { sortProjectsByIssueCount } from "./helpers";
import Project from "./class";
import updateReadme from "./updateReadme";

export default function createContributions(projects: Project[]) {
  const readmePath = path.join(__dirname, "../src/template.md");
  const readme = fs.readFileSync(readmePath, "utf-8");
  const sortedProjects = sortProjectsByIssueCount(projects);

  // <!-- ORGList:START --> and <!-- ORGList:END -->
  const pStart = "<!-- ORGList:START -->";
  const pEnd = "<!-- ORGList:END -->";
  const pStartIdx = readme.indexOf(pStart) + pStart.length;
  const pEndIdx = readme.indexOf(pEnd);

  let pSection = "\n";
  for (let i = 0; i < sortedProjects.length; i++) {
    pSection += addProject(sortedProjects[i]);
  }
  const pUpdated =
    readme.substring(0, pStartIdx) + pSection + readme.substring(pEndIdx);

  // <!-- CONTRIBUTIONS:START --> and <!-- CONTRIBUTIONS:END -->
  const startTag = "<!-- CONTRIBUTIONS:START -->";
  const endTag = "<!-- CONTRIBUTIONS:END -->";
  const cStartIdx = pUpdated.indexOf(startTag) + startTag.length;
  const cEndIdx = pUpdated.indexOf(endTag);

  let cSection = "";
  for (let i = 0; i < sortedProjects.length; i++) {
    cSection += addContribution(sortedProjects[i]);
  }
  const newReadmeContent =
    pUpdated.substring(0, cStartIdx) + cSection + pUpdated.substring(cEndIdx);

  // finish
  updateReadme(newReadmeContent);
}

/**
 *
 */
function addProject(project: Project) {
  const tag = project.org_name
    .toLocaleLowerCase()
    .replace(" ", "-")
    .replace(".", "");

  return `- [${project.org_name}](#${tag}) - ${project.issueCount}\n`;
}

function addContribution(project: Project) {
  return `\n#### ${project.org_name}

${project.issues
  .map(
    (issue, idx) => `${idx + 1}. [${issue.name}](${issue.link}) - ${issue.desc}`
  )
  .join("\n")}
`;
}

import Project from "./class";

export function returnIndex(project: string, orgs: Project[]): number {
  return orgs.findIndex((org) => org.org_name === project);
}

export function sortProjectsByIssueCount(projects: Project[]): Project[] {
  return projects.sort((a, b) => b.issueCount - a.issueCount);
}

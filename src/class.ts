export default class Project {
  org_name: string;
  issues: {
    name: string;
    link: string;
    desc: string;
  }[];
  issueCount: number;

  // initialize project with first issue
  constructor(
    name: string,
    issue_name: string,
    issue_link: string,
    issue_desc: string
  ) {
    this.org_name = name;
    this.issues = [
      {
        name: issue_name,
        link: issue_link,
        desc: issue_desc
      }
    ];
    this.issueCount = 1;
  }

  addIssue(issue_name: string, issue_link: string, issue_desc: string) {
    this.issues.push({
      name: issue_name,
      link: issue_link,
      desc: issue_desc
    });
    this.issueCount++;
  }
}

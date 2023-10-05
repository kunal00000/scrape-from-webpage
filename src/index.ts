import puppeteer, { Browser } from "puppeteer";
import Project from "./class";
import createTemplate from "./createReadme";
import { returnIndex } from "./helpers";
import dotenv from "dotenv";
dotenv.config();

const perform = async (browser: Browser, url: string) => {
  // Open a new blank page
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url, {
    waitUntil: "networkidle2"
  });

  // Scrape the data from the HTML
  const sOrgs = await page.$$eval(
    "td > div > a > div > .font-bold",
    (elements) => Array.from(elements).map((element) => element.textContent)
  );
  const sIssues = await page.$$eval(
    "td > div > a > div > .font-medium",
    (elements) => Array.from(elements).map((element) => element.textContent)
  );
  const sDesc = await page.$$eval("td > div > a > .gap-2", (elements) =>
    Array.from(elements).map((element) => element.textContent)
  );
  const sLinks = await page.$$eval("td > div > .w-full", (elements) =>
    Array.from(elements).map((element) => element.getAttribute("href"))
  );

  let projects: Project[] = [];
  // Operate on output data
  for (let i = 0; i < sOrgs.length; i++) {
    const idx = returnIndex(sOrgs[i]!, projects);

    const desc = sDesc[i]!.replace(/\$\d+/, "");

    if (idx === -1) {
      projects.push(new Project(sOrgs[i]!, sIssues[i]!, sLinks[i]!, desc));
    } else {
      projects[idx].addIssue(sIssues[i]!, sLinks[i]!, desc);
    }
  }

  createTemplate(projects);
};

async function main() {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    await perform(browser, "https://console.algora.io/@/kunal00000");
  } catch (e) {
    console.error(e);
  } finally {
    browser.close();
  }
}

main();

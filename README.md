# Portfolio navigation automation

Playwright + TypeScript project testing one feature: **section navigation** on
[Nidhi Singh's portfolio](https://nidhisingh25901.github.io/portfolio-/).
Tests use the live website; no local web server is required.

## Setup

Requires Node.js 24 or later and an internet connection.
Open PowerShell in this project directory and run:

```powershell
npm ci
npx playwright install chromium
npm test
```

## Test coverage

| Scenario | Desktop Chromium | Mobile Chromium (Pixel 7 emulation) |
| --- | --- | --- |
| Five links are visible and point to the correct anchors | Yes | Checked after opening the menu |
| ABOUT, EDUCATION, SKILLS, WORKS, CONTACT each reach their section | Five tests | Five tests |
| Return to ABOUT after CONTACT | Yes | — |
| Browser back/forward restore the previous/next section | Yes | — |
| Hamburger opens, closes, and reopens the menu | — | Yes |

There are **14 tests**: eight desktop and six mobile. Navigation assertions check
the URL fragment, the destination section's intersection with the viewport, and
its heading being in the viewport. Checking the URL alone would miss failed scrolling.
Each test starts with a fresh browser context and an independent page visit.
Playwright's retrying assertions handle the site's smooth scrolling; there are no fixed sleeps.
Mobile coverage uses device emulation, rather than physical-device testing.

## Useful commands

```powershell
npm run test:desktop  # Desktop tests only
npm run test:mobile   # Mobile tests only
npm run test:headed   # Watch the browser
npm run test:ui       # Interactive test explorer
npm run test:debug    # Step through desktop tests
npm run typecheck    # Validate TypeScript
npm run report       # Open the latest HTML report
```

Failure screenshots, videos, and traces are saved under `test-results/`.
The HTML report is saved under `playwright-report/`. Open a failed test in the
report to inspect its evidence. These generated files are ignored by Git.

## Project structure

```text
pages/PortfolioPage.ts             Shared locators and navigation actions
tests/navigation.spec.ts           Desktop scenarios
tests/mobile-navigation.spec.ts    Mobile scenarios
playwright.config.ts              URL, devices, timeouts, reports
.github/workflows/playwright.yml   GitHub Actions test workflow
```

The page object uses role/name locators for the links and headings. The menu
container and hamburger use CSS selectors because the current site does not
provide semantic navigation markup or an accessible label for the hamburger.
The tests do not assume that selecting a mobile link automatically closes the menu.

## Optional settings

To test another deployment with the same markup:

```powershell
$env:BASE_URL = 'https://your-host/portfolio-/'
npm test
Remove-Item Env:BASE_URL
```

If browser downloads time out, you can use an already installed compatible
Chromium executable. Set its actual absolute path:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\path\to\chrome.exe'
npm test
Remove-Item Env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

The default remains the Chromium version bundled with Playwright. A custom
executable may differ from that version, so prefer the standard installation.
These settings are environment variables; no `.env` loader is required.

## CI

The included GitHub Actions workflow installs dependencies and Chromium, checks
TypeScript, runs both projects, and uploads the report and test artifacts.
It becomes active when this project is committed to a GitHub repository.
Live-site availability and changes to its text or markup can affect test results.

Reference: [Playwright projects](https://playwright.dev/docs/test-projects) and
[retrying assertions](https://playwright.dev/docs/test-assertions).

## Verified run

On October 4, 2026, `npm run typecheck` passed and all **14 live-site tests passed**
in 33.7 seconds. The bundled Chromium download timed out in this environment,
so the run used an existing Playwright Chromium installation with this command:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = "$env:LOCALAPPDATA\ms-playwright\chromium-1234\chrome-win64\chrome.exe"
npm test
```

This path is specific to the verified local installation. The normal setup
instructions above install the browser that matches the project's Playwright version.

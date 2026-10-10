"""Wake the Streamlit demos linked from the portfolio. A plain HTTP GET doesn't
wake a sleeping app; the "Yes, get this app back up!" button has to be clicked."""
import os
import sys

from playwright.sync_api import sync_playwright

URLS = [
    "https://bankruptwtch.streamlit.app/",
    "https://breastinsight-aljuhaeda.streamlit.app/",
    "https://indonewsclassifier.streamlit.app/",
    "https://klasifikasisentimentwitter.streamlit.app/",
]
WAKE = "Yes, get this app back up!"


def wake(browser, url):
    page = browser.new_page()
    page.goto(url, wait_until="domcontentloaded")
    btn = page.get_by_role("button", name=WAKE)
    try:
        btn.wait_for(timeout=15_000)
        btn.click()
        print(f"{url}: was asleep, woke it")
    except Exception:
        print(f"{url}: already awake")
    # the app renders inside an iframe; wait for it to boot
    page.frame_locator("iframe[title=streamlitApp]").locator("[data-testid=stApp]").wait_for(timeout=180_000)
    page.close()


failed = []
with sync_playwright() as p:
    browser = p.chromium.launch(channel=os.environ.get("BROWSER_CHANNEL"))  # None = bundled chromium
    for url in URLS:
        try:
            wake(browser, url)
        except Exception as e:
            print(f"{url}: FAILED {type(e).__name__}")
            failed.append(url)
    browser.close()
sys.exit(1 if failed else 0)

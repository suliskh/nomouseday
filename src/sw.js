import { togglePointerCSS } from "./common.js";

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes?.state?.newValue !== changes?.state?.oldValue) {
    chrome.action.setIcon({path: `images/icon-${changes?.state?.newValue === "ON" ? "on" : "off"}128.png`})
    togglePointerCSS(changes?.state?.newValue);
  }

  if (changes?.repeatDay?.newValue !== changes?.repeatDay?.oldValue) {
    const currentState = await chrome.storage.sync.get("state");
    const today = new Date().getDay();

    if (today === Number(changes?.repeatDay?.newValue) && currentState !== "ON") {
      chrome.storage.sync.set({ state: "ON" });
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ state: "OFF" });
});

chrome.tabs.onUpdated.addListener(async (_, changeInfo) => {
  if (changeInfo.status === "complete") {
    const currentState = await chrome.storage.sync.get("state");
    const currentRepeatDay = await chrome.storage.sync.get("repeatDay");
    const today = new Date().getDay();

    if (today === Number(currentRepeatDay.repeatDay) && currentState !== "ON") {
      togglePointerCSS("ON");
    } else {
      togglePointerCSS(currentState.state);
    }
  }
});

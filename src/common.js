export function togglePointerCSS(state) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    async (tabs) => {
      const currentTab = tabs[0]
      const currentTabId = currentTab?.id;
      
      if (!!currentTabId && !currentTab?.url?.startsWith("chrome://")) {
        toggleCSS(state, currentTabId);
      }
    }
  );
}

async function toggleCSS(state, tabId) {
  try {
    if (state === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["nopointer.css"],
        target: { tabId },
      });
    } else {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["nopointer.css"],
        target: { tabId },
      });
    }
  } catch(err) {
    chrome.storage.sync.set({ state: "OFF" });
  }
}

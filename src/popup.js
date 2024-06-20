document.addEventListener("DOMContentLoaded", async () => {
  const stateSwitcher = document.getElementById("state");
  const repeatDaySelector = document.getElementById("repeat-day");

  if (!!stateSwitcher) {
    // Add onChange event handler
    stateSwitcher.addEventListener("change", (e) => {
      const target = e.target;

      chrome.storage.sync.set({
        state: target?.checked === true ? "ON" : "OFF",
      });
    });

    // Add initial state
    const currentState = await chrome.storage.sync.get("state");
    stateSwitcher.checked = currentState.state === "ON";
  }

  if (!!repeatDaySelector) {
    const today = new Date().getDay();
    const currentRepeatDay = await chrome.storage.sync.get("repeatDay");

    // Add initial values
    repeatDaySelector.value = currentRepeatDay.repeatDay ?? -1;

    // Add onChange event handler
    repeatDaySelector.addEventListener("change", (e) => {
      const selectedDay = Number(e.target.value);

      if (Number.isInteger(selectedDay)) {
        if (today === selectedDay) {
          stateSwitcher.checked = true;
        }
        chrome.storage.sync.set({ repeatDay: selectedDay });
      }
    });
  }
});

window.perfWatch = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    window.perfWatch[sender.tab.id] = message.essential || null;
});
console.log('<----- Injected script started running ----->');

function parseEssentialDetails() {
    let main = {};

    main.performance = JSON.parse(JSON.stringify(window.performance)) || null;

    return main;
}

setInterval(() => {
    let essential = parseEssentialDetails();
    window.postMessage({ type: "FROM_PAGE", essential });
}, 500);

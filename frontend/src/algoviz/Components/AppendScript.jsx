const AppendScript = (scriptToAppend, globalCheckName) => {
    if (globalCheckName && window[globalCheckName]) {
        return; // The script’s functionality is already loaded.
    }
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === scriptToAppend) {
            return;
        }
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptToAppend;
    document.head.appendChild(script);
};

export default AppendScript;

export const RemoveScript = (scriptToDisAppend) => {

    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === scriptToDisAppend) {
            scripts[i].remove();
        }
    }
}



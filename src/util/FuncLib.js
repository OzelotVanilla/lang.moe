define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readFileAsync = exports.setPageTitle = exports.warn = exports.log = void 0;
    exports.log = console.log;
    exports.warn = console.warn;
    const setPageTitle = (name) => { document.getElementsByTagName("title")[0].innerText = name; };
    exports.setPageTitle = setPageTitle;
    const readFileAsync = function (url, success_action, failed_action) {
        let ajax_reader = new XMLHttpRequest();
        ajax_reader.open("GET", url, true);
        ajax_reader.send();
        ajax_reader.onreadystatechange = () => {
            if (ajax_reader.readyState == 4 && ajax_reader.status == 200) {
                success_action(ajax_reader.responseText);
            }
            else {
                failed_action(ajax_reader.status);
            }
        };
    };
    exports.readFileAsync = readFileAsync;
});

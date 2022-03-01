define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readFileAsync = exports.setPageTitle = void 0;
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
                console.log("Something went wrong with ajax_reader:\n" + ajax_reader);
                console.log("The status is " + ajax_reader.status + " and ready_state is " + ajax_reader.readyState);
                failed_action(ajax_reader.status);
            }
        };
    };
    exports.readFileAsync = readFileAsync;
});

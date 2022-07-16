define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readURLParam = exports.readFileSync = exports.readFileAsync = exports.setPageTitle = void 0;
    const setPageTitle = (name) => { document.getElementsByTagName("title")[0].innerText = name; };
    exports.setPageTitle = setPageTitle;
    const readFileAsync = function (url, success_action, failed_action) {
        $.ajax({
            url: url.toString(),
            type: "GET",
            dataType: "text",
            async: true,
            success: success_action,
            error: failed_action
        });
    };
    exports.readFileAsync = readFileAsync;
    const readFileSync = function (url) {
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "text",
            async: false
        }).responseText;
    };
    exports.readFileSync = readFileSync;
    const readURLParam = function () {
        // Get the parameter after the "?"
        let params = (new URL(window.location.href)).searchParams;
        let result = new Map();
        for (let entry of params.entries()) {
            result[entry[0]] = entry[1];
        }
        return result;
    };
    exports.readURLParam = readURLParam;
});

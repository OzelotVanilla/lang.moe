import * as $ from "jquery";

export const setPageTitle =
    (name: string) => { document.getElementsByTagName("title")[0].innerText = name; };
export const readFileAsync =
    function (url: string | URL, success_action: (text: string) => any, failed_action?: (request?: JQueryXHR) => any): void
    {
        $.ajax({
            url: url.toString(),
            type: "GET",
            dataType: "text",
            async: true,
            success: success_action,
            error: failed_action
        });
    };

export const readFileSync =
    function (url: string)
    {
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "text",
            async: false
        }).responseText;
    };

export const readURLParam =
    function (): Map<string, string>
    {
        // Get the parameter after the "?"
        let params = (new URL(window.location.href)).searchParams;
        let result = new Map<string, string>();
        for (let entry of params.entries())
        {
            result[entry[0]] = entry[1];
        }

        return result;
    };
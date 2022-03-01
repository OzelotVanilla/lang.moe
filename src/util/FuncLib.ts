export const setPageTitle =
    (name: string) => { document.getElementsByTagName("title")[0].innerText = name; };
export const readFileAsync =
    function (url: string | URL, success_action?: (text: string) => any, failed_action?: (status?: number) => any): void
    {
        let ajax_reader = new XMLHttpRequest();
        ajax_reader.open("GET", url, true);
        ajax_reader.send();
        ajax_reader.onreadystatechange = () =>
        {
            if (ajax_reader.readyState == 4 && ajax_reader.status == 200)
            {
                success_action(ajax_reader.responseText);
            }
            else
            {
                console.log("Something went wrong with ajax_reader:\n" + ajax_reader);
                console.log("The status is " + ajax_reader.status + " and ready_state is " + ajax_reader.readyState);
                failed_action(ajax_reader.status);
            }
        }
    };
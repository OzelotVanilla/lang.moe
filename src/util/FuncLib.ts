export const log = console.log;
export const warn = console.warn;
export const setPageTitle =
    (name: string) => { document.getElementsByTagName("title")[0].innerText = name; };
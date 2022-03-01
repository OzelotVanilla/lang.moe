import { readFileAsync } from "../util/FuncLib";

enum SpecialStartings
{
    "*", "#", ">", "-"
}

/**
 * 
 */
export class MarkdownTokenizer
{
    file_path: string;

    constructor(file_path: string)
    {
        this.file_path = file_path;
    }

    public result(): string
    {
        console.log("Showing parsed result.");
        let content = "Failed to load file by ajax.";
        readFileAsync(
            this.file_path,
            (text) => { content = text; },
            (status) => { console.warn(status); }
        );

        return content;
    }
}
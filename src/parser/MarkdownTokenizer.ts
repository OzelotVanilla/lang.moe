import { readFileAsync, readFileSync } from "../util/FuncLib";

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
        return readFileSync(this.file_path);
    }
}
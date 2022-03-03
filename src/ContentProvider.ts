import * as $ from "jquery";
import { MarkdownTokenizer } from "./parser/MarkdownTokenizer";
import { readFileAsync } from "./util/FuncLib";

export enum ProvideFrom { markdown, html };

/**
 * Update page content by adding content into `div` tags.
 */
export class ContentProvider
{
    /**
     * The path to the file that this provider will get data from.
     */
    file_path: string;

    /**
     * The type of source file.
     */
    provide_type: ProvideFrom;

    /**
     * The id of setInteval. If the id is null, that means no setInteval is working.
     */
    refresh_id: number | null = null;


    constructor(file_path: string, provide_type: ProvideFrom = ProvideFrom.markdown, refresh_interval: number = null)
    {
        console.log("Creating Content Provider: \"" + file_path + "\"");
        this.file_path = file_path;
        this.provide_type = provide_type;
        if (refresh_interval != null) { this.updateAutomatically(refresh_interval); }
    }

    /**
     * The `ContentProvider` will offer HTML result to the specified HTML tags.
     * 
     * @param tag_id The <i>id</i> property for the specified HTML tags
     */
    public provide(tag_id: string, que_async: boolean = true): void
    {
        console.log("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
        switch (this.provide_type)
        {
            case ProvideFrom.markdown: this.provideFromMarkdown(tag_id, que_async);
        }
    }

    private provideFromMarkdown(tag_id: string, que_async: boolean = true): void
    {
        if (que_async == true)
        {
            readFileAsync(
                this.file_path,
                function onSuccessAction(original_text: any)
                {
                    let md_tokenizer = new MarkdownTokenizer({ original_text: original_text as string });
                    $("#" + tag_id).text(original_text);
                }
            );
        }
        else
        {
            let s = new MarkdownTokenizer({
                file_path: this.file_path
            }).result();
            console.log(s);
            $("#" + tag_id).text(s);
        }
    }

    public registNewGrammar(type: ProvideFrom, /* Parameter for Grammar */): void
    {
        switch (type)
        {
            case ProvideFrom.markdown: break;
            case ProvideFrom.html: throw TypeError("HTML is not supported now");
        }
    }

    public updateAutomatically(interval: number): void
    {
        if (this.refresh_id != null) { this.cancelAutoUpdate(); }
        if (interval <= 0) { console.warn("You cannot set a non-positive interval for auto-update"); }
        this.refresh_id = setInterval(this.provide, interval);
    }

    public cancelAutoUpdate(): void
    {
        if (this.refresh_id == null)
        {
            console.warn("No auto-update job set!");
        }
        else
        {
            clearInterval(this.refresh_id);
        }
    }
}
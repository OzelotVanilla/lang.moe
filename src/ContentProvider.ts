import { log, warn } from "./util/FuncLib";
import * as $ from "jquery";

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
        log("Creating Content Provider: \"" + file_path + "\"");
        this.file_path = file_path;
        this.provide_type = provide_type;
        if (refresh_interval != null) { this.updateAutomatically(refresh_interval); }
    }

    public provide(tag_id: string): void
    {
        log("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
        $("#" + tag_id).text("Test text, waiting for implementation...");
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
        if (interval <= 0) { warn("You cannot set a non-positive interval for auto-update"); }
        this.refresh_id = setInterval(this.provide, interval);
    }

    public cancelAutoUpdate(): void
    {
        if (this.refresh_id == null)
        {
            warn("No auto-update job set!");
        }
        else
        {
            clearInterval(this.refresh_id);
        }
    }
}
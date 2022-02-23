import { log, warn } from "./util/FuncLib";
import * as $ from "jquery";

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
     * The id of setInteval. If 
     */
    refresh_id: number | null = null;

    constructor(file_path: string, refresh_interval: number = null)
    {
        log("Creating Content Provider: \"" + file_path + "\"");
        this.file_path = file_path;
        if (refresh_interval != null) { this.updateAutomatically(refresh_interval); }
    }

    public provide(tag_id: string): void
    {
        log("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
        $("#" + tag_id).text("Test text, waiting for implementation...");
    }

    public registNewGrammar(): void
    {

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
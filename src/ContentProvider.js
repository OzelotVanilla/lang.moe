define(["require", "exports", "jquery", "./parser/MarkdownTokenizer"], function (require, exports, $, MarkdownTokenizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContentProvider = exports.ProvideFrom = void 0;
    var ProvideFrom;
    (function (ProvideFrom) {
        ProvideFrom[ProvideFrom["markdown"] = 0] = "markdown";
        ProvideFrom[ProvideFrom["html"] = 1] = "html";
    })(ProvideFrom = exports.ProvideFrom || (exports.ProvideFrom = {}));
    ;
    /**
     * Update page content by adding content into `div` tags.
     */
    class ContentProvider {
        constructor(file_path, provide_type = ProvideFrom.markdown, refresh_interval = null) {
            /**
             * The id of setInteval. If the id is null, that means no setInteval is working.
             */
            this.refresh_id = null;
            console.log("Creating Content Provider: \"" + file_path + "\"");
            this.file_path = file_path;
            this.provide_type = provide_type;
            if (refresh_interval != null) {
                this.updateAutomatically(refresh_interval);
            }
        }
        /**
         * The `ContentProvider` will offer HTML result to the specified HTML tags.
         *
         * @param tag_id The <i>id</i> property for the specified HTML tags
         */
        provide(tag_id) {
            console.log("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
            switch (this.provide_type) {
                case ProvideFrom.markdown: this.provideFromMarkdown(tag_id);
            }
        }
        provideFromMarkdown(tag_id) {
            $("#" + tag_id).text(new MarkdownTokenizer_1.MarkdownTokenizer(this.file_path).result());
        }
        registNewGrammar(type) {
            switch (type) {
                case ProvideFrom.markdown: break;
                case ProvideFrom.html: throw TypeError("HTML is not supported now");
            }
        }
        updateAutomatically(interval) {
            if (this.refresh_id != null) {
                this.cancelAutoUpdate();
            }
            if (interval <= 0) {
                console.warn("You cannot set a non-positive interval for auto-update");
            }
            this.refresh_id = setInterval(this.provide, interval);
        }
        cancelAutoUpdate() {
            if (this.refresh_id == null) {
                console.warn("No auto-update job set!");
            }
            else {
                clearInterval(this.refresh_id);
            }
        }
    }
    exports.ContentProvider = ContentProvider;
});

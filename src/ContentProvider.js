define(["require", "exports", "./util/FuncLib", "jquery"], function (require, exports, FuncLib_1, $) {
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
            (0, FuncLib_1.log)("Creating Content Provider: \"" + file_path + "\"");
            this.file_path = file_path;
            this.provide_type = provide_type;
            if (refresh_interval != null) {
                this.updateAutomatically(refresh_interval);
            }
        }
        provide(tag_id) {
            (0, FuncLib_1.log)("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
            $("#" + tag_id).text("Test text, waiting for implementation...");
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
                (0, FuncLib_1.warn)("You cannot set a non-positive interval for auto-update");
            }
            this.refresh_id = setInterval(this.provide, interval);
        }
        cancelAutoUpdate() {
            if (this.refresh_id == null) {
                (0, FuncLib_1.warn)("No auto-update job set!");
            }
            else {
                clearInterval(this.refresh_id);
            }
        }
    }
    exports.ContentProvider = ContentProvider;
});

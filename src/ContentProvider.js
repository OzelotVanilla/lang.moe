define(["require", "exports", "./util/FuncLib", "jquery"], function (require, exports, FuncLib_1, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContentProvider = void 0;
    /**
     * Update page content by adding content into `div` tags.
     */
    class ContentProvider {
        constructor(file_path, refresh_interval = undefined) {
            (0, FuncLib_1.log)("Creating Content Provider: \"" + file_path + "\"");
            this.file_path = file_path;
            if (refresh_interval != undefined) {
                this.updateAutomatically(refresh_interval);
            }
        }
        provide(tag_id) {
            (0, FuncLib_1.log)("Providing content from \"" + this.file_path + "\" to div tag \"" + tag_id + "\"");
            $("#" + tag_id).text("Test text, waiting for implementation...");
        }
        registNewGrammar() {
        }
        updateAutomatically(interval) {
            if (this.refresh_id != null) {
                this.cancelAutoUpdate();
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

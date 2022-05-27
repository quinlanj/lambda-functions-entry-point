"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
app.use('/', express_1.default.static('web-build'));
const FUNCTIONS_DIRNAME = 'functions';
const files = fs_1.default.readdirSync(FUNCTIONS_DIRNAME);
for (const file of files) {
    const filenameNoExtension = path_1.default.parse(file).name;
    if (filenameNoExtension === '.gitignore') {
        continue;
    }
    const relativePathToIndex = path_1.default.join(FUNCTIONS_DIRNAME, filenameNoExtension);
    try {
        const userDefinedModule = require(relativePathToIndex);
        const mountedPath = path_1.default.join('/', FUNCTIONS_DIRNAME, filenameNoExtension).toString();
        app.use(mountedPath, userDefinedModule.default);
        console.log('Function mounted at:', mountedPath);
    }
    catch (e) {
        console.error(`Error mounting function ${filenameNoExtension}`, e);
    }
}
//# sourceMappingURL=app.js.map
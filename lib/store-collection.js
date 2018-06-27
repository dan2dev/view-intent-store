"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var class_transformer_1 = require("class-transformer");
var utility_collection_1 = require("utility-collection");
var fetch_injection_1 = require("./fetch-injection");
var PaginatedList = /** @class */ (function (_super) {
    __extends(PaginatedList, _super);
    // ---------------
    function PaginatedList(name, collection, idFieldName) {
        var _this = _super.call(this, collection) || this;
        // public pageMapIds: Map<number, Array<string | number>> = new Map<number, Array<string | number>>();
        _this.pageMapIds = {}; // list with pages and ids
        _this.pageMapInfo = {}; // map with the page info
        // public pageMapInfo: Map<number, IPageInfo> = new Map<number, IPageInfo>();
        _this.pageUrlTemplate = null;
        _this.count = -1;
        _this.skip = 0;
        _this.rowsByPage = 100000; // Rows or PageSize
        _this.page = 1;
        _this.pageCount = 0;
        _this.pageUrlTemplateDisposer = null;
        _this.name = name;
        _this.collection = collection;
        _this.idFieldName = idFieldName;
        return _this;
    }
    Object.defineProperty(PaginatedList.prototype, "pageCollectionIds", {
        // computed -------------------------------------------------
        get: function () {
            if (this.pageMapIds[this.page]) {
                return this.pageMapIds[this.page];
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatedList.prototype, "pageCollection", {
        get: function () {
            var _this = this;
            return this.pageCollectionIds.map(function (id) {
                var item = _this.collection.getItem(id);
                if (item !== undefined && item !== null) {
                    return item;
                }
                else {
                    return null;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatedList.prototype, "infiniteCollectionIds", {
        get: function () {
            var returnIds = [];
            for (var p = 1; p <= this.page; p++) {
                if (this.pageMapIds[p] !== undefined && this.pageMapIds[p] !== null) {
                    returnIds = returnIds.concat(this.pageMapIds[p]);
                }
            }
            return returnIds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatedList.prototype, "infiniteCollection", {
        get: function () {
            var _this = this;
            return this.infiniteCollectionIds.map(function (id) {
                var item = _this.collection.getItem(id);
                if (item !== undefined && item !== null) {
                    return item;
                }
                else {
                    return null;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    // actions -------------------------------------------------
    PaginatedList.prototype.setPage = function (pageNumber) {
        var old = this.pageMapInfo[pageNumber];
        if (old === undefined || old === null) {
            this.pageMapInfo[pageNumber] = {
                page: pageNumber,
            };
        }
        else {
            old.page = pageNumber;
            this.pageMapInfo[pageNumber] = old;
        }
        // ----
        this.page = pageNumber;
        this.notify();
    };
    PaginatedList.prototype.nextPage = function () {
        if (this.page < this.pageCount) {
            this.loadPage(this.page + 1);
            this.setPage(this.page);
        }
        this.notify();
    };
    PaginatedList.prototype.prevPage = function () {
        if (this.page > 1) {
            this.loadPage(this.page - 1);
            this.setPage(this.page - 1);
        }
        this.notify();
    };
    PaginatedList.prototype.loadPage = function (pageNumber) {
        if (!utility_collection_1.Is.nullOrUndefined(this.pageInfo)) {
            if (!utility_collection_1.Is.empty(this.pageInfo.pageUrlTemplate)) {
                var loadUrl = this.pageInfo.pageUrlTemplate.toLowerCase().replace("{{page}}", pageNumber.toString());
                fetch_injection_1.FetchInjection.getFetchAction()(loadUrl);
            }
        }
        this.notify();
    };
    Object.defineProperty(PaginatedList.prototype, "pageInfo", {
        get: function () {
            return this.pageMapInfo[this.page] || { page: this.page };
            // return this.pageMapInfo[this.page];
        },
        enumerable: true,
        configurable: true
    });
    // items controller
    PaginatedList.prototype.setItem = function (item) {
        this.collection.setItem(item);
        this.notify();
    };
    PaginatedList.prototype.getItem = function (id) {
        return this.collection.getItem(id.toString());
    };
    PaginatedList.prototype.removeItem = function (id) {
        var item = this.getItem(id);
        if (item !== undefined && item !== null) {
            this.collection.removeItem(id.toString());
            return true;
        }
        else {
            return false; // remove success
        }
    };
    PaginatedList.prototype.removeItems = function (ids) {
        var _this = this;
        ids.forEach(function (id) {
            _this.removeItem(id);
        });
        this.notify();
    };
    PaginatedList.prototype.setItems = function (items) {
        var _this = this;
        var hasItems = !utility_collection_1.Is.nullOrUndefined(items);
        var pageIds = [];
        if (hasItems) {
            items.forEach(function (item) {
                _this.setItem(item);
                pageIds.push(item[_this.idFieldName]);
            });
        }
        this.notify();
    };
    PaginatedList.prototype.setPaginatedList = function (paginatedList) {
        var _this = this;
        if (!utility_collection_1.Is.nullOrUndefined(this.pageUrlTemplate)) {
            if (paginatedList.pageUrlTemplate.toLowerCase() !== this.pageUrlTemplate.toLowerCase()) {
                this.invalidateList();
            }
        }
        var hasItems = !utility_collection_1.Is.nullOrUndefined(paginatedList.items);
        var pageIds = [];
        if (hasItems) {
            paginatedList.items.forEach(function (item) {
                _this.setItem(item);
                pageIds.push(item[_this.idFieldName]);
            });
        }
        if (paginatedList.page > -1) {
            if (paginatedList.page > 1) {
                this.page = paginatedList.page;
            }
            // this.pageMapIds.set(paginatedList.page, pageIds);
            this.pageMapIds[paginatedList.page] = pageIds;
        }
        if (paginatedList.page === 1) {
            if (!utility_collection_1.Is.nullOrUndefined(paginatedList.pageUrlTemplate)) {
                if (!utility_collection_1.Is.nullOrUndefined(this.pageInfo)) {
                    if (this.pageInfo.pageUrlTemplate.toLowerCase() !== paginatedList.pageUrlTemplate.toLowerCase()) {
                        this.setPage(1);
                    }
                }
            }
        }
        if (paginatedList.rowsByPage > -1) {
            this.rowsByPage = paginatedList.rowsByPage;
        }
        if (paginatedList.pageCount > -1) {
            this.pageCount = paginatedList.pageCount;
        }
        if (paginatedList.count > -1) {
            this.count = paginatedList.count;
        }
        if (paginatedList.skip > -1) {
            this.skip = paginatedList.skip;
        }
        // -------------------
        this.pageMapInfo[paginatedList.page] = {
            // this.pageMapInfo.set(paginatedList.page, {
            nextPage: paginatedList.nextPage,
            prevPage: paginatedList.prevPage,
            rowsByPage: paginatedList.rowsByPage,
            nextPageUrl: paginatedList.nextPageUrl,
            prevPageUrl: paginatedList.prevPageUrl,
            page: paginatedList.page,
            pageUrl: paginatedList.pageUrl,
            pageUrlTemplate: paginatedList.pageUrlTemplate,
            skip: paginatedList.skip,
        };
        this.notify();
    };
    PaginatedList.prototype.invalidateList = function () {
        console.warn("invalidade list need to be tested");
        // ----------
        for (var key in this.pageMapIds) {
            if (this.pageMapIds.hasOwnProperty(key)) {
                // this.pageMapIds[key] = undefined;
                delete this.pageMapIds[key];
            }
        }
        for (var key in this.pageMapInfo) {
            if (this.pageMapInfo.hasOwnProperty(key)) {
                // this.pageMapInfo[key] = undefined;
                delete this.pageMapInfo[key];
            }
        }
        // ------------
        this.notify();
    };
    return PaginatedList;
}(store_1.Store));
exports.PaginatedList = PaginatedList;
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection(store, type, idFieldName) {
        if (idFieldName === void 0) { idFieldName = "id"; }
        var _this = _super.call(this, store) || this;
        _this.paginatedLists = {};
        // public paginatedLists: Map<string, PaginatedList<TStore>> = new Map<string, PaginatedList<TStore>>();
        _this.items = {};
        // public items: Map<string, TStore> = new Map<string, TStore>();
        _this.type = null;
        _this.type = type;
        _this.idFieldName = idFieldName;
        return _this;
    }
    Object.defineProperty(Collection.prototype, "defaultCollection", {
        get: function () {
            return this.paginatedLists["default"];
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.getPaginatedList = function (name) {
        this.ensurePaginatedList(name);
        return this.paginatedLists[name];
    };
    // public setItem(item: any, parent?: Store<any>) { 
    Collection.prototype.setItem = function (item) {
        // TODO: Should I have a parent argument here? I don't know.
        if (item !== null && item !== undefined) {
            this.items[item[this.idFieldName].toString()] = new this.type(this);
            class_transformer_1.plainToClassFromExist(this.items[item[this.idFieldName].toString()], item, { enableCircularCheck: true });
            this.notify();
        }
    };
    Collection.prototype.getItem = function (id) {
        // return this.items.get(id.toString());
        return this.items[id.toString()];
    };
    Collection.prototype.removeItem = function (id) {
        var item = this.getItem(id);
        if (item !== undefined && item !== null) {
            // this.items.delete(id.toString());
            delete this.items[id.toString()];
            this.notify();
            return true;
        }
        else {
            this.notify();
            return false; // remove success
        }
    };
    Collection.prototype.removeItems = function (ids) {
        var _this = this;
        ids.forEach(function (id) {
            _this.removeItem(id);
        });
    };
    Collection.prototype.collectGarbage = function () {
        var ids = [];
        for (var name_1 in this.paginatedLists) {
            if (this.paginatedLists.hasOwnProperty(name_1)) {
                // const paginatedList = this.paginatedLists.get(name);
                var paginatedList = this.paginatedLists[name_1];
                if (paginatedList) {
                    ids = ids.concat(paginatedList.pageCollectionIds);
                }
                // ids = ids.concat(paginatedList.pageCollectionIds);
            }
        }
        for (var id in this.items) {
            if (this.items.hasOwnProperty(id)) {
                var item = this.items[id];
                // const item = this.items.get(id);
                if (ids.indexOf(id) === -1) {
                    this.removeItem(id);
                }
            }
        }
        this.notify();
    };
    Collection.prototype.ensurePaginatedList = function (name, create) {
        if (create === void 0) { create = true; }
        if (!this.paginatedLists[name]) {
            if (create) {
                // this.paginatedLists.set(name, new PaginatedList(name, this, this.idFieldName));
                this.paginatedLists[name] = new PaginatedList(name, this, this.idFieldName);
                this.notify();
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    };
    return Collection;
}(store_1.Store));
exports.Collection = Collection;
//# sourceMappingURL=store-collection.js.map
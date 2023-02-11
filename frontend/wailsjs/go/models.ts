export namespace app {
	
	export class EnvironmentInfo {
	    arch: string;
	    buildType: string;
	    platform: string;
	    hasMongoExport: boolean;
	    hasMongoDump: boolean;
	    homeDirectory: string;
	    dataDirectory: string;
	    logDirectory: string;
	
	    static createFrom(source: any = {}) {
	        return new EnvironmentInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.arch = source["arch"];
	        this.buildType = source["buildType"];
	        this.platform = source["platform"];
	        this.hasMongoExport = source["hasMongoExport"];
	        this.hasMongoDump = source["hasMongoDump"];
	        this.homeDirectory = source["homeDirectory"];
	        this.dataDirectory = source["dataDirectory"];
	        this.logDirectory = source["logDirectory"];
	    }
	}
	export class Settings {
	    defaultLimit: number;
	    defaultSort: string;
	    autosubmitQuery: boolean;
	    defaultExportDirectory: string;
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.defaultLimit = source["defaultLimit"];
	        this.defaultSort = source["defaultSort"];
	        this.autosubmitQuery = source["autosubmitQuery"];
	        this.defaultExportDirectory = source["defaultExportDirectory"];
	    }
	}
	export class findResult {
	    total: number;
	    results: string[];
	
	    static createFrom(source: any = {}) {
	        return new findResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.total = source["total"];
	        this.results = source["results"];
	    }
	}

}


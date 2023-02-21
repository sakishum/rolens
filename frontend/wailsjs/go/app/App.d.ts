// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {app} from '../models';
import {primitive} from '../models';
import {map[string]app} from '../models';
import {menu} from '../models';

export function AddHost(arg1:string):Promise<void>;

export function Aggregate(arg1:string,arg2:string,arg3:string,arg4:string,arg5:string):Promise<void>;

export function Beep():Promise<void>;

export function CreateIndex(arg1:string,arg2:string,arg3:string,arg4:string):Promise<string>;

export function DropCollection(arg1:string,arg2:string,arg3:string):Promise<boolean>;

export function DropDatabase(arg1:string,arg2:string):Promise<boolean>;

export function DropIndex(arg1:string,arg2:string,arg3:string,arg4:string):Promise<boolean>;

export function EnterText(arg1:string,arg2:string,arg3:string):Promise<string>;

export function Environment():Promise<app.EnvironmentInfo>;

export function FindItems(arg1:string,arg2:string,arg3:string,arg4:string):Promise<app.QueryResult>;

export function GetIndexes(arg1:string,arg2:string,arg3:string):Promise<Array<primitive.M>>;

export function Hosts():Promise<map[string]app.Host>;

export function InsertItems(arg1:string,arg2:string,arg3:string,arg4:string):Promise<any>;

export function Menu():Promise<menu.Menu>;

export function OpenCollection(arg1:string,arg2:string,arg3:string):Promise<primitive.M>;

export function OpenConnection(arg1:string):Promise<Array<string>>;

export function OpenDatabase(arg1:string,arg2:string):Promise<Array<string>>;

export function OpenDirectory(arg1:string,arg2:string):Promise<string>;

export function PerformExport(arg1:string):Promise<boolean>;

export function PurgeLogDirectory():Promise<void>;

export function RemoveHost(arg1:string):Promise<void>;

export function RemoveItemById(arg1:string,arg2:string,arg3:string,arg4:string):Promise<boolean>;

export function RemoveItems(arg1:string,arg2:string,arg3:string,arg4:string,arg5:boolean):Promise<number>;

export function RemoveQuery(arg1:string):Promise<void>;

export function RemoveView(arg1:string):Promise<void>;

export function RenameCollection(arg1:string,arg2:string,arg3:string,arg4:string):Promise<boolean>;

export function SaveQuery(arg1:string):Promise<string>;

export function SavedQueries():Promise<map[string]app.SavedQuery>;

export function Settings():Promise<app.Settings>;

export function TruncateCollection(arg1:string,arg2:string,arg3:string):Promise<boolean>;

export function UpdateHost(arg1:string,arg2:string):Promise<void>;

export function UpdateItems(arg1:string,arg2:string,arg3:string,arg4:string):Promise<number>;

export function UpdateQueries(arg1:string):Promise<boolean>;

export function UpdateSettings(arg1:string):Promise<app.Settings>;

export function UpdateViewStore(arg1:string):Promise<void>;

export function Views():Promise<app.ViewStore>;

// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {map[string]main} from '../models';
import {primitive} from '../models';
import {main} from '../models';

export function Hosts():Promise<map[string]main.Host>;

export function OpenCollection(arg1:string,arg2:string,arg3:string):Promise<primitive.M>;

export function OpenConnection(arg1:string):Promise<Array<string>>;

export function OpenDatabase(arg1:string,arg2:string):Promise<Array<string>>;

export function PerformFind(arg1:string,arg2:string,arg3:string,arg4:string):Promise<main.findResult>;

export function PerformInsert(arg1:string,arg2:string,arg3:string,arg4:string):Promise<any>;

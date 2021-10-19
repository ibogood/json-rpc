export interface ICallbackMapValue {
    resolve: (result: any) => void;
    reject: (error: any) => void;
}
export declare const CLIENT_TYPE = "client_rpc";
export declare const SERVER_TYPE = "server_rpc";
export default class Message {
    static generateId(): string;
    static isClientRPC(message: any): boolean;
    static isServerRPC(message: any): boolean;
}

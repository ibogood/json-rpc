export default class RPCClient {
    server: Window;
    static callbackMap: Map<any, any>;
    static isListener: boolean;
    constructor(server: Window);
    static onMessage(event: any): void;
    send(method: string, params: any): string;
    resolve(id: string, result: any): void;
    reject(id: string, error: any): void;
    static destroyAll(): void;
    run(method: string, ...params: any[]): Promise<unknown>;
}

export interface IHandler {
    [key: string]: (...args: any) => any;
}
export interface IMessage {
    status: 'resolve' | 'reject';
    data: string | any;
}
export default class RPCServer {
    static handlers: IHandler;
    static isListener: boolean;
    static onMessage(event: any): Promise<void>;
    static export(handlers: IHandler): typeof RPCServer;
    static addHandlers(handlers: IHandler): void;
    static addHandler(key: string, value: (...args: any) => any): void;
    static listen(): void;
}

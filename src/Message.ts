export interface ICallbackMapValue {
  resolve: (result: any) => void;
  reject: (error: any) => void;
}
export const CLIENT_TYPE = 'client_rpc'
export const SERVER_TYPE = 'server_rpc'
export default class Message {
  static generateId() {
    return Date.now() + Math.random()
  }
  static isClientRPC(message: any) {
    return Object.prototype.toString.call(message) === '[object Object]' && message.type === CLIENT_TYPE
  }
  static isServerRPC(message: any) {
    return Object.prototype.toString.call(message) === '[object Object]' && message.type === SERVER_TYPE
  }
}
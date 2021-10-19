import Message, { SERVER_TYPE } from "./Message"

export interface IHandler {
  [key: string]: (...args: any) => any;
}
export interface IMessage {
  status: 'resolve' | 'reject';
  data: string | any;
}
export default class RPCServer {
  static handlers: IHandler = {}
  static isListener = false
  static async onMessage(event: any) {
    const {
      data: message = {},
      origin,
      source
    } = event
    if (!Message.isClientRPC(message)) {
      return
    }
    const handlers = RPCServer.handlers
    const {
      method,
      params,
      id
    } = message
    const rtnMessage: IMessage = {
      status: 'reject',
      data: `${method}方法不存在`
    }
    if (method in handlers) {
      try {
        const result = await handlers[method](...params)
        rtnMessage.status = 'resolve'
        rtnMessage.data = result
      } catch (e) {
        rtnMessage.status = 'reject'
        rtnMessage.data = String(e)
      }
    } 
    source.postMessage({
      type: SERVER_TYPE,
      id,
      ...rtnMessage
    }, origin)
  }
  static export(handlers: IHandler) {
    RPCServer.addHandlers(handlers)
    return RPCServer
  }
  static addHandlers(handlers: IHandler) {
    RPCServer.handlers = {
      ...RPCServer.handlers,
      ...handlers
    }
  }
  static addHandler(key: string, value: (...args: any) => any) {
    RPCServer.handlers[key] = value
  }
  static listen() {
    if (!RPCServer.isListener) {
      window.addEventListener('message', RPCServer.onMessage, false)
      RPCServer.isListener = true
    }
  }
}
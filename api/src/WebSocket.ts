// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { connection, server } from 'websocket';

export class WebSocket {

  protected _websocketServer: server;

  private static _instance: WebSocket = {} as WebSocket;

  constructor(websocketserver: server) {

    if (WebSocket._instance instanceof WebSocket) {
      throw Error(
        'WebSocket: The instance of WebSocket exists. Use WebSocket.getInstance() instead',
      );
    }

    this._websocketServer = websocketserver;

    WebSocket._instance = this;
  }

  public static getInstance() {
    if (WebSocket._instance) {
      return WebSocket._instance;
    }

    throw new Error('WebSocket: The instance of WebSocket doens\'t exists.');
  }

  public onConnection(): Promise<connection> {
    const connectionPromise: Promise<connection> = new Promise((resolve) => {
      this._websocketServer.on('connect', (connection: connection) => {
        resolve(connection);
      });
    });

    return connectionPromise;
  }

  public broadcast(data: {[key: string]: any}) {
    this._websocketServer.broadcast(JSON.stringify(data));
  }

  protected sendFilter(data: JSON) {
    if ('filter' in data) {
      this._websocketServer.broadcast(JSON.stringify(data));
    }
  }
}

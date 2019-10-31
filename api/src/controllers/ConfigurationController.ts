// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { AbstractController } from './AbstractController';
import { JsonController, Get, Req, Res, Post, Body } from 'routing-controllers';
import { Response, Request } from 'express-serve-static-core';
import { Filter } from '../model/Filter';
import { WebSocket } from '../WebSocket';

@JsonController()
export class ConfigurationController extends AbstractController {

  protected filterModel: Filter = new Filter();

  constructor() {
    super();
  }

  @Get('/configuration')
  public index(@Req() req: Request, @Res() res: Response) {
    return this.filterModel;
  }

  @Post('/configuration')
  public async save(@Body() body: {[key:string]: any}, @Req() request: Request) {

    const { level, source, regularExpression } = body;
    this.filterModel = new Filter(level, source, regularExpression);

    const websocket = WebSocket.getInstance();

    websocket.broadcast({
      filter: { ...this.filterModel },
    });

    return this.filterModel;
  }
}

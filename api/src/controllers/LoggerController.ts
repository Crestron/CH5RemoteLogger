// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { Post, Body, Res, JsonController, Req } from 'routing-controllers';
import { AbstractController } from './AbstractController';
import { Request } from 'express';
import { Message } from '../model/Message';
import { TLog } from '../types';
import { IAppender } from '../appenders/IAppender';

@JsonController()
export class LoggerController extends AbstractController {

  @Post('/log')
  public post(@Body() message: TLog, @Req() request: Request) {
    const messageModel = new Message(message);
    const appenders: IAppender[] = request.app.get('logAppenders');

    appenders.forEach((appender) => {
      appender.append(messageModel);
    });

    return `${messageModel}`;
  }
}

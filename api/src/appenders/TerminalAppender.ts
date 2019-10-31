// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { IAppender } from './IAppender';
import { ConsoleMessageFormat } from '../format/ConsoleMessageFormat';
import { Message } from '../model/Message';

export class TerminalAppender implements IAppender {

  public append(message: Message) {

    const level = message.level;
    let logMethod = console.log;

    if (level === 1) {
      logMethod = console.info;
    } else if (level === 2) {
      logMethod = console.warn;
    } else if (level === 3) {
      logMethod = console.error;
    }

    const consoleMessage = new ConsoleMessageFormat(message);

    logMethod(consoleMessage.getMessage());
  }

}

// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { AbstractMessageFormat } from './AbstractMessageFormat';

export class ConsoleMessageFormat extends AbstractMessageFormat {

  protected formatMessage() {

    let message = this._message.toString();

    if (this._message.level === 1) {
      message = `\x1b[34m${this._message.toString()}\x1b[0m`;
    } else if (this._message.level === 2) {
      message = `\x1b[33m${this._message.toString()}\x1b[0m`;
    } else if (this._message.level === 3) {
      message = `\x1b[31m${this._message.toString()}\x1b[0m`;
    }

    return message;
  }
}

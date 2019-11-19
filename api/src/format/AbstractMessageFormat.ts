// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { Message } from '../model/Message';

export abstract class AbstractMessageFormat {

  protected readonly _message: Message;

  constructor(message: Message) {
    this._message = message;
  }

  public getMessage(): string {
    return this.formatMessage();
  }

  public get message(): Message {
    return this._message;
  }

  protected abstract formatMessage(): string;

}

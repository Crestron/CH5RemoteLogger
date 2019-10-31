// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Message } from '../../../src/model/Message';

const date = new Date('09/07/2019 12:50:51 UTC');
const message = 'This is a simple log message';

describe('Message model test suite', () => {

  it('empty message throws Exception', () => {
    const messageObject = () => new Message({
      date,
      level: 1,
      message: '',
    });

    assert.throws(messageObject, 'Message is invalid!');
  });

  it('null date throws Exception', () => {
    const messageObject = () => new Message({
      level: 1,
      message: 'Log me',
      date: null,
    })
    assert.throws(messageObject, 'Time is invalid');
  });

  it('level higher than 3 throws Exception', () => {
    const messageObject = () => new Message({
      date,
      message,
      level: 4,
    });

    assert.throws(messageObject, 'Level is higher than 3. Keep it in the range of 0-3');
  });

  it('level lower than 0 throws Exception', () => {
    const messageObject = () => new Message({
      date,
      message,
      level: -1,
    });

    assert.throws(messageObject, 'Given level is invalid. Keep it in the range of 0-3');
  });

  it('toString() should return well formatted message', () => {
    const messageToCheck = `12:50:51 07/09/2019 ${message}`;
    const messageObject = new Message({
      date,
      message,
      level: 0,
    });

    assert.equal(messageObject.toString(), messageToCheck);
  });

  it('toString() should return well formatted message with Z format', () => {
    const messageToCheck = `12:50:51 09/07/2019 ${message}`;
    const date = new Date('2019-07-09T12:50:51.372Z');
    const messageObject = new Message({
      date,
      message,
      level: 0,
    });

    assert.equal(messageObject.toString(), messageToCheck);
  });
});

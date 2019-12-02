// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { describe, it } from 'mocha';
import { assert } from 'chai';

import { Message } from '../../../src/model/Message';
import { FileAppender } from "../../../src/appenders/FileAppender";
import { FileWriterMock } from "../../mocks/FileWriterMock";
import { TLog } from "../../../src/types";
import { ElogLevel } from "../../../src/enums";

const fileWriterMock = new FileWriterMock();
const fileAppender = new FileAppender(fileWriterMock);

const logData: TLog = {message: "This is a test message", date: new Date(), level: ElogLevel.WARN}
const testMessage = new Message(logData);

describe('FileAppender tests suite', () => {

    beforeEach(() => {
        fileWriterMock.clearWrittenData();
    });

    it('Write method of the fileWriter is called with data', () => {
        fileAppender.append(testMessage);

        assert.equal(fileWriterMock.called, 1);
        assert.equal(fileWriterMock.dataWritten, testMessage.toString());
    });
});

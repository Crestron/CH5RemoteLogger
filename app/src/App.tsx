// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import React, { Component } from 'react';
import Form from './components/Form/Form';
import './App.css';

class App extends Component {
  render() {
    const version = process.env.REMOTE_LOGGER_VERSION;

    return (
      <div className="App">
        <Form />
        <p className="text-center">
          CH5RemoteLogger version {version ? ` ${version}.` : ` not defined.`}  
        </p>
      </div>
    );
  }
}

export default App;

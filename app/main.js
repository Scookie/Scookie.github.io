import React from 'react';
import {render} from 'react-dom';
import Login from './pages/login/Login';
import Index from './pages/index/Index';

import './main.css';
import './src/style/font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css';

render(<Index />, document.getElementById('root'));
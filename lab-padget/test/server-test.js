'use strict';
// 7. server tests.

const server = require('../server'); // eslint-disable-line
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect; // eslint-disable-line

chai.use(http);

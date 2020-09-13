'use strict';

require('dotenv').config();

const config = {
  // Application configuration
  PORT: process.env.PORT || 9000,
  BASE_PATH: process.env.BASE_PATH || '/api/v1',
  TIMESTAMP: new Date().toTimeString(),

  CUBE_EVENTS: {
    ROTATION_UPDATED: 'cube.rotation_updated',
    COLOR_UPDATED: 'cube.color_updated'
  },
};

module.exports = config;

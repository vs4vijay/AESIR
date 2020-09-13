#!/usr/bin/env node
'use strict';

const express = require('express');
const logger = require('pino')();

const config = require('./config');
const { HealthCheckController } = require('./controllers');

const app = express();

app.use(express.json());

// Root Route
app.use('/', express.static('public'));

app.get(`${config['BASE_PATH']}/healthz`, HealthCheckController.healthCheck);

// Handle 404 Routes
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

// Error Handler
app.use(function(error, req, res, next) {
  logger.error(error.stack, error.message);

  const response = {
    success: false,
    errors: error.stack
  };
  res.status(500).json(response);
});

if (require.main == module) {
  const server = app.listen(config['PORT'], () => {
    logger.info(`Service has started on port ${config['PORT']}`);
  });

  const io = require('socket.io')(server);

  io.sockets.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on(config.CUBE_EVENTS.ROTATION_UPDATED, data => {
      logger.info(data, config.CUBE_EVENTS.ROTATION_UPDATED);
      socket.broadcast.emit(config.CUBE_EVENTS.ROTATION_UPDATED, data);
    });

    socket.on(config.CUBE_EVENTS.COLOR_UPDATED, data => {
      logger.info(data, config.CUBE_EVENTS.COLOR_UPDATED);
      socket.broadcast.emit(config.CUBE_EVENTS.COLOR_UPDATED, data);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    })
  });

}

process.on('SIGINT', function () {
  process.exit();
});

module.exports = {
  app
};

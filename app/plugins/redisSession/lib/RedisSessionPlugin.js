const Redis = require('ioredis');

class RedisSessionPlugin {
  didLoadFramework() {
    this.client = null;
  }

  async connectDependencies(app) {
    log('system', 'info', { messsage: 'connecting RedisSession' });

    if (process.env.SESSION_REDIS_CLUSTERED === 'true') {
      this.client = new Redis.Cluster(
        [
          {
            host: process.env.SESSION_REDIS_HOST,
            port: process.env.SESSION_REDIS_PORT,
          },
        ],
        {
          clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2000),
          enableReadyCheck: true,
          scaleReads: 'slave',
        },
      );
    } else {
      this.client = new Redis({
        host: process.env.SESSION_REDIS_HOST,
        port: process.env.SESSION_REDIS_PORT,
      });
    }

    app.context.redisSession = this.client; // eslint-disable-line no-param-reassign

    log('system', 'info', { messsage: 'RedisSession connected' });

    return this;
  }

  async disconnectDependencies() {
    log('system', 'info', { messsage: 'disconnecting RedisSession' });

    await this.client.quit();

    log('system', 'info', { messsage: 'RedisSession disconnected ' });
  }
}

module.exports = RedisSessionPlugin;

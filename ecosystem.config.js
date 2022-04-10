
module.exports = {
  apps: [
    {
      name: 'api',
      script: './src/server.js',
      exec_mode: 'cluster',
      instances: 'max',
      kill_timeout: 10 * 1000, // 10초
      wait_ready: true, // 시작시 ready 이벤트 대기
      listen_timeout: 3000, // 시작시 ready 이벤트 대기 timeout
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'batch',
      script: './src/server-batch.js',
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'deploy',
      host: 'ec2-3-34-149-218.ap-northeast-2.compute.amazonaws.com',
      ref: 'origin/main',
      repo: 'git@github.com:5712labs/o7ol369.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/home/deploy/o7ol369',
      'pre-deploy-local': '',
      'post-deploy': "yarn install && pm2 reload ecosystem.config.js --env production --only 'api,batch'",
      'pre-setup': 'npx dotenv -e .env npm run build --clean',
    },
  },
};

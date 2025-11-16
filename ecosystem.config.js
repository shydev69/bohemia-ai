module.exports = {
  apps: [
    {
      name: "bohemia-web",
      cwd: "./apps/web",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
    {
      name: "bohemia-api",
      cwd: "./apps/api",
      script: "node",
      args: "dist/server.js",
      env: {
        NODE_ENV: "production",
        PORT: "8080",
      },
    },
  ],
};

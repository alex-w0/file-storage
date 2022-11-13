module.exports = async () => {
  console.info('Closing the app...');

  await global.__SERVICE__.AWS_CLIENT.deleteAllS3Files(global.__BUCKET_NAME__);

  await global.__APP__.close();
  process.exit(0);
};

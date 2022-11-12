module.exports = async () => {
  console.info('Closing the app...');

  await global.__APP__.close();
  process.exit(0);
};

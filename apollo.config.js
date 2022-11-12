module.exports = {
  client: {
    service: {
      name: 'storage-api',
      localSchemaFile: 'storage-api/src/schema.gql',
    },
    // Files processed by the extension
    includes: [
      "storage-ui/src/**/*.vue",
      "storage-ui/src/**/*.ts",
      "storage-ui/src/**/*.graphql",
      "storage-api/test/**/*.e2e-spec.ts"
    ],
  },
};

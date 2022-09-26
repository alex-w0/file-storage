module.exports = {
  client: {
    service: {
      name: "storage-api",
      // URL to the GraphQL API
      url: "http://localhost:3000/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.ts"],
    excludes: ["src/**/*.spec.ts"],
  },
};

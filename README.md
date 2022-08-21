# File storage

## Redis client key structure
`validBucketNames` -> Contains the information about all existing buckets on AWS
`{bucketName}:s3:{uuid}` -> Contains the information about a specific file object on AWS
`{bucketName}:s3Keys` -> A list about all existing s3 keys 

## Tools
Redis client: https://resp.app/

## Postman File upload example

POST Request
Endpoint: http://localhost:3000/graphql

Add body -> form-data

Key (type text): `operations`
Value:
```json
{
  "operationName": "uploadFile",
  "variables": {
      "bucketNameArguments": {
          "bucketName": "your-bucket-name"
      }
  },
  "query": "mutation uploadFile($bucketNameArguments: BucketNameArgs!, $file: Upload!) {\n  uploadFile(\n    bucketNameArguments: $bucketNameArguments\n    data: {name: \"test\", file: $file}\n  ) {\n    s3ObjectKey\n    updatedAt\n  }\n}\n"
}
```

Key (type text): `map`
Value: 
```json
{"0": ["variables.file"]}
```

Key (type file): `0` 
Value: `Image.jpg`
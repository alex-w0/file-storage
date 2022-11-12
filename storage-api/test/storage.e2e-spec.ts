import * as request from 'supertest';
import gql from 'graphql-tag';
import { print } from 'graphql';

describe('StorageResolver (e2e)', () => {
  describe('Testing the endpoint files', () => {
    const E2E_GET_ALL_FILES = gql`
      query e2eGetAllFiles($bucketNameArguments: BucketNameArgs!) {
        files(bucketNameArguments: $bucketNameArguments) {
          ... on StorageImage {
            uuid
            s3ObjectKey
            eTag
            createdAt
            url
            updatedAt
          }

          ... on StorageDirectory {
            uuid
            metaData {
              name
            }
          }
        }
      }
    `;

    it('Should return an error when an invalid bucketName was used', async () => {
      const response = await request(global.__APP__.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            bucketNameArguments: {
              bucketName: 'invalidBucket',
            },
          },
          query: print(E2E_GET_ALL_FILES),
        })
        .expect(200);

      expect(response.body).toEqual({
        errors: [
          {
            message: 'Bad Request Exception',
            extensions: {
              code: 'BAD_USER_INPUT',
              response: {
                statusCode: 400,
                message: ['Bucket name does not exist'],
                error: 'Bad Request',
              },
            },
          },
        ],
        data: null,
      });
    });
  });
});

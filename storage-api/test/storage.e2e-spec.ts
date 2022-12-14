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

  describe('Testing the endpoint createDirectory', () => {
    const E2E_CREATE_DIRECTORY = gql`
      mutation e2eCreateDirectory(
        $bucketNameArguments: BucketNameArgs!
        $createDirectoryArguments: CreateDirectoryInput!
      ) {
        createDirectory(
          bucketNameArguments: $bucketNameArguments
          data: $createDirectoryArguments
        ) {
          uuid
          s3ObjectKey
          parentDirectoryUuid
          eTag
          createdAt
          updatedAt
          metaData {
            name
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
            createDirectoryArguments: {
              name: 'directory 1',
            },
          },
          query: print(E2E_CREATE_DIRECTORY),
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

    it('Should create a directory', async () => {
      const response = await request(global.__APP__.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            bucketNameArguments: {
              bucketName: global.__BUCKET_NAME__,
            },
            createDirectoryArguments: {
              name: 'directory 34',
            },
          },
          query: print(E2E_CREATE_DIRECTORY),
        })
        .expect(200);

      const record = response.body.data.createDirectory;

      expect(record.uuid).toBeDefined();

      const storageFile = await global.__SERVICE__.REDIS_CLIENT.getFile(
        global.__BUCKET_NAME__,
        record.uuid,
      );

      expect(response.body).toEqual({
        data: {
          createDirectory: {
            uuid: storageFile.uuid,
            eTag: storageFile.eTag,
            s3ObjectKey: storageFile.s3ObjectKey,
            parentDirectoryUuid: null,
            createdAt: storageFile.createdAt.toISOString(),
            updatedAt: null,
            metaData: storageFile.metaData,
          },
        },
      });
    });
  });
});

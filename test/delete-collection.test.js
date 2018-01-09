import { expect, assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('delete-collection', () => {
  const args = { collectionId: 'collectionTest1' };

  it('with valid collection name', (done) => {
    run('delete-collection', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res, 'mimetype', 'application/json');
        assert.propertyVal(res.data, 'statusCode', 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('with collection name that does not exist', (done) => {
    const argsWithNonExistingName = { collectionId: 'nonExistingName' };

    run('delete-collection', { args: argsWithNonExistingName, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.propertyVal(res, 'mimetype', 'application/json');
        assert.propertyVal(res.data, 'code', 'ResourceNotFoundException');
        assert.propertyVal(
          res.data,
          'message',
          'The collection id: nonExistingName does not exist'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('without collection name', (done) => {
    const argsWithoutData = {};

    run('delete-collection', { args: argsWithoutData, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.propertyVal(res, 'mimetype', 'application/json');
        assert.propertyVal(res.data, 'code', 'MissingRequiredParameter');
        assert.propertyVal(res.data, 'message', 'Missing required key \'CollectionId\' in params');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

import Syncano from 'syncano-server';

import Rekognition from './utils/Rekognition';

export default (ctx) => {
  const {response} = Syncano(ctx);

  const awsRekognitionClass = new Rekognition(ctx.config);

  return awsRekognitionClass.createCollection(ctx.args.collectionId)
    .then((res) => {
      response.json({
        collectionArn: res.CollectionArn,
        statusCode: res.StatusCode
      });
    })
    .catch((err) => {
      response.json({
        statusCode: err.statusCode,
        code: err.code,
        message: err.message
      }, 400);
    });
};

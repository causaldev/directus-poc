module.exports = (router, ctx) => {
  const { ItemsService } = ctx.services;
  const { ServiceUnavailableException } = ctx.exceptions;
  router.get('/', (req, res, next) => {
    const articleService = new ItemsService('articles', {
      schema: req.schema,
      accountability: req.accountability,
    });
    articleService
      .readByQuery({ sort: ['title'], fields: ['*'] })
      .then((results) =>
        res.json(results.map((i) => ({ ...i, titleLength: i.title.length })))
      )
      .catch((error) => {
        return next(new ServiceUnavailableException(error.message));
      });
  });
};

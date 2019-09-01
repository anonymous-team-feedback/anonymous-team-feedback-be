exports.handlePaginationParams = req => {
  const startInt = parseInt(req.query.start);
  const limitInt = parseInt(req.query.limit);
  const currentUrl = req.protocol + "://" + req.get("host");
  switch (true) {
    case limitInt === 0:
      return {
        responseCode: 400,
        message: "Limit param must be greater than zero"
      };
    case startInt < limitInt || startInt % limitInt != 0:
      return {
        responseCode: 400,
        json: {
          message:
            "Start param must greater than or equal to limit and divisible by it"
        }
      };
    default:
      return {
        responseCode: 200,
        json: {
          pagination: {
            next: `${currentUrl}/api/posts/?limit=${limitInt}?start=${startInt +
              limitInt}`,
            prev: `${currentUrl}/api/posts/?limit=${limitInt}?start=${startInt -
              limitInt}`
          }
        }
      };
  }
};

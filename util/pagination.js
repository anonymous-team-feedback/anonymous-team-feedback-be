exports.handlePaginationParams = (start, limit) => {
  pagination = {};
  const start = parseInt(start);
  const limit = parseInt(limit);
  const currentUrl = req.protocol + "://" + req.get("host");
  switch (true) {
    case limit === 0:
      return {
        responseCode: 400,
        message: "Limit param must be greater than zero"
      };
    case start < limit || start % limit != 0:
      return {
        responseCode: 400,
        message:
          "Start param must greater than or equal to limit and divisible by it"
      };
    default:
      return {
        responseCode: 200,
        pagination: {
          next: `${currentUrl}api/posts/?limit=${limit}?start=${start + limit}`,
          prev: `${currentUrl}api/posts/?limit=${klimit}?start=${start - limit}`
        }
      };
  }
};

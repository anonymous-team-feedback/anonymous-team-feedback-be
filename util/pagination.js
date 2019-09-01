exports.handlePaginationParams = (req, posts) => {
  const path = req.originalUrl.split("?").shift();
  const startInt = parseInt(req.query.start);
  const limitInt = parseInt(req.query.limit);
  const currentUrl = req.protocol + "://" + req.get("host");
  const prev = `${currentUrl}${path}?limit=${limitInt}?start=${startInt -
    limitInt}`;
  const next = `${currentUrl}${path}?limit=${limitInt}?start=${startInt +
    limitInt}`;

  switch (true) {
    case limitInt === 0:
      return {
        responseCode: 400,
        json: {
          message: "Limit param must be greater than zero"
        }
      };
    case startInt < limitInt || startInt % limitInt != 0:
      return {
        responseCode: 400,
        json: {
          message:
            "Start param must greater than or equal to limit and divisible by it"
        }
      };
    case posts.length < limitInt:
      return {
        responseCode: 200,
        json: {
          pagination: {
            prev
          }
        }
      };
    case posts.findIndex(post => post) < limitInt:
      return {
        responseCode: 200,
        json: {
          pagination: {
            next
          }
        }
      };
    default:
      return {
        responseCode: 200,
        json: {
          pagination: {
            next,
            prev
          }
        }
      };
  }
};

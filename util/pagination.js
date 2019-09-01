exports.handlePaginationParams = (req, posts) => {
   //define the path we're on using the req so we can use it to give a url later 
  const path = req.originalUrl.split("?").shift();
  //make sure the params we're being given by the user are ints
  const startInt = parseInt(req.query.start);
  const limitInt = parseInt(req.query.limit);
  //build our current url from the req
  const currentUrl = req.protocol + "://" + req.get("host");
  //build the urls we're going to give back
  const prev = `${currentUrl}${path}?limit=${limitInt}?start=${startInt -
    limitInt}`;
  const next = `${currentUrl}${path}?limit=${limitInt}?start=${startInt +
    limitInt}`;

  switch (true) {
    case limitInt === 0:
      return {
        responseCode: 400,
        message: "Limit param must be greater than zero"
      };
    case startInt < limitInt || startInt % limitInt != 0:
      return {
        responseCode: 400,
        message:
          "Start param must greater than or equal to limit and divisible by it"
      };
    case posts.length < limitInt:
      return {
        responseCode: 200,
        pagination: {
          prev
        }
      };
    case posts.findIndex(post => post) < limitInt:
      return {
        responseCode: 200,
        pagination: {
          next
        }
      };
    default:
      return {
        responseCode: 200,
        pagination: {
          next,
          prev
        }
      };
  }
};

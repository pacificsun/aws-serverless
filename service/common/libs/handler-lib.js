export default function handler(lambda) {
  return function (event) {
    return (
      Promise.resolve()
        // Run the Lambda
        .then(() => lambda(event))
        // On success
        .then((responseBody) => [200, responseBody])
        // On failure
        .catch((e) => {
          console.log(e); // Print debug messages
          return [500, { error: e.message }];
        })
    );
  };
}

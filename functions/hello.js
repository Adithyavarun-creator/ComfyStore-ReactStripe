const items = [
  {
    id: 1,
    name: "Mike",
  },
  {
    id: 2,
    name: "Tyson",
  },
];

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

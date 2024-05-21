const Jasmine = require("../../../bundle");

Jasmine.run(
  (api) => {
    console.log("Test interface:", Object.keys(api));
    Object.assign(global, api);
    require("./actual-test");
  },
  {
    randomizeTests: false,
    showColors: false,
  }
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

const { createSandbox } = require('./sandbox');

nameOutside = 'name from outside box';

const code = `
  with(this) {
    const name = 'name from sandBox';
    console.log(name);
    console.log(nameOutside);
    console.log(nameNotdefined);
  }
`;

const options = {
  inject: {
    nameInject: 'name from injected'
  },
};

const sandbox = createSandbox(options);

sandbox.run(code);

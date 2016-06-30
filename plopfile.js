module.exports = function(plop) {
  plop.addHelper('upperCase', (txt) => txt.toUpperCase());
    // create your generators here
  plop.setGenerator('reducer', {
    description: 'Reducer Skeleton',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '[What is your reducer name?]',
      validate: function(value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    },
    {
      type: 'input',
      name: 'actionType',
      message: '[What is your first action type name?]',
      validate: function(value) {
        if ((/.+/).test(value)) { return true; }
        return 'actionType is required';
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/reducers/{{camelCase name}}Reducer.js',
      templateFile: 'generators/templates/reducer.js'
    },
    {
      type: 'add',
      path: 'src/reducers/{{camelCase name}}Reducer_test.js',
      templateFile: 'generators/templates/reducerTest.js'
    }]
  });
};
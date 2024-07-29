const { default: JsonschemaEditor } = _JsonschemaEditor;
const BaseExample = () => {
  return (
    <JsonschemaEditor
      defaultValue={{
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'Example user object',
        description: 'This is an example user object used to explain the importance of JSON Schema.',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'This is the ID of the user',
            format: 'UUID'
          },
          name: {
            type: 'string',
            description: 'This is the full name of the user'
          },
          age: {
            type: 'number',
            description: 'This is the age of the user. We only allow adult users.',
            minimum: 18
          },
          address: {
            type: 'object',
            properties: {
              streetAddress: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              zipcode: { type: 'string' },
              country: { type: 'string' }
            },
            required: ['streetAddress', 'city', 'state', 'zipcode', 'country']
          },
          interests: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['sports', 'music', 'movies', 'books']
            }
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          }
        },
        required: ['id', 'name', 'address']
      }}
      onChange={value => {
        console.log(value);
      }}
    />
  );
};

render(<BaseExample />);

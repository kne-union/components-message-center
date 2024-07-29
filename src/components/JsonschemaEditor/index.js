import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef } from 'react';
import JsonschemaFormInner from './JsonschemaFormInner';

export { JsonschemaFormInner };

const JsonschemaEditor = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules, defaultValue, onChange }) => {
  const [Form] = remoteModules;
  const ref = useRef(null);
  return (
    <Form
      ref={ref}
      data={{ jsonschema: JsonschemaFormInner.inputJsonschema(defaultValue) }}
      onFormDataChange={formData => {
        onChange && onChange(JsonschemaFormInner.outputJsonschema(formData.jsonschema));
      }}
    >
      <JsonschemaFormInner name="jsonschema" />
    </Form>
  );
});

export default JsonschemaEditor;

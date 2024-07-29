import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef } from 'react';
import JsonschemaFormInner from './JsonschemaFormInner';

const JsonschemaEditor = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules, defaultValue, onChange }) => {});

export default JsonschemaEditor;

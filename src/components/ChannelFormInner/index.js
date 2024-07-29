import style from './style.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import EmailFormInner from './EmailFormInner';
import MSMFormInner from './MSMFormInner';

const ChannelFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Input } = FormInfo.fields;
  return (
    <>
      <FormInfo list={[<Input name="name" label="名称" rule="REQ" />, <Input name="code" label="Code" rule="REQ" />]} />
      <EmailFormInner />
      <MSMFormInner />
    </>
  );
});

export default ChannelFormInner;

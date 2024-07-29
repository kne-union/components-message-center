import { createWithRemoteLoader } from '@kne/remote-loader';
import { Switch } from 'antd';
import { useState } from 'react';

const EmailFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [open, setOpen] = useState(true);
  const [FormInfo] = remoteModules;
  const { Input } = FormInfo.fields;
  return (
    <FormInfo
      title="邮件"
      subTitle="请填写smtp协议参数且确保邮箱打开的smtp"
      column={1}
      extra={<Switch checked={open} onChange={setOpen} />}
      list={
        open
          ? [<Input name="host" label="Host" rule="REQ" />, <Input name="port" label="Port" rule="REQ" value="465" />, <Input name="auth.user" label="User" rule="REQ" />, <Input.Password name="auth.pass" label="Password" rule="REQ" />]
          : []
      }
    />
  );
});

export default EmailFormInner;

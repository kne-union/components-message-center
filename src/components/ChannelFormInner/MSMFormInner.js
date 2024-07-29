import { createWithRemoteLoader } from '@kne/remote-loader';
import { useState } from 'react';
import { Switch } from 'antd';
import get from 'lodash/get';

const EmailFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [open, setOpen] = useState(true);
  const [FormInfo] = remoteModules;
  const { TableList } = FormInfo;
  const { Input, Select, Switch: FormSwitch } = FormInfo.fields;

  const renderParams = ({ title, name }) => {
    return (
      <TableList
        key={name}
        title={title}
        name={name}
        defaultLength={0}
        list={(key, { index }, context) => {
          const isSecretKey = get(context.formData, `${name}[${index}].isSecretKey`);
          const ValueComponent = isSecretKey ? Input.Password : Input;
          return [<Input name="key" label="key" rule="REQ" />, <ValueComponent name="value" label="value" rule="REQ" />, <FormSwitch name="isSecretKey" label="是否密钥" />];
        }}
      />
    );
  };

  return (
    <FormInfo
      title="短信"
      column={1}
      extra={<Switch checked={open} onChange={setOpen} />}
      list={
        open
          ? [
              <Input name="url" label="URL" rule="REQ" />,
              <Select
                name="method"
                label="Method"
                rule="REQ"
                options={[
                  { value: 'GET', label: 'GET' },
                  { value: 'POST', label: 'POST' },
                  {
                    value: 'PUT',
                    label: 'PUT'
                  },
                  { value: 'DELETE', label: 'DELETE' },
                  {
                    value: 'HEAD',
                    label: 'HEAD'
                  },
                  { value: 'PATCH', label: 'PATCH' }
                ]}
              />,
              ...[
                {
                  title: 'Headers',
                  name: 'headers'
                },
                {
                  title: 'Query',
                  name: 'query'
                },
                {
                  title: 'Body',
                  name: 'body'
                }
              ].map(item => renderParams(item))
            ]
          : []
      }
    />
  );
});

export default EmailFormInner;

import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import transform from 'lodash/transform';

const ListOuter = ({ children, ...props }) => {
  return children;
};

const JsonschemaFormCore = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@useGroup', 'components-core:FormInfo@useFormContext', 'components-core:FormInfo@formUtils', 'components-core:FormInfo@Group']
})(({ remoteModules, ...props }) => {
  const [FormInfo, useGroup, useFormContext, formUtils, Group] = remoteModules;
  const group = useGroup();
  const { formState } = useFormContext();
  const { List } = FormInfo;
  const { Select, Switch, Input, InputNumber, RadioGroup } = FormInfo.fields;

  const typeField = formUtils.getField(formState, {
    name: 'type',
    groupName: get(group, 'name'),
    groupIndex: get(group, 'index')
  });

  const typeComponentsMap = {
    object: [
      <Input name="propertyNames.pattern" label="属性名称正则表达式" />,
      <InputNumber name="minProperties" label="最小属性个数" />,
      <InputNumber name="maxProperties" label="最大属性个数" />,
      <List
        name="properties"
        title="属性"
        minLength={1}
        isUnshift={false}
        block
        important
        list={[<Input name="name" label="属性名" rule="REQ" />, <Switch name="required" label="是否必须" />, <JsonschemaFormCore block outer={<ListOuter />} />]}
      />
    ],
    array: [
      <InputNumber name="minItems" label="最小长度" precision={0} />,
      <InputNumber name="maxItems" label="最大长度" precision={0} />,
      <Switch name="uniqueItems" label="数据项是否要求唯一" />,
      <Group name="items" block>
        <FormInfo title="数组项" list={[<JsonschemaFormCore block />]} />
      </Group>
    ],
    number: [
      <InputNumber name="multipleOf" label="倍数" />,
      <InputNumber name="minimum" label="最小值" />,
      <InputNumber name="maximum" label="最大值" />,
      <InputNumber name="exclusiveMinimum" label="最小值(不包含)" />,
      <InputNumber name="exclusiveMaximum" label="最大值(不包含)" />,
      <InputNumber name="default" label="默认值" />
    ],
    integer: [
      <InputNumber name="multipleOf" label="倍数基数" />,
      <InputNumber name="minimum" label="最小值" />,
      <InputNumber name="maximum" label="最大值" />,
      <InputNumber name="exclusiveMinimum" label="最小值(不包含)" />,
      <InputNumber name="exclusiveMaximum" label="最大值(不包含)" />,
      <InputNumber name="default" label="默认值" precision={0} />
    ],
    boolean: [
      <RadioGroup
        name="default"
        label="默认值"
        options={[
          { value: true, label: 'true' },
          { value: false, label: 'false' }
        ]}
      />
    ],
    string: [
      <Input
        name="format"
        label="格式"
        block
        description={`时间和日期：“date-time”、“time”、“date" 和"duration”; 邮件：“email”，“idn-email”； 域名：“hostname” “idn-hostname”； IP: “ipv4” “ipv6”； 资源标识符：“uuid” “uri” “uri-reference” “iri” “iri-reference” ; uri-template: “uri-template”; json pointer: “json-pointer” “relative-json-pointer”; 正则表达式：“regex”`}
      />,
      <InputNumber name="minLength" label="最小长度" />,
      <InputNumber name="maxLength" label="最大长度" />,
      <Input name="pattern" label="正则表达式" />,
      <Input name="default" label="默认值" />
    ]
  };

  const children = typeField && typeField.value && typeComponentsMap[typeField.value];

  const list = [
    <Select
      label="类型"
      name="type"
      options={[
        { label: '对象', value: 'object' },
        {
          label: '数组',
          value: 'array'
        },
        { label: '字符串', value: 'string' },
        { label: '整数', value: 'integer' },
        { label: '数字', value: 'number' },
        {
          label: '布尔',
          value: 'boolean'
        }
      ]}
    />,
    <Input name="description" label="描述" />
  ];

  if (Array.isArray(children) && children.length > 0) {
    list.push(...children);
  }

  return <FormInfo {...props} list={list} />;
});

const JsonschemaFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Group']
})(({ remoteModules, name, ...props }) => {
  const [Group] = remoteModules;

  return (
    <Group name={name}>
      <JsonschemaFormCore {...props} />
    </Group>
  );
});

export const outputJsonschema = value => {
  if (!(value && value.length === 1)) {
    return null;
  }
  const core = inputValue => {
    if (inputValue.type === 'array' && inputValue.items) {
      inputValue.items = core(inputValue.items[0]);
    }
    if (inputValue.type === 'object' && inputValue.properties) {
      inputValue.required = [];
      inputValue.properties = transform(
        inputValue.properties,
        (result, value) => {
          const { name, required, ...props } = value;
          result[name] = core(Object.assign({}, props));
          if (required) {
            inputValue.required.push(name);
          }
        },
        {}
      );
    }

    return inputValue;
  };

  return Object.assign({}, core(value[0]));
};

export const inputJsonschema = value => {
  const core = inputValue => {
    if (!inputValue) {
      return null;
    }
    if (inputValue.type === 'array' && inputValue.items) {
      inputValue.items = [core(inputValue.items)];
    }

    if (inputValue.type === 'object' && inputValue.properties) {
      inputValue.properties = transform(
        inputValue.properties,
        (result, value, name) => {
          const required = Array.isArray(inputValue.required) && inputValue.required.indexOf(name) > -1;
          result.push(Object.assign({}, core(value), { name, required }));
        },
        []
      );
    }

    return inputValue;
  };

  return [Object.assign({}, core(value))];
};

JsonschemaFormInner.outputJsonschema = outputJsonschema;
JsonschemaFormInner.inputJsonschema = inputJsonschema;

export default JsonschemaFormInner;

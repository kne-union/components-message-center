
# ChannelFormInner


### 概述

消息发送渠道表单


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ChannelFormInner(@components/ChannelFormInner),remoteLoader(@kne/remote-loader)

```jsx
const { default: ChannelFormInner } = _ChannelFormInner;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [Form] = remoteModules;
  return <Form onSubmit={(data) => {
    console.log(data);
  }}>
    <ChannelFormInner />
  </Form>;
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |


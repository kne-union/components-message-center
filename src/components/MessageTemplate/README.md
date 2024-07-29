
# MessageTemplate


### 概述

消息模板


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _MessageTemplate(@components/MessageTemplate),remoteLoader(@kne/remote-loader)

```jsx
const { default: MessageTemplate } = _MessageTemplate;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [Form] = remoteModules;
  return <Form>
    <MessageTemplate />
  </Form>;
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |


import { createWithRemoteLoader } from '@kne/remote-loader';
import { Alert, Flex } from 'antd';
import JsonschemaEditor from '@components/JsonschemaEditor';
import Preview from '../Preview';

const TemplateLibSelect = createWithRemoteLoader({
  modules: ['email-template:components', 'components-core:FormInfo.fields']
})(({ remoteModules, ...props }) => {
  const [components, fields] = remoteModules;
  const list = Object.values(components).map(({ name, summary }) => {
    return { value: name, label: summary.replace(/<.*?>/g, '') };
  });
  const { Select } = fields;
  return <Select {...props} options={list} />;
});

const ContentType = createWithRemoteLoader({
  modules: ['components-core:StateBar', 'components-core:FormInfo@hooks']
})(({ remoteModules, ...props }) => {
  const [StateBar, hooks] = remoteModules;
  const { useOnChange } = hooks;
  const render = useOnChange(props);
  return render(StateBar);
});

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@useFormContext', 'components-ckeditor:Editor', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [FormInfo, useFormContext, Editor, InfoPage] = remoteModules;
  const { Input, TextArea } = FormInfo.fields;
  const { formData } = useFormContext();
  const contentComponents = { richText: Editor, text: TextArea, lib: TemplateLibSelect };
  const ContentComponent = (formData['contentType'] && contentComponents[formData['contentType']]) || Editor;
  return (
    <Flex vertical gap={8}>
      <FormInfo list={[<Input name="name" label="名称" rule="REQ" />, <Input name="code" label="Code" rule="REQ" />, <Input name="title" label="主题" block />, <TextArea name="description" label="简介" block />]} />
      <JsonschemaEditor title="模板数据格式" name="jsonschema" />
      <FormInfo
        title="模板内容"
        subTitle={
          <Alert
            type="info"
            message={
              <>
                1. 使用{'<%='}属性名{'%>'}显示属性
                <br />
                2. 使用{'<%'}属性.forEach((item)=>{'%>'}xxxxxx{'<%='}item.子属性{'%>'}
                {'<%'}){'%>'}输出循环模板
                <br />
                3. 使用{'<%'}if(属性){'{'}
                {'%>'}xxxxx{'<%'}
                {'}'}
                {'%>'}完成条件分支输出
              </>
            }
          />
        }
        list={[
          <ContentType
            block
            name="contentType"
            label="内容类型"
            rule="REQ"
            labelHidden
            type="radio"
            value="richText"
            stateOption={[
              { tab: '富文本', key: 'richText' },
              { tab: '文本', key: 'text' },
              {
                tab: '模板库',
                key: 'lib'
              }
            ]}
          />,
          <ContentComponent name="content" label="模板内容" labelHidden block />
        ]}
      />
      <InfoPage.Part title="预览">
        <Preview type={formData.contentType} content={formData.content} />
      </InfoPage.Part>
    </Flex>
  );
});

export default FormInner;

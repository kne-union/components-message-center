import template from 'lodash/template';
import { Empty } from 'antd';

const Preview = ({ type, content, data }) => {
  if (!data) {
    return <Empty description="暂无默认数据" />;
  }
  if (type === 'lib') {
    return null;
  }

  return <div>{template(content)(data)}</div>;
};

export default Preview;

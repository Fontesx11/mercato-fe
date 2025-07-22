import { Select as SelectAntd, type SelectProps as SelectPropsAntd } from 'antd';

import { BoxSelect, TitleSelect } from './select.styles';

interface InputProps extends SelectPropsAntd {
  title?: string;
  margin?: string;
}

const Select = ({ title, margin, ...props }: InputProps) => {
  return (
    <BoxSelect style={{ margin }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAntd {...props} />
    </BoxSelect>
  );
};

export default Select;

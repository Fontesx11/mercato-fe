import { Input as InputAntd, type InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.styles';

interface InputProps extends InputPropsAntd {
  title?: string;
  margin?: string;
}

const InputBasic = ({ title, margin, ...props }: InputProps) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default InputBasic;

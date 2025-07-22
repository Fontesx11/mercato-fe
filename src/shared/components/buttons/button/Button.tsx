import type { ButtonProps } from 'antd';

import { ButtonAntd } from './button.styles';

interface ButtonCurrentProps extends ButtonProps {
  margin?: string;
}

const ButtonBasic = ({ margin, ...props }: ButtonCurrentProps) => {
  return <ButtonAntd style={{ margin }} {...props} />;
};

export default ButtonBasic;

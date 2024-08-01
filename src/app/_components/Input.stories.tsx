
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    // 여기에 prop 이름과 컨트롤 타입을 추가할 수 있습니다.
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    // 기본 props 값 설정
  },
};

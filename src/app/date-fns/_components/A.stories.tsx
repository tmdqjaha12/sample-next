
import { Meta, StoryObj } from '@storybook/react';
import A from './A';

export default {
  title: 'A',
  component: A,
  argTypes: {
    // 여기에 prop 이름과 컨트롤 타입을 추가할 수 있습니다.
  },
} as Meta<typeof A>;

type Story = StoryObj<typeof A>;

export const Primary: Story = {
  args: {
    // 기본 props 값 설정
  },
};

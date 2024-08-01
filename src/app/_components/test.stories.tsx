
import { Meta, StoryObj } from '@storybook/react';
import test from './test';

export default {
  title: 'test',
  component: test,
  argTypes: {
    // 여기에 prop 이름과 컨트롤 타입을 추가할 수 있습니다.
  },
} as Meta<typeof test>;

type Story = StoryObj<typeof test>;

export const Primary: Story = {
  args: {
    // 기본 props 값 설정
  },
};

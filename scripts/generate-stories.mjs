import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 모듈의 URL을 사용하여 __dirname을 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 루트 디렉토리 설정 (src/app)
const ROOT_DIR = path.resolve(__dirname, '../src/app');

// 컴포넌트 이름과 경로를 사용하여 스토리 파일의 내용을 생성하는 함수
const generateStoryFile = (componentName, componentPath) => `
import { Meta, StoryObj } from '@storybook/react';
import ${componentName} from '${componentPath.replace(".tsx", "")}';

export default {
  title: '${componentName}',
  component: ${componentName},
  argTypes: {
    // 여기에 prop 이름과 컨트롤 타입을 추가할 수 있습니다.
  },
} as Meta<typeof ${componentName}>;

type Story = StoryObj<typeof ${componentName}>;

export const Primary: Story = {
  args: {
    // 기본 props 값 설정
  },
};
`;

// 주어진 디렉토리에서 스토리 파일을 생성하는 함수
const generateStories = (dir) => {
  // 디렉토리 내의 모든 항목을 읽어옴
  fs.readdirSync(dir).forEach((subDir) => {
    const subDirPath = path.join(dir, subDir);
    
    // 하위 항목이 디렉토리인지 확인
    if (fs.statSync(subDirPath).isDirectory()) {

      // 디렉토리 이름이 '_components'인 경우
      if (subDir === '_components') { 
        
        // '_components' 내의 모든 파일을 읽어옴
        fs.readdirSync(subDirPath).forEach((file) => {
          const filePath = path.join(subDirPath, file);
          
          // 파일이 실제 TypeScript 파일인지 확인
          if (fs.statSync(filePath).isFile() && file.endsWith('.tsx')) {
            const componentName = (path.basename(file, '.tsx')).replace(".stories", "");  // 컴포넌트 이름 추출
            const componentFilePath = filePath;  // 컴포넌트 파일 경로
            const storyFilePath = path.join(subDirPath, `${componentName}.stories.tsx`);  // 스토리 파일 경로
            
            // 컴포넌트 파일이 존재
            if (fs.existsSync(componentFilePath)) {
              const relativeComponentPath = path.relative(path.dirname(storyFilePath), componentFilePath).replace(/\\/g, '/');  // 컴포넌트 파일의 상대 경로

              // 스토리 파일 생성 (기존 파일 덮어쓰기)
              fs.writeFileSync(storyFilePath, generateStoryFile(componentName, `./${relativeComponentPath}`)); 
            }
          }
        });
      } else {
        // '_components' 디렉토리가 아닌 경우, 재귀적으로 탐색
        generateStories(subDirPath);
      }
    }
  });
};

// 루트 디렉토리부터 스토리 파일 생성을 시작
generateStories(ROOT_DIR);

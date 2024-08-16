"use client";

import useBurningPaper from "@/hooks/useBurningPaper";
import React from "react";

const BurningPaperPage: React.FC = () => {
  const { canvasRef, scrollMsgRef } = useBurningPaper();

  return (
    <div className="relative min-h-screen overflow-hidden text-black">
      {/* 전체 화면을 채우는 캔버스 */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* 스크롤 메시지 */}
      <div
        ref={scrollMsgRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold z-10"
      >
        스크롤을 내려주세요
      </div>

      {/* 페이지 내용 */}
      <div className="relative z-20 p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Burning Paper Effect</h1>
        <p className="text-lg">이 페이지는 스크롤에 따라 종이가 타는 듯한 효과를 보여줍니다. 스크롤을 내려보세요! </p>
      </div>

      {/* 페이지 하단에 추가 콘텐츠 */}
      <div className="h-screen bg-gray-800 text-white p-8">
        <h2 className="text-3xl font-bold mb-4">하단 콘텐츠</h2>
        <p className="text-lg">
          이 부분은 페이지의 하단에 위치한 추가 콘텐츠입니다. 스크롤하여 효과를 확인해보세요. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.consectetur adipisicing elit. Animi
          natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus, omnis quod, voluptates
          ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat praesentium totam ipsa officiis
          tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi natus,
          omnis quod, voluptates ducimus tempora voluptatum vero repellendus harum reiciendis quibusdam fugiat
          praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Animi natus, omnis quod, voluptates ducimus tempora voluptatum vero repellendus
          harum reiciendis quibusdam fugiat praesentium totam ipsa officiis tempore. Reiciendis, numquam dignissimos.
        </p>
      </div>
    </div>
  );
};

export default BurningPaperPage;

/**
 * fabric 라이브러리
 * - canvas 위 그림을 객체로 관리할 수 있는 라이브러리
 *
 * 설치 : npm install fabric --save
 * 임포트 : import { fabric } from "fabric";
 *
 * 참고)
 * https://velog.io/@kusdsuna/%EB%A6%AC%EC%95%A1%ED%8A%B8-canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
 * https://aprilescobar.medium.com/part-1-fabric-js-on-react-fabric-canvas-e4094e4d0304
 * https://medium.com/@aprilescobar/part-2-fabric-js-on-react-fabric-rect-533c5d8bbe55
 * https://aprilescobar.medium.com/part-3-fabric-js-on-react-fabric-image-fromurl-4185e0d945d3
 */

import { fabric } from "fabric";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  // fabric을 저장하고 액세스할 상태 변수
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      backgroundColor: "lightgray",
      width: 600,
      height: 600,
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      width: 300,
      height: 300,
      fill: "yellow",
    });

    canvas.centerObject(rect);
    canvi.add(rect);
    canvi.setActiveObject(rect);
    canvi.renderAll();
  };

  return (
    <div>
      <h1>캔버스테스트</h1>
      <Wrap>
        <div>
          <Button onClick={() => addRect(canvas)}>사각형</Button>
        </div>
        <div>
          <canvas id="canvas" />
        </div>
      </Wrap>
    </div>
  );
};

export default Test;

// styled-component
const Wrap = styled.div`
  display: flex;
  gap: 50px;
  margin: 50px;
`;

const Button = styled.button`
  padding: 1.5rem;
`;

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
      left: 50,
      top: 70,
      height: 800,
      width: 800,
      backgroundColor: "#c8c8c8",
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      width: 300,
      height: 300,
      left: 50,
      top: 70,
      fill: "yellow",
      objectCaching: false,
    });

    canvi.add(rect);
    // canvi.setActiveObject(rect);
    canvi.renderAll();
  };

  return (
    <div>
      <h1>캔버스테스트</h1>
      <button onClick={() => addRect(canvas)}>Rectangle</button>

      <br />
      <br />
      <canvas id="canvas" />
    </div>
  );
};

export default Test;

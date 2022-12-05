import { fabric } from "fabric";
import { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () => 
    new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "grey",
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
    });
    canvi.add(rect);
    canvi.renderAll();
  };

  return (
    <div>
      <h1>캔버스테스트</h1>
      <button onClick={() => addRect(canvas)}>사각형</button>
      <canvas id="canvas" />
    </div>
  );
};

export default Test;

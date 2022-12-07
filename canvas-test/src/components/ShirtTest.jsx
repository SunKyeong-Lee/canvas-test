// https://ourcodeworld.com/articles/read/1016/how-to-create-your-own-t-shirt-designer-using-fabricjs-in-javascript

import styled from "styled-components";
import { fabric } from "fabric";
import { useState } from "react";
import { useEffect } from "react";

const ShirtTest = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      // canvas를 감싼 div(DrawingArea)와 크기가 같아야 함
      width: 180,
      height: 260,
    });

  /** 테스트용 사각형 생성 */
  const addRect = () => {
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: "yellow",
    });
    canvas.centerObject(rect);
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  /** 이미지 업로드 */
  const handleImage = (e) => {
    // 업로드한 값이 없다면 캔버스 비우기
    if (!e) {
      canvas.clear();
    }
    // input으로 선택한 파일은 File로 정의되고 FileList에 담긴다.
    // e.target.files : FileList 객체 {0: File, length: 1}
    // FileList 객체는 선택한 파일이 하나라도 배열에 저장되므로 인덱스 지정 > [0]
    const file = e.target.files[0];
    // FileList 안의 File 객체에는 파일 데이터 자체가 숨어있음
    // 이 숨어있는 데이터를 읽기 위해 FileReader API를 사용
    const reader = new FileReader();
    // 파일을 읽을 때 FileReader가 즉시 파일을 읽는 게 아니기 때문에,
    // onload 이벤트 핸들러를 붙여서 콜백으로 파일을 다 읽었다는 것을 알려줘야함
    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result; // result : 파일의 내용을 반환 (FileReader API)
      // 이미지가 로드되었을 때, fabric.js로 image 만들기
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);
        img.scaleToHeight(100);
        img.scaleToWidth(100);
        canvas.centerObject(img); // 캔버스 중앙에 이미지 불러오기
        canvas.add(img);
        canvas.setActiveObject(img); // 불러온 이미지가 자동으로 선택되게
        canvas.renderAll();
      };
    };
    // readAsDataURL() : blob 타입의 file 데이터를 url 형태로 만듬 (FileReader API)
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };

  /** 
   * fabric.js 컨트롤 커스터마이징
   * 설치 : npm install fabric-customise-controls --save
   * https://github.com/pixolith/fabricjs-customise-controls-extension
   */

  /** 티셔츠 이미지 내보내기 - DomToImage 라이브러리 사용 */

  return (
    <EditWrap>
      <div>
        <img src={require("../img/testImg.jpg")} />
        <DrawingArea>
          <canvas id="canvas" />
        </DrawingArea>
      </div>

      <ButtonWrap>
        <button onClick={addRect}>사각형</button>
        <label htmlFor="uploadImg">이미지 업로드</label>
        <input
          type="file"
          // accept : 사용가능한 파일 종류 제한
          accept="image/*"
          // label과 연결하기 위해 같은 아이디 지정
          // label의 css를 만지는편이 편해서 label와 연결하였으나, label을 쓰지 않고 input의 css를 만져도 된다.
          // 작성자 편한대로 할 것.
          id="uploadImg"
          onChange={handleImage}
        />
      </ButtonWrap>
    </EditWrap>
  );
};

export default ShirtTest;


// styled-component
// 라이브러리 설치 후 사용 : npm i styled-components
const EditWrap = styled.div`
  display: flex;
  
  margin: 20px;
  gap: 50px;
`;

const ButtonWrap = styled.div`
  ${"button"}, ${"label"} {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 10px;
    box-sizing: border-box;
    border: none;
    background-color: black;
    color: whitesmoke;
    cursor: pointer;
    font-size: 1rem;
  }
  ${"input"} {
    display: none;
  }
`;

const DrawingArea = styled.div`
  position: absolute;
  top: 180px;
  left: 180px;
  z-index: 10;
  // 캔버스와 사이즈가 같아야 함
  width: 180px;
  height: 260px;
  &:hover {
    outline: 1px dashed black;
  }
`;

/**
 * fabric 라이브러리
 * - canvas 위 그림을 객체로 관리할 수 있는 라이브러리
 *
 * 설치 : npm install fabric --save
 * 임포트 : import { fabric } from "fabric";
 */

import { fabric } from "fabric";
import { useEffect } from "react";
import { useState } from "react";

const CanvasBox = () => {
  // fabric을 저장하고 액세스할 상태 변수
  const [canvas, setCanvas] = useState("");

  // fabric을 반환하는 함수
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 800,
      width: 600,
      backgroundColor: "#c8c8c8",
    });

  // DOM 초기 렌더링 시 함수 호출
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // 이미지 업로드
  const handleImage = (e) => {
    // e.target.files : FileList 객체 {0: File, length: 1}
    // [0] : 업로드한 파일이 하나라도 배열에 저장되므로 인덱스 지정
    const file = e.target.files[0];

    // FileList 안의 File 객체에는 파일 데이터 자체가 숨어있음
    // 이 숨어있는 데이터를 읽기 위해 FileReader API를 사용
    const reader = new FileReader();
    // readAsDataURL() : blob 타입의 file 데이터를 url 형태로 만듬
    reader.readAsDataURL(file);

    // 파일을 읽을 때 FileReader가 즉시 파일을 읽는 게 아니기 때문에
    // onload 이벤트 핸들러를 붙여서 콜백으로 파일을 다 읽었다는 것을 알려줘야함
    reader.onload = () => {
      const imgElement = document.createElement("img");
      imgElement.src = reader.result;
      imgElement.onload = () => {
        const imageinstance = new fabric.Image(imgElement, {
          angle: 0,
          opacity: 1,
          cornerSize: 30,
        });
        canvas.add(imageinstance);
        canvas.centerObject(imageinstance);
      };

      // fabric.image.fromURL() > canvas에 이미지 불러오기
      // reader.result > result : 파일의 내용을 반환 (FileReader API)
      //  new fabric.Image.fromURL(reader.result, (image) => {
      //    image.scale(0.75);
      //    canvas.add(image);
      //    canvas.renderAll();
      //  });
    };
  };

  return (
    <div>
      <h1>캔버스테스트</h1>
      {/* input태그에 accept 옵션을 통해 확장자 제한 가능 */}
      <input
        id="filereader"
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      <canvas id="canvas" />
    </div>
  );
};

// 이미지 모두 삭제는 실수로 누르는 것을 방지하기 위해 모달창을 띄워 확인을 받을 것
// 예) 편집 중인 이미지가 모두 삭제됩니다 - 확인/취소
// 사용자가 이미지 편집 중 편집 가능한 영역(인쇄 영역)을 벗어나면 경고 팝업을 띄운다

export default CanvasBox;

import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { fabric } from "fabric";

const EditShirt = (props) => {
  const { productList, img, setImg } = props;
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    if (productList != null) {
      setImg(productList.productImg[0]);
    }
  }, [productList]);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const filterCategory = (category) => {
    switch(category) {
      case "short":
        return (
          <img 
            className="product-img" 
            src={require(`../img/shirts-img/short/${img}`)} 
          />
        );
      case "long":
        return (
          <img 
            className="product-img" 
            src={require(`../img/shirts-img/long/${img}`)} 
          />
        );
      default:
        return (
          <div>이미지가 존재하지 않습니다</div>
        );
    }
  }

  /** 티셔츠 상품이미지 앞,뒤 전환 */
  const flipShirts = () => {
    for (let i = 0; i < productList.productImg.length; i++) {
      if (img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
      } else if (img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
      }
    }
  };

  /** 사용자 이미지가 들어갈 캔버스 */
  const initCanvas = () => (
    new fabric.Canvas("productImg", {
      backgroundColor: "gray"
    })
  );

  return (
    <div style={{display: "flex"}}>
      <div className="product-button">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            flipShirts();
          }}
        >
          앞/뒤
        </Button>
        <Button variant="contained" color="success">사진 업로드</Button>
        <Button variant="contained" color="success">사진 모두 삭제</Button>
        <Button variant="contained" color="success">텍스트</Button>
        <Button variant="contained" color="success">이미지 편집</Button>
      </div>
      <div className="product-detail">
        {
          img != null ?
          filterCategory(productList?.category) : (<div>로딩 중</div>)
        }
        
      </div>
    </div>
  );
};

export default EditShirt;

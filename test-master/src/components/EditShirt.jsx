import Button from "@mui/material/Button";
import { useEffect } from "react";

const EditShirt = (props) => {
  const { productList, img, setImg } = props;

  useEffect(() => {
    if (productList != null) {
      setImg(productList.productImg[0]);
    }
  }, [productList]);

  /** 상품이미지 티셔츠 앞/뒤 전환 */
  const flipShirts = () => {
    for (let i = 0; i < productList.productImg.length; i++) {
      if (img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
      } else if (img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
      }
    }
  };

  /** 상품이미지 캔버스 */

  return (
    <div className="edit-img-container" style={{display: "flex"}}>
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
        {productList?.category == "short" && img != null ? (
          <div className="img-box">
            <img
              className="product-img"
              src={require(`../img/shirts-img/short/${img}`)}
            ></img>
          </div>
        ) : (
          // 로딩 중 보일 화면
          <div style={{width: "310px", height: "371px", backgroundColor: "grey", margin: "20px"}}>로딩 중</div>
          )}
        {productList?.category == "long" && img != null ? (
          <div className="img-box">
            <img
              className="product-img"
              src={require(`../img/shirts-img/long/${img}`)}
            ></img>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditShirt;

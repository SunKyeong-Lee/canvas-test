import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import EditShirt from "../components/EditShirt";

// 상품리스트 로딩 중에 보일 화면 필요
// 상품 상세 페이지 상품 이미지 로딩 중에 보일 화면 필요

const ProductDetail = () => {
  const { id } = useParams(); // id : productlist {id}
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);

  /** 상품데이터 들고오기 */
  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div className="product-area">
      {/** 셔츠 이미지 편집 컴포넌트로 분리 */}
      <EditShirt productList={productList} img={img} setImg={setImg} />
      <div>
        {productList ? <p>{productList.id}</p> : ""}
        {productList ? <p>{productList.productName}</p> : ""}
        {productList ? <p>{productList.price}</p> : ""}
        <div style={{ display: "flex" }}>
          {productList
            ? productList.color.map((color, index) => (
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    border: "1px solid transparent",
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setImg(productList.productImg[index * 2]);
                  }}
                  key={index}
                ></div>
              ))
            : ""}
        </div>

        <select style={{ width: "100px" }}>
          {productList?.size.map((size, index) => (
            <option key={index}>{size}</option>
          ))}
        </select>

        <div>
          <Button>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
          </Button>
          <Button>구매하기</Button>
        </div>

        {/* 원하는 객체가 있는지 삼항 연산자, 콘솔로 찍어봤을 때
            거짓 경우(객체 로딩 중) -> 참 경우(객체 로딩 완료)로 넘어가면서
            둘 다가 찍힌다.
            
            그래서, 로딩 되기 전의 거짓 경우와 로딩 되었을 때의 참 경우 둘 다가 필요하고,
            객체가 있는지를 "?"를 통해 한번 더 체크해야 한다. */}

        {productList ? console.log("OK") : console.log("not yet")}
      </div>
    </div>
  );
};

export default ProductDetail;

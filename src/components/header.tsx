import Description from "./description";

export default function Header() {
  return (
    <>
      <h1 className="text-4xl font-bold text-lime-300 mb-8">
        2025년 선물 교환식
      </h1>
      <Description>
        <p>선물에 나만의 색이 담기길 원했습니다.</p>
        <p>이런 선물은 저밖에 못하니까요?</p>
        <p>그래서 올해 선물은 </p>
        <p>
          <span className="font-semibold bg-lime-300/30 px-2 py-0.5 rounded">
            웹
          </span>{" "}
          /{" "}
          <span className="font-semibold bg-lime-300/30 px-2 py-0.5 rounded">
            LUSH
          </span>{" "}
          /{" "}
          <span className="font-semibold bg-lime-300/30 px-2 py-0.5 rounded">
            글
          </span>{" "}
          /{" "}
          <span className="font-semibold bg-lime-300/30 px-2 py-0.5 rounded">
            마술
          </span>{" "}
        </p>
        <p>이 컨셉이죠.</p>
        <p>사실 여러분의 선호는 그 다음이었습니다.</p>
        <p>감사합니다.</p>
      </Description>
    </>
  );
}

import Header from "./components/header";
import CircleImage from "./components/CircleImage";
import superMilk from "./assets/super_milk.png";
import magicCrystals from "./assets/magic_crystals.png";
import myself from "./assets/myself.jpeg";
import human from "./assets/human.jpeg";
import Description from "./components/description";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16">
      <Header />
      <h3 className="text-2xl text-white font-bold mt-16 mb-4">LUSH 제품</h3>
      <Description>
        <p>설명할 필요 없이 저는 러쉬 처돌이입니다.</p>
        <p>선물 뭐 살지 고민하다가, 러쉬에 들어가버렸습니다.</p>
      </Description>
      <CircleImage src={superMilk} alt="슈퍼 밀크" />
      <h4 className="text-xl text-white font-bold mt-8 mb-4">
        [러쉬] 수퍼 밀크
      </h4>
      <Description>
        <p>이건 재호 저격 선물입니다.</p>
        <p>맨날 머리 고데기하고 머리를 못살게 구는데,</p>
        <p>이거라도 하면 탈모는 면할 수 있지 않을까요?</p>
        <p>게다가 향기도 달달하고 좋아요.</p>
        <p>재호한테 잘 어울릴 향인 것 같아서 선택했습니다.</p>
      </Description>
      <CircleImage src={magicCrystals} alt="매직 크리스탈스" />
      <h4 className="text-xl text-white font-bold mt-8 mb-4">
        [러쉬] 매직 크리스탈스
      </h4>
      <Description>
        <p>이건 처음 보는데 향이 좋더라구요?</p>
        <p>준호는 어차피 향수 본인 것도 있고 하니까</p>
        <p>이거 하면 다운씨도 쓰고 얼마나 좋아요?</p>
        <p>문제는 준호가 잘 받아야할텐데... 파이팅~ ^^7</p>
      </Description>
      <h3 className="text-2xl text-white font-bold mt-16 mb-4">글</h3>
      <Description>
        <p>책을 지독히도 혐오하는 여러분을 위해</p>
        <p>간단한 해설과 함께 하고싶은 말을 적어놨어요.</p>
        <p>책을 볼땐 지저분하게 봐주세요.</p>
        <p>감사합니다.</p>
      </Description>
      <CircleImage src={human} alt="인간관계론" />
      <h4 className="text-xl text-white font-bold mt-8 mb-4">
        데일 카네기 - 인간관계론
      </h4>
      <Description>
        <p>인간관계론을 받게된 당신…?</p>
        <p>원래 준호에게 선물하려했습니다.</p>
        <p>뭐 누가받던 무슨 상관입니까?</p>
        <p>제가 선물을 하고싶다는데 말이죠.</p>
        <p>사실 이 책이 왜 명서인지 잘 모르겠습니다.</p>
        <p>저의 사회성이 부족한 탓일까요?</p>
        <p>아무튼 이 책은 한 문장만 기억하면 됩니다.</p>
        <p>"중요한 사람이 되었다는 느낌을 줘라"</p>
        <p>자 책 한권 다 읽으셨네요.</p>
        <p>수고하세요</p>
      </Description>
      <CircleImage src={myself} alt="자기관리론" />
      <h4 className="text-xl text-white font-bold mt-8 mb-4">
        데일 카네기 - 자기관리론
      </h4>
      <Description>
        <p>자기관리론을 고른 당신…?</p>
        <p>자기관리론은 제 인생책 중 하나입니다.</p>
        <p>그래서 골랐습니다.</p>
        <p>근데 이 책 제목이 왜 "자기관리론"으로 해석했는지 이해가 안됩니다.</p>
        <p>원문은 "How to Stop Worrying and Start Living"</p>
        <p>걱정과 불안에서 벗어나는 방법이죠.</p>
        <p>
          현대를 살아가는, 불안한 20대를 보내는 여러분들에게 보내는
          진통제입니다.
        </p>
        <p>
          대학시절 진로 고민에서, 취업준비하는 불안한 시기마다 이 책을
          들여다봤습니다.
        </p>
        <p>여러분들에게도 도움이 될겁니다.</p>
      </Description>
    </div>
  );
}

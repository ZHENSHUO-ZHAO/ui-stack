import Carousel from "./animations/Carousel/Carousel";
import { getContent } from "./animations/Carousel/cardContent";
import { CardItem } from "./animations/Carousel/CarouselItem";
import TestSize from "./animations/Carousel/TestSize";
import MotionContainer from "./animations/MotionContainer";

function App() {
  return (
    <>
      {/* <Carousel
        cardWidth={400}
        cardHeight={300}
        CardComponent={CardItem}
        contentList={getContent()}
      /> */}
      {/* <TestSize /> */}
      <MotionContainer>
        <div className="w-[50vw] min-w-[400px] max-w-[800px]">
          <Carousel
            aspectRatio={1}
            CardComponent={CardItem}
            contentList={getContent()}
          />
        </div>
      </MotionContainer>
    </>
  );
}

export default App;

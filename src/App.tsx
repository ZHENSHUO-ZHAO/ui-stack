import Carousel from "./animations/Carousel";
import { getContent } from "./animations/carouselContent";
import { CardItem } from "./animations/CarouselItem";

function App() {
  return (
    <>
      <Carousel
        cardWidth={400}
        CardComponent={CardItem}
        contentList={getContent()}
      />
    </>
  );
}

export default App;

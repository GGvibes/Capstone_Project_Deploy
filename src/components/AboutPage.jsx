import Contact from "./Contact";

export default function AboutPage() {
  return (
    <>
      <div className="aboutPage">
        <h1 className="aboutTitle">About Host-a-Herd</h1>
        <p className="aboutPg">
          At Host-a-Herd, we connect landowners with the benefits of
          sustainable, pasture-based farming—without the hassle of managing
          livestock. Our mission is to make ethical, locally sourced food more
          accessible while improving soil health and land stewardship.
        </p>
        <p className="aboutPg">
          When you host a herd, we provide the animals, fencing, and care, while
          you enjoy the rewards of regenerative grazing. In return for hosting,
          you gain access to high-quality, pasture-raised meats, eggs, and even
          dairy, all produced right on your land. This system not only enriches
          your soil and maintains healthy pastures but also fosters a deeper
          connection to your food and its source.
        </p>
        <p className="aboutPg">
          Whether you have a few acres or a larger property, Host-a-Herd offers
          a way to support sustainable agriculture, enjoy local food, and make
          the most of your land—naturally. Join us in building a future where
          small-scale grazing benefits both people and the planet.
        </p>
        <img className="twoChickens" src="/assets/Bryanchickens.png"></img>
      </div>
      <div className="contactForm">
        <Contact></Contact>
      </div>
    </>
  );
}

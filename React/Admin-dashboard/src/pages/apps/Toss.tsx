import { useState } from "react";
import head from "../../assets/images/heads.png";
import tail from "../../assets/images/tails.png";
const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <main className="dashboard-app-container">
      <h1>Toss</h1>
      <section>
        <article
          className="tosscoin"
          onClick={flipCoin}
          style={{
            transform: `rotateY(${angle}deg)`,
          }}
        >
          <div>
            <img src={tail} alt="tail" />
          </div>
          <div>
            <img src={head} alt="heads" />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Toss;

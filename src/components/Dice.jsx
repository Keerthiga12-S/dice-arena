import { motion } from "framer-motion";

import dice1 from "../assets/dice1.png";
import dice2 from "../assets/dice2.png";
import dice3 from "../assets/dice3.png";
import dice4 from "../assets/dice4.png";
import dice5 from "../assets/dice5.png";
import dice6 from "../assets/dice6.png";

function Dice({ value }) {

  const diceImages = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  return (
    <motion.img
      src={diceImages[value]}
      alt="dice"
      className="dice-image"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    />
  );
}

export default Dice;
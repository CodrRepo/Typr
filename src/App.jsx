import React, { useEffect, useRef, useState } from "react";
import anyAscii from "any-ascii";
import axios from "axios";

const App = () => {
  const [text, setText] = useState([
    {
      content:
        "In the heart"
    },
    {
      content:
        "High above the city skyline, the moon casts its gentle glow upon the bustling streets below. Stars twinkle in the velvet sky, like diamonds scattered across a vast canvas. The night air is crisp and cool, carrying with it the scent of distant flowers and freshly fallen rain. Somewhere in the distance, a lone saxophone fills the air with soulful melodies, its haunting notes weaving tales of love and longing. In the quiet corners of the city, shadows dance playfully, casting ephemeral shapes upon the walls. It is a time of magic and mystery, where anything seems possible."
    },
    {
      content:
        "Deep within the enchanted forest, ancient trees stand sentinel, their gnarled roots intertwining like old friends. Moss blankets the forest floor, softening each step with its cushiony embrace. Sunlight filters through the dense canopy above, casting dappled patterns of light and shadow. Birds flit from branch to branch, their cheerful songs echoing through the woods. A gentle stream meanders its way through the heart of the forest, babbling softly as it goes. Wildflowers bloom in vibrant hues, painting the landscape with their beauty. Here, time moves at its own pace, in harmony with the rhythm of nature."
    },
    {
      content:
        "On the windswept moors, where the sky meets the earth in an endless expanse of blue, lies a solitary cottage. Its thatched roof slopes gently downward, weathered by years of wind and rain. Smoke curls lazily from the chimney, carrying with it the comforting scent of burning wood. Inside, a fire crackles cheerfully in the hearth, casting a warm glow upon the rustic furnishings. The air is filled with the sound of laughter and conversation, as friends gather round to share stories and good cheer. Outside, the moors stretch away into the distance, wild and untamed, a reminder of the beauty and power of the natural world."
    },
    {
      content:
        "In the heart of the desert, where the sun beats down relentlessly upon the arid landscape, lies an oasis of green. Palm trees sway gently in the breeze, their fronds rustling softly as if whispering secrets to the wind. Crystal clear water gushes forth from a natural spring, forming a shimmering pool that reflects the cloudless sky above. Birds flock to the oasis, their vibrant plumage a stark contrast to the muted tones of the desert. In the shade of the palms, travelers find respite from the scorching heat, pausing to rest and replenish their strength before continuing on their journey."
    }
  ]);
  const textDetail = useRef([]);

  const [random, setRandom] = useState(null);
  const [curPos, setCurPos] = useState({top:0, left:0, width:0});
  
  function handleInput(e, textLength) {
    console.log(textLength)
    console.log(textDetail.current.length)
    if (
      e.target.value[textLength-1] ===
      textDetail.current[textLength-1].textContent
    ) {
      textDetail.current[textLength-1].classList.add("text-green-600");
      // console.log(textDetail.current[textLength-1].offsetLeft);
      setCurPos((previous)=>({...previous, 
        top: textLength !== textDetail.current.length ? textDetail.current[textLength].offsetTop: textDetail.current[textLength-1].offsetTop ,
        left: textLength !== textDetail.current.length ? textDetail.current[textLength].offsetLeft : textDetail.current[textLength-1].offsetLeft + textDetail.current[textLength -1].offsetWidth,
        width: textDetail.current[textLength-1].offsetWidth,
      }))
    } else {
      textDetail.current[textLength-1].classList.add("text-red-600");
    }
  }
  
  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length))
  }, [textDetail.current, random]); // This will run after the initial render when textDetail.current is updated
  return (
    <div className="bg-zinc-100 h-screen p-4">
      <div className="relative w-full bg-white  py-4 px-4 mt-[50vh] -translate-y-[50%]">
        <div
          style={{top: `calc(${curPos.top}px + 1vh)`, left: `calc(${curPos.left}px - 0.1vw)` }} // Dynamically setting the left position
          onClick={() => console.log(textDetail.current[0].offsetWidth)}
          className={`absolute cursor h-[7.5vh] w-[0.15rem] bg-black`}
        ></div>
        <p className="tracking-[0.15rem] text-zinc-800">
          {random!==null && text[random].content
            .split("")
            .map((element, index) => {
              return <span
                className="font-bold text-4xl"
                ref={(el) => textDetail.current.length < text[random].content.length && textDetail.current.push(el)}
                key={index}
              >
                {element}
              </span>
          })}
        </p>

        <input
          className="opacity-[0]"
          onChange={(e) => {
            e.preventDefault();
            e.target.value.length <= textDetail.current.length ? handleInput(e,e.target.value.length): handleInput(e,textDetail.current.length);
          }}
          autoFocus={true}
          type="text"
          name="userInput"
          id="userInput"
          autoCapitalize="false"
          autoComplete="false"
          autoCorrect="false"
        />
      </div>
    </div>
  );
};

export default App;

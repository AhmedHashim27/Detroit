import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <a
            href={link} // Use the `link` property here
            target="_blank"
            rel="noopener noreferrer"
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}


            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-[#faff70] px-5 py-2 text-xs uppercase text-black shadow-none transition duration-300 hover:shadow-[0_0_15px_#faff70]"
            >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Discover</p>
          </a>
        )}
      </div>
    </div>
  );
};


const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Detroit’s Vision: Expectations vs. Reality
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        Just seven years ago, Detroit: Become Human envisioned a future where AI would challenge society's norms, 
        ethics, and relationships. In less than a decade, many of its predictions have become reality. 
        From AI's integration into our daily lives to debates over autonomy and morality, explore how fiction has 
        transformed into our present
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              <b>R</b>e<b>a</b>lit<b>y</b>
            </>
          }
          description="Explore how Detroit: Become Human’s predictions about AI’s role in daily life have turned into reality, from smart assistants to automated systems shaping our world"
          isComingSoon
          link="https://www.dmcgroup.eu/en/blog/trends/the-rise-of-smart-assistants/" 
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                <b>C</b>r<b>e</b>ati<b>v</b>it<b>y</b>
              </>
            }
            description="Learn how Detroit envisioned AI-driven creativity, from music to art, and how tools like DALL·E and ChatGPT are redefining creative industries"
            isComingSoon
            link = "https://openai.com/research/dall-e/"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
              <b>E</b>thi<b>c</b>s
              </>
            }
            description="Delve into the ethical dilemmas raised by Detroit: Become Human and the ongoing debates about AI rights, biases, and moral responsibilities in today’s world"
            isComingSoon
            link = "https://www.captechu.edu/blog/ethical-considerations-of-artificial-intelligence"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Dis<b>P</b>l<b>a</b>ceme<b>n</b>t
              </>
            }
            description="Uncover the parallels between the game’s portrayal of androids replacing jobs and the real-world impact of AI-driven automation on industries and workers"
            isComingSoon
            link = "https://www.nature.com/articles/s41599-024-02647-9"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-6.mp4"
            title={
              <>
                <b>E</b>m<b>o</b>tio<b>n</b>
              </>
            }
            description="Discover how Detroit explored emotional intelligence in AI, and how modern systems are creating deeper human connections through empathy-driven technology"
            isComingSoon
            link = "https://www.bbc.com/news/technology-61784011"
          />
        </BentoTilt>


        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <>
              <b>P</b><b>o</b>li<b>c</b>in<b>g</b>
              </>
            }
            description="See how the game’s portrayal of AI in law enforcement mirrors today’s use of predictive policing, surveillance technologies, and their ethical implications"
            isComingSoon
            link = "https://www.chathamhouse.org/2019/08/promise-and-perils-facial-recognition-technology"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

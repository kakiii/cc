import { useState } from "react";

const Game = () => {
  const [scene, setScene] = useState(0);
  const [result, setResult] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showEndingPage, setShowEndingPage] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleChoice = (choice: string): void => {
    const newScene: number = scene + 1;
    const newResult: string = `${scene}${choice}`;

    setResult(newResult);
    setScene(newScene);
    setHistory((prevHistory: string[]) => [...prevHistory, newResult]);

    // Check if an ending is reached
    if (newScene >= 3 && newScene <= 10) {
      setGameEnded(true);
      setShowEndingPage(true);
    }
  };

  const downloadHistory = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "game_history.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderScene = () => {
    switch (scene) {
      case 0:
        return (
          <>
            <p>
              Scene: Kendall and Jan are sitting in a cozy café, enjoying a cup
              of coffee together.
            </p>
            <p>
              Kendall: (smiling affectionately) Jan, these past few months have
              been incredible. I can't believe how much we've grown together. I
              think our relationship is getting really serious.
            </p>
            <p>
              Jan: (grinning) Kendall, I feel the same way. I've never connected
              with someone on such a deep level before. It's like we're meant to
              be.
            </p>
            <p>Part X:</p>
            <p>How would Kendall feel about this?</p>
            <button onClick={() => handleChoice("A")}>A: in love</button>
            <button onClick={() => handleChoice("B")}>B: angry</button>
          </>
        );
      case 1:
        return (
          <>
            <p>
              Kendall: (blushing) Yes, Jan, I'm completely in love with you. You
              make me feel like the luckiest person in the world. I want to
              cherish every moment we spend together.
            </p>
            <p>
              Jan: (smiling warmly) Kendall, you have my heart too. Our love is
              something truly special, and I can't wait to see where it takes
              us.
            </p>
            <p>
              (Kendall stands up to do the dishes while Jan goes into her room.
              Some time passes)
            </p>
            <p>(Scene: Kendall is in the kitchen, pondering his next move.)</p>
            <p>
              Kendall: (thinking) I wonder if Jan has found a date for the
              upcoming dance. I should go and talk to her about it.
            </p>
            <p>Part 1:</p>
            <p>What will Kendall want to do next?</p>
            <button onClick={() => handleChoice("A")}>A: Talk to Jan</button>
            <button onClick={() => handleChoice("B")}>B: Clean her home</button>
          </>
        );
      case 2:
        return (
          <>
            <p>
              (Scene: Kendall enters Jan's room, noticing she is sleeping on her
              stomach.)
            </p>
            <p>
              Kendall: (softly) Jan looks so peaceful sleeping like that. I want
              to make sure she stays warm.
            </p>
            <p>(Kendall tries to pull Jan’s covers over her body)</p>
            <p>Part i:</p>
            <p>How would Jan feel as a result?</p>
            <button onClick={() => handleChoice("A")}>A: Ignored</button>
            <button onClick={() => handleChoice("B")}>B: Loved</button>
          </>
        );
      case 3:
        return (
          <>
            <p>
              Kendall: (thinking to himself) Jan has been occupied lately, and I
              know she has a lot on her plate. I'll take this opportunity to
              clean her home and help lighten her load.
            </p>
            <p>
              (Scene: Kendall starts cleaning, tidying up the living room and
              organizing the kitchen.)
            </p>
            <p>
              Kendall: (focused on cleaning, muttering to himself) I want Jan to
              come back to a clean and cozy home. She deserves a relaxing space
              after her busy day.
            </p>
            <p>
              (Kendall looks at the overflowing shelves and the small living
              room)
            </p>
            <p>
              Kendall: I have to find a bigger home for us so we can live
              comfortably.
            </p>
            <p>How will Kendall feel?</p>
            <button onClick={() => handleChoice("A")}>A: Love</button>
            <button onClick={() => handleChoice("B")}>B: Detached</button>
          </>
        );
      case 4:
        return (
          <>
            <p>(Scene: Kendall and Jan move into their new home.)</p>
            <p>
              Kendall: (looking around with excitement) Jan, we did it! This
              place is perfect for us. I'm so glad I put our way of navigating
              into practice.
            </p>
            <p>
              Jan: (beaming) Kendall, I'm amazed at how you found this gem of a
              home. You truly have a knack for creating a beautiful and
              comfortable space.
            </p>
            <p>
              Kendall: (feeling loved and accomplished) Jan, your words mean the
              world to me. I wanted us to have a place we can truly call home,
              and seeing your happiness makes it all worthwhile.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan settle into their new home, surrounded by
              love, warmth, and the fruits of their shared navigation. The space
              becomes a sanctuary where their love flourishes, creating lasting
              memories and a solid foundation for their future together. Kendall
              feels a deep sense of fulfillment, knowing they were able to
              provide a great place for their shared happiness to thrive.)
            </p>
          </>
        );
      case 5:
        return (
          <>
            <p>
              (Scene: Kendall's act of pulling the covers over Jan reflects his
              care and love for her. Their relationship deepens as they continue
              to nurture their connection.)
            </p>
            <p>
              (Scene: Kendall and Jan spend quality time together, strengthening
              their bond.)
            </p>
            <p>
              Kendall: (smiling) Jan, I wanted to make sure you felt warm and
              comfortable. Your well-being means everything to me.
            </p>
            <p>
              Jan: (grateful) Kendall, your thoughtfulness never fails to touch
              my heart. It's moments like these that remind me how lucky I am to
              have you in my life.
            </p>
            <p>
              Kendall: (gently takes Jan's hand) Jan, being with you feels like
              home. You bring so much joy and warmth into my life. I can't
              imagine my days without you by my side.
            </p>
            <p>
              Jan: (blushing) Kendall, you make me feel cherished and loved. The
              way you care for me and pay attention to the little details fills
              me with happiness. I'm grateful for our deep connection.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan's relationship continues to flourish,
              filled with love, understanding, and mutual respect. They create a
              harmonious life together, supporting each other's dreams and
              aspirations. As time passes, their commitment deepens, and they
              decide to take their relationship to the next level.)
            </p>
            <p>
              (Scene: Kendall and Jan celebrate their engagement, surrounded by
              love and the promise of a lifelong partnership. They embark on a
              beautiful journey together, building a life filled with warmth,
              trust, and unwavering love.)
            </p>
          </>
        );
      case 6:
        return (
          <>
            <p>Ending 1:</p>
            <p>
              (Scene: Kendall leaves the room without disturbing Jan's sleep.
              However, unbeknownst to Kendall, Jan wakes up briefly and notices
              his presence.)
            </p>
            <p>
              (Scene: The following morning, Kendall and Jan sit at the
              breakfast table.)
            </p>
            <p>
              Jan: (looking slightly distant) Kendall, can we talk about
              something?
            </p>
            <p>Kendall: (concerned) Of course, Jan. What's on your mind?</p>
            <p>
              Jan: (hesitant) Last night, when I woke up for a moment, I noticed
              you were in my room. I appreciate your intention to keep me warm,
              but it made me feel a bit ignored as if you didn't want to disturb
              me.
            </p>
            <p>
              Kendall: (apologetic) Jan, I'm so sorry if I gave you that
              impression. I truly didn't want to disrupt your sleep, thinking it
              would be better to let you rest peacefully. I never meant for you
              to feel ignored.
            </p>
            <p>
              Jan: (sadly) Kendall, it's not just about that one incident.
              Lately, I've been feeling like our connection has faded. We seem
              to have different priorities and our communication has suffered. I
              think it might be best if we go our separate ways.
            </p>
            <p>
              Kendall: (taken aback) Jan, I didn't realize you felt this way.
              I'm devastated to hear that you want to end our relationship, but
              I respect your decision.
            </p>
            <p>
              Jan: (teary-eyed) Kendall, it's not an easy decision for me
              either. We had some beautiful moments together, but it feels like
              we've grown apart. It's time for both of us to find our own
              happiness.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan mutually agree to end their relationship,
              acknowledging that their paths have diverged. They part ways with
              a mix of sadness and gratitude for the time they shared. They
              cherish the memories they created but understand that it's time to
              move forward separately. They both embark on new journeys,
              learning and growing from the experiences they had together.)
            </p>
          </>
        );
      case 7:
        return (
          <>
            <p>Ending 2:</p>
            <p>
              (Scene: Kendall's act of pulling the covers over Jan reflects his
              care and love for her. Their relationship deepens as they continue
              to nurture their connection.)
            </p>
            <p>
              (Scene: Kendall and Jan spend quality time together, strengthening
              their bond.)
            </p>
            <p>
              Kendall: (smiling) Jan, I wanted to make sure you felt warm and
              comfortable. Your well-being means everything to me.
            </p>
            <p>
              Jan: (grateful) Kendall, your thoughtfulness never fails to touch
              my heart. It's moments like these that remind me how lucky I am to
              have you in my life.
            </p>
            <p>
              Kendall: (gently takes Jan's hand) Jan, being with you feels like
              home. You bring so much joy and warmth into my life. I can't
              imagine my days without you by my side.
            </p>
            <p>
              Jan: (blushing) Kendall, you make me feel cherished and loved. The
              way you care for me and pay attention to the little details fills
              me with happiness. I'm grateful for our deep connection.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan's relationship continues to flourish,
              filled with love, understanding, and mutual respect. They create a
              harmonious life together, supporting each other's dreams and
              aspirations. As time passes, their commitment deepens, and they
              decide to take their relationship to the next level.)
            </p>
            <p>
              (Scene: Kendall and Jan celebrate their engagement, surrounded by
              love and the promise of a lifelong partnership. They embark on a
              beautiful journey together, building a life filled with warmth,
              trust, and unwavering love.)
            </p>
          </>
        );
      case 8:
        return (
          <>
            <p>Ending 3:</p>
            <p>(Scene: Kendall and Jan move into their new home.)</p>
            <p>
              Kendall: (looking around with excitement) Jan, we did it! This
              place is perfect for us. I'm so glad I put our way of navigating
              into practice.
            </p>
            <p>
              Jan: (beaming) Kendall, I'm amazed at how you found this gem of a
              home. You truly have a knack for creating a beautiful and
              comfortable space.
            </p>
            <p>
              Kendall: (feeling loved and accomplished) Jan, your words mean the
              world to me. I wanted us to have a place we can truly call home,
              and seeing your happiness makes it all worthwhile.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan settle into their new home, surrounded by
              love, warmth, and the fruits of their shared navigation. The space
              becomes a sanctuary where their love flourishes, creating lasting
              memories and a solid foundation for their future together. Kendall
              feels a deep sense of fulfillment, knowing they were able to
              provide a great place for their shared happiness to thrive.)
            </p>
          </>
        );
      case 9:
        return (
          <>
            <p>Ending 4:</p>
            <p>
              (Scene: Kendall and Jan struggle to find a suitable place to
              live.)
            </p>
            <p>
              Kendall: (frustrated and detached) Jan, I thought I could find us
              a great home, but it's not working out as I hoped. I feel detached
              from the whole process.
            </p>
            <p>
              Jan: (supportive) Kendall, it's okay. Finding a home can be
              challenging, but we're in this together. Let's not get
              disheartened.
            </p>
            <p>
              Kendall: (reflective) Jan, I appreciate your understanding. I've
              realized that my navigation skills alone may not be enough. We
              should approach this as a team and seek professional guidance to
              find the perfect place.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Kendall and Jan regroup, seeking assistance from a real
              estate agent. Through their joint effort and the support they
              provide each other, they eventually find a suitable home. Kendall
              learns the importance of relying on others and working together,
              leading to a stronger bond and a sense of shared responsibility in
              their journey.)
            </p>
          </>
        );
      case 10:
        return (
          <>
            <p>Ending 5:</p>
            <p>
              (Scene: Kendall and Jan's appreciation for each other deepens
              their connection.)
            </p>
            <p>
              Jan: (softly) Kendall, I want you to know how much I appreciate
              what you did for me. Your care and kindness mean the world to me.
            </p>
            <p>
              Kendall: (smiling) Jan, seeing you happy and feeling appreciated
              is all I could ask for. I'm here for you, through thick and thin.
            </p>
            <p>
              Jan: (reflective) I've been guarded because of my past, but your
              actions and words show me that I can trust you. I want us to
              continue building our relationship.
            </p>
            <p>
              Kendall: (grateful) Jan, I'm here for you, and I want us to grow
              together. Let's work through any challenges that come our way and
              create a future filled with love and happiness.
            </p>
            <p>Consequence:</p>
            <p>
              (Scene: Jan's appreciation for Kendall's kindness deepens their
              bond, and they continue to nurture their relationship with care
              and understanding. The experience strengthens their bond, allowing
              them to overcome Jan's past reservations and build a loving and
              trusting partnership.)
            </p>
          </>
        );
      default:
        return null;
    }
  };

  const renderEndingPage = () => {
    return (
      <div>
        <h1>Thank You!</h1>
        <p>
          Thank you for playing the game. Please save your game history for
          future reference.
        </p>
        <button onClick={downloadHistory}>Download History</button>
      </div>
    );
  };

  const hello = () => {
    fetch("/hello")
      .then((res) => console.log(res.text()))
      .catch((err) => console.log(err));
  };
  return (
    <div className="game">
      {showEndingPage ? (
        renderEndingPage()
      ) : (
        <>
          <h1>Relationship Game</h1>
          {renderScene()}
          {result && <p>Result: {result}</p>}
          {gameEnded && <p>Game Ended</p>}
          <button onClick={hello}>Hello</button>
        </>
      )}
    </div>
  );
};

export default Game;

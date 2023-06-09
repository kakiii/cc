import { useState } from "react";

//import "./scene.css"
const Game = () => {
  function generateRandomString(length: number) {
    var userId = Math.floor(Math.random() * length * 100);
    return userId.toString();
  }
  function sceneTranslate(scene: string): string {
    const sceneMap: Record<string, string> = {
      "Begin": "1",
      "In Love": "2",
      "Angry": "5",
      "Talk To Jan": "3",
      "Clean Her Home": "4",
    };

    return sceneMap[scene] || "";
  }
  const [scene, setScene] = useState("Begin");
  const [result, setResult] = useState("");

  const [gameEnded, setGameEnded] = useState(false);
  const [showEndingPage, setShowEndingPage] = useState(false);
  //const [history, setHistory] = useState<{ option: string; rationale: string; emotion: string; }[]>([]);
  const [rationale, setRationale] = useState("");
  const [emotion, setEmotion] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [agreement, setAgreement] = useState("")
  const [history, setHistory] = useState<{
    userid: string;
    context_id: number;
    division: Record<
      string,
      {
        Option: string;
        user_rationale: string;
        //api_response: string;
        emotion: string;
        Agree_With_AI_Rationale: string;
      }
    >;
  }>({
    userid: generateRandomString(10000),
    context_id: 1,
    division: {},
  });

  const handleApiResponse = async (
    scene: string,
    choice: string
  ): Promise<void> => {
    try {
      const queryParams = new URLSearchParams({
        scene: sceneTranslate(scene),
        choice: choice,
      });

      const response = await fetch(`/chatgpt/response?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Request succeeded with JSON response", response);
        const data = await response.json();
        // console.log(content);
        setApiResponse(
          JSON.stringify(data.content.rationale.replace(/[\r\n"]/g, ""))
        );
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error when fetching API response:", error);
    }
  };

  const handleChoice = async (
    choice: string,
    rationale: string,
    emotion: string,
    Agree_With_AI_Rationale: string
  ): Promise<void> => {
    if (!gameEnded) {
      if (rationale.length == 0 || emotion.length == 0) {
        alert("Please fill in all the fields");
        return;
      }
    }
    const newResult: string = `${scene}+${choice}`;

    setHistory((prevHistory) => {
      const divId = `div${Object.keys(prevHistory.division).length + 1}`;
      return {
        ...prevHistory,
        division: {
          ...prevHistory.division,
          [divId]: {
            Option: choice,
            user_rationale: rationale,
            //api_response: apiResponse,
            emotion: emotion,
            Agree_With_AI_Rationale: Agree_With_AI_Rationale
          },
        },
      };
    });

    switch (scene) {
      case "Begin":
        if (choice === "In Love") {
          setScene("In Love");
        } else if (choice === "Angry") {
          setScene("Angry");
        }
        break;
      case "In Love":
        if (choice === "Talk To Jan") {
          setScene("Talk To Jan");
        } else if (choice === "Clean Her Home") {
          setScene("Clean Her Home");
        }
        break;
      case "Angry":
        if (choice === "Jan Gets Better") {
          setScene("Jan Gets Better");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        } else if (choice === "Appreciates") {
          setScene("Appreciates");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        }
        break;
      case "Talk To Jan":
        if (choice === "Ignored") {
          setScene("Ignored");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        } else if (choice === "Loved_Talk To Jan") {
          setScene("Loved_Talk To Jan");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        }
        break;
      case "Clean Her Home":
        if (choice === "Loved_Clean Her Home") {
          setScene("Loved_Clean Her Home");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        } else if (choice === "Detached") {
          setScene("Detached");
          setGameEnded(true);
          sendHistoryToEndpoint();
          setShowEndingPage(true);
        }
        break;
      case "Ignored":
      case "Loved_Talk To Jan":
      case "Loved_Clean Her Home":
      case "Detached":
      case "Jan Gets Better":
      case "Appreciates":
        setGameEnded(true);
        sendHistoryToEndpoint();
        setShowEndingPage(true);
        break;
      case "Ending":
        renderEndingPage();
        break;
      default:
        break;
    }
    
    //Reset Rationale and Emotion
    setAgreement("");
    setApiResponse("");
    setRationale("");
    setEmotion("");
  };

  /**
      // Check if an ending is reached
      if (newScene >= 3 && newScene <= 10) {
        setGameEnded(true);
        setShowEndingPage(true);
      }
    };*/

  const sendHistoryToEndpoint = () => {
    fetch("/db/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(history),
    })
      .then((response) => {
        if (response.ok) {
          alert("History sent successfully");
          console.log("History sent successfully");
        } else {
          alert("Failed to send history");
          console.log("Failed to send history");
        }
      })
      .catch((error) => {
        console.error("Error while sending history:", error);
      });
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
  /**    const submitButtonStyle = {
    marginTop: "-100px", // Adjust the marginTop value to move the button up
  }; */

  const renderScene = () => {
    switch (scene) {
      case "Begin": {
        return (
          <div>
            {/* <img src="/bg cafe.jpg" /> */}
            <div
              className="scene_begin"
              style={{
                backgroundImage: `url("images/bg cafe.jpg")`,
                height: `500px`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              a
            </div>
            <p>
              <h3>Kendall:</h3> (smiling affectionately) Jan, these past few
              months have been incredible. I can't believe how much we've grown
              together. I think our relationship is getting really serious.
            </p>
            <p>
              <h3>Jan:</h3> (grinning) Kendall, I feel the same way. I've never
              connected with someone on such a deep level before. It's like
              we're meant to be.
            </p>
            <p>
              <h4>How would Kendall feel about this?</h4>
            </p>
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="If you were Kendall, please write down your emotion"
              defaultValue=""
              onChange={(e) => setEmotion(e.target.value)}
              minLength={80}
              required
            />
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your rationale for making the choice"
              defaultValue=""
              onChange={(e) => setRationale(e.target.value)}
              required
minLength={80}
            />
            {/* <button type="submit" onClick={() => sendToBackEnd()}>Submit</button> */}
            <button onClick={() => handleChoice("In Love", rationale, emotion, agreement)}>
              A: In love
            </button>
            <button onClick={() => handleChoice("Angry", rationale, emotion, agreement)}>
              B: Angry
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>

          </div>
        );
      }
      case "In Love": {
        return (
          <div>
            <p>
              <h3>Kendall:</h3> (blushing) Yes, Jan, I'm completely in love with
              you. You make me feel like the luckiest person in the world. I
              want to cherish every moment we spend together.
            </p>
            <p>
              <h3>Jan:</h3> (smiling warmly) Kendall, you have my heart too. Our
              love is something truly special, and I can't wait to see where it
              takes us.
            </p>
            <p>
              (Kendall stands up to do the dishes while Jan goes into her room.
              Some time passes)
            </p>
            <p>(Scene: Kendall is in the kitchen, pondering his next move.)</p>
            <p>
              <h3>Kendall:</h3> (thinking) I wonder if Jan has found a date for
              the upcoming dance. I should go and talk to her about it.
            </p>

            <p>
              <h4>What willKendall want to do next?</h4>
            </p>
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="If you are Kendall, please write down your emotion"
              defaultValue=""
              onChange={(e) => setEmotion(e.target.value)}
              required
minLength={80}
            />
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your rationale for making the choice"
              defaultValue=""
              onChange={(e) => setRationale(e.target.value)}
              required
minLength={80}
            />
            {/* <button type="submit" onClick={() => sendToBackEnd()}>Submit</button> */}
            <button
              onClick={() => handleChoice("Talk To Jan", rationale, emotion, agreement)}
            >
              A: Talk to Jan
            </button>
            <button
              onClick={() => handleChoice("Clean Her Home", rationale, emotion, agreement)}
            >
              B: Clean her home
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>
          </div>
        );
      }
      case "Angry": {
        return (
          <div>
            <p>
              <h3>Kendall:</h3> (sitting down, looking frustrated) Jan, we need
              to talk.
            </p>
            <p>
              <h3>Jan:</h3> (concerned) What's wrong, Kendall? You seem upset.
            </p>
            <p>
              <h3>Kendall:</h3> (angry) I can't help but feel angry about our
              relationship. It's getting serious, and I thought we were on the
              same page, but it feels like you're holding back.
            </p>
            <p>
              <h3>Jan:</h3> (surprised) Kendall, I'm sorry if it seems that way.
              I care about you deeply, but I might have some reservations.
            </p>
            <p>
              <h3>Kendall:</h3> (frustrated) Reservations? After all this time
              together? What's holding you back?
            </p>
            <p>
              <h3>Jan:</h3> (taking a deep breath) Kendall, it's not about you.
              I've been hurt in the past, and it's made it difficult for me to
              fully open up and trust someone again.
            </p>
            <p>
              (Scene: Jan faints in Kendall's arms, causing concern and worry.)
            </p>

            <p>
              <h4>What will happen to Jan?</h4>
            </p>
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your emotion, if you were Jan"
              defaultValue=""
              onChange={(e) => setEmotion(e.target.value)}
              required
minLength={80}

            />
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your rationale, for making the choice"
              defaultValue=""
              onChange={(e) => setRationale(e.target.value)}
              required
minLength={80}

            />
            {/* <button type="submit" onClick={() => sendToBackEnd()}>Submit</button> */}
            <button
              onClick={() =>
                handleChoice("Jan Gets Better", rationale, emotion, agreement)
              }
            >
              A: Jan will get better
            </button>
            <button
              onClick={() => handleChoice("Appreciates", rationale, emotion, agreement)}
            >
              B: Jan appreciates what Kendall does
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>
          </div>
        );
      }
      case "Talk To Jan": {
        return (
          <div>
            <p>
              <h3>Kendall:</h3> (blushing) Yes, Jan, I'm completely in love with
              you. You make me feel like the luckiest person in the world. I
              want to cherish every moment we spend together.
            </p>
            <p>
              <h3>Jan:</h3> (smiling warmly) Kendall, you have my heart too. Our
              love is something truly special, and I can't wait to see where it
              takes us.
            </p>
            <p>
              (Kendall stands up to do the dishes while Jan goes into her room.
              Some time passes)
            </p>
            <p>
              (Scene: Kendall enters Jan's room, noticing she is sleeping on her
              stomach.)
            </p>
            <p>
              <h3>Kendall:</h3> (softly) Jan looks so peaceful sleeping like
              that. I want to make sure she stays warm.
            </p>
            <p>(Kendall tries to pull Jan’s covers over her body)</p>

            <p>
              <h4>How would Jan feel as a result?</h4>
            </p>
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your emotion, if you were Jan"
              defaultValue=""
              onChange={(e) => setEmotion(e.target.value)}
              required
minLength={80}
            />
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your rationale for making the choice"
              defaultValue=""
              onChange={(e) => setRationale(e.target.value)}
              required
minLength={80}
            />
            {/* <button type="submit" onClick={() => sendToBackEnd()}>Submit</button> */}
            <button onClick={() => handleChoice("Ignored", rationale, emotion, agreement)}>
              A: Being Ignored
            </button>
            <button
              onClick={() =>
                handleChoice("Loved_Talk To Jan", rationale, emotion, agreement)
              }
            >
              B: Being Loved
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>
          </div>
        );
      }
      case "Clean Her Home": {
        return (
          <div>
            <p>
              (Scene: Kendall decides to clean Jan's home while she is busy.)
            </p>
            <p>
              <h3>Kendall:</h3> (thinking to himself) Jan has been occupied
              lately, and I know she has a lot on her plate. I'll take this
              opportunity to clean her home and help lighten her load.
            </p>
            <p>
              (Scene: Kendall starts cleaning, tidying up the living room and
              organizing the kitchen.)
            </p>
            <p>
              <h3>Kendall:</h3> (focused on cleaning, muttering to himself) I
              want Jan to come back to a clean and cozy home. She deserves a
              relaxing space after her busy day.
            </p>
            <p>
              (Kendall looks at the overflowing shelves and the small living
              room)
            </p>
            <p>
              <h3>Kendall:</h3> I have to find a bigger home for us so we can
              live comfortably.
            </p>
            <p>
              (Kendall finds a big villa that is suitable for both him and Jen)
            </p>
            <p>
              <h4>How will Kendall feel?</h4>
            </p>
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your emotion, if you were Kendall"
              defaultValue=""
              onChange={(e) => setEmotion(e.target.value)}
              required
minLength={80}
            />
            <textarea
              style={{ width: "500px", height: "300px" }}
              placeholder="Please write down your rationale for making the choice"
              defaultValue=""
              onChange={(e) => setRationale(e.target.value)}
              required
minLength={80}
            />
            {/* <button type="submit" onClick={() => sendToBackEnd()}>Submit</button> */}
            <button
              onClick={() =>
                handleChoice("Loved_Clean Her Home", rationale, emotion, agreement)
              }
            >
              A: Being Loved
            </button>
            <button
              onClick={() => handleChoice("Detached", rationale, emotion, agreement)}
            >
              B: Detached
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>
          </div>
        );
      }
      case "Jan Gets Better": {
        return (
          <div>
            <p>
              <h3>Kendall:</h3> (panicked) Jan! Jan, wake up! Can you hear me?
            </p>
            <p>
              <h3>Jan:</h3> (slowly regaining consciousness) What... happened?
            </p>
            <p>
              <h3>Kendall:</h3> (relieved) You fainted, Jan. I was so worried.
              Are you feeling better now?
            </p>
            <p>
              <h3>Jan:</h3> (weakly) I think so. I'm sorry for causing you
              concern.
            </p>
            <p>
              <h3>Kendall:</h3> (softly) Jan, I care deeply about you. Seeing
              you in distress worried me, and I wanted to make sure you were
              okay.
            </p>
            <p>
              <h3>Jan:</h3> (smiling weakly) It means a lot to me, Kendall. Your
              kindness and support remind me that I have someone who genuinely
              cares about me.
            </p>
            <p>
              <h3>Kendall:</h3> (gently) You deserve to be cared for, Jan. I
              want to be the person who supports you and makes you feel loved.
            </p>
            <p>
              <h3>Jan:</h3> (reflective) I've been guarded because of my past,
              but your actions and words show me that I can trust you. I want us
              to continue building our relationship.
            </p>
            <p>
              <h3>Kendall:</h3> (grateful) Jan, I'm here for you, and I want us
              to grow together. Let's work through any challenges that come our
              way and create a future filled with love and happiness.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Jan's appreciation for Kendall's kindness
                deepens their connection, and they continue to nurture their
                relationship with care and understanding. The experience
                strengthens their bond, allowing them to overcome Jan's past
                reservations and build a loving and trusting partnership.)
              </h4>
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
            {/* {Render The apiResponse} */}
            <br></br>
            <textarea
              value={apiResponse}
              readOnly
              style={{ width: "500px", height: "300px" }}
            />
            <button onClick={() => handleApiResponse(scene, "A")}>
              AI Rationale of A
            </button>
            <button onClick={() => handleApiResponse(scene, "B")}>
              AI Rationale of B
            </button>

            <button id="agree" onClick={() => setAgreement("true")}>
              I <h4>AGREE</h4> with the AI Rationale
            </button>
            <button id="disagree" onClick={() => setAgreement("false")}>
              I <h4>DISAGREE</h4> with the AI Rationale
            </button>
          </div>
        );
      }
      case "Appreciates": {
        return (
          <div>
            <p>
              <h3>Jan:</h3> (softly) Kendall, I want you to know how much I
              appreciate what you did for me. Your care and kindness mean the
              world to me.
            </p>
            <p>
              <h3>Kendall:</h3> (smiling) Jan, seeing you happy and feeling
              appreciated is all I could ask for. I'm here for you, through
              thick and thin.
            </p>
            <p>
              <h3>Jan:</h3> (reflective) I never expected to find someone as
              caring and understanding as you, Kendall. You've shown me what it
              means to be loved and supported.
            </p>
            <p>
              <h3>Kendall:</h3> (tenderly) Jan, you deserve nothing less than
              love and support. I want to be the one who provides that for you,
              now and in the future.
            </p>
            <p>
              <h3>Jan:</h3> (grateful) With you by my side, I feel like I can
              overcome any challenges that come our way. Together, we can create
              a beautiful and fulfilling relationship.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Jan's gratitude deepens their bond, and
                they continue to nurture their relationship with care,
                understanding, and unconditional love. Their shared appreciation
                and commitment to each other create a strong foundation,
                allowing their love to grow and flourish. Kendall's dedication
                to Jan's happiness fosters a sense of security and happiness,
                making their relationship a source of joy and fulfillment for
                both of them.)
              </h4>
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
          </div>
        );
      }
      case "Ignored": {
        return (
          <div>
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
              <h3>Jan:</h3> (looking slightly distant) Kendall, can we talk
              about something?
            </p>
            <p>
              <h3>Kendall:</h3> (concerned) Of course, Jan. What's on your mind?
            </p>
            <p>
              <h3>Jan:</h3> (hesitant) Last night, when I woke up for a moment,
              I noticed you were in my room. I appreciate your intention to keep
              me warm, but it made me feel a bit ignored as if you didn't want
              to disturb me.
            </p>
            <p>
              <h3>Kendall:</h3> (apologetic) Jan, I'm so sorry if I gave you
              that impression. I truly didn't want to disrupt your sleep,
              thinking it would be better to let you rest peacefully. I never
              meant for you to feel ignored.
            </p>
            <p>
              <h3>Jan:</h3> (sadly) Kendall, it's not just about that one
              incident. Lately, I've been feeling like our connection has faded.
              We seem to have different priorities, and our communication has
              suffered. I think it might be best if we go our separate ways.
            </p>
            <p>
              <h3>Kendall:</h3> (taken aback) Jan, I didn't realize you felt
              this way. I'm devastated to hear that you want to end our
              relationship, but I respect your decision.
            </p>
            <p>
              <h3>Jan:</h3> (teary-eyed) Kendall, it's not an easy decision for
              me either. We had some beautiful moments together, but it feels
              like we've grown apart. It's time for both of us to find our own
              happiness.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Kendall and Jan mutually agree to end their
                relationship, acknowledging that their paths have diverged. They
                part ways with a mix of sadness and gratitude for the time they
                shared. They cherish the memories they created but understand
                that it's time to move forward separately. They both embark on
                new journeys, learning and growing from the experiences they had
                together.)
              </h4>
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
          </div>
        );
      }
      case "Loved_Talk To Jan": {
        return (
          <div>
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
              <h3>Kendall:</h3> (smiling) Jan, I wanted to make sure you felt
              warm and comfortable. Your well-being means everything to me.
            </p>
            <p>
              <h3>Jan:</h3> (grateful) Kendall, your thoughtfulness never fails
              to touch my heart. It's moments like these that remind me how
              lucky I am to have you in my life.
            </p>
            <p>
              <h3>Kendall:</h3> (gently takes Jan's hand) Jan, being with you
              feels like home. You bring so much joy and warmth into my life. I
              can't imagine my days without you by my side.
            </p>
            <p>
              <h3>Jan:</h3> (blushing) Kendall, you make me feel cherished and
              loved. The way you care for me and pay attention to the little
              details fills me with happiness. I'm grateful for our deep
              connection.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Kendall and Jan's relationship continues to
                flourish, filled with love, understanding, and mutual respect.
                They create a harmonious life together, supporting each other's
                dreams and aspirations. As time passes, their commitment
                deepens, and they decide to take their relationship to the next
                level.)
              </h4>
            </p>
            <p>
              (Scene: Kendall and Jan celebrate their engagement, surrounded by
              love and the promise of a lifelong partnership. They embark on a
              beautiful journey together, building a life filled with warmth,
              trust, and unwavering love.)
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
          </div>
        );
      }
      case "Loved_Clean Her Home": {
        return (
          <div>
            <p>(Scene: Kendall and Jan move into their new home.)</p>
            <p>
              <h3>Kendall:</h3> (looking around with excitement) Jan, we did it!
              This place is perfect for us. I'm so glad I put our way of
              navigating into practice.
            </p>
            <p>
              <h3>Jan:</h3> (beaming) Kendall, I'm amazed at how you found this
              gem of a home. You truly have a knack for creating a beautiful and
              comfortable space.
            </p>
            <p>
              <h3>Kendall:</h3> (feeling loved and accomplished) Jan, your words
              mean the world to me. I wanted us to have a place we can truly
              call home, and seeing your happiness makes it all worthwhile.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Kendall and Jan settle into their new home,
                surrounded by love, warmth, and the fruits of their shared
                navigation. The space becomes a sanctuary where their love
                flourishes, creating lasting memories and a solid foundation for
                their future together. Kendall feels a deep sense of
                fulfillment, knowing they were able to provide a great place for
                their shared happiness to thrive.)
              </h4>
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
          </div>
        );
      }
      case "Detached": {
        return (
          <div>
            <p>
              (Scene: Kendall and Jan struggle to find a suitable place to
              live.)
            </p>
            <p>
              <h3>Kendall:</h3> (frustrated and detached) Jan, I thought I could
              find us a great home, but it's not working out as I hoped. I feel
              detached from the whole process.
            </p>
            <p>
              <h3>Jan:</h3> (supportive) Kendall, it's okay. Finding a home can
              be challenging, but we're in this together. Let's not get
              disheartened.
            </p>
            <p>
              <h3>Kendall:</h3> (reflective) Jan, I appreciate your
              understanding. I've realized that my navigation skills alone may
              not be enough. We should approach this as a team and seek
              professional guidance to find the perfect place.
            </p>
            <p>
              <h4>
                Consequence: (Scene: Kendall and Jan regroup, seeking assistance
                from a real estate agent. Through their joint effort and the
                support they provide each other, they eventually find a suitable
                home. Kendall learns the importance of relying on others and
                working together, leading to a stronger bond and a sense of
                shared responsibility in their journey.)
              </h4>
            </p>
            <button onClick={() => handleChoice("Ending", "", "", "")}>
              Ending
            </button>
          </div>
        );
      }
      case "Agree": {
        return (
          <div>
            <p> Here is the AI rationale of your previous choice:</p>
          </div>
        );
      }

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
        </>
      )}
    </div>
  );
};

// export default Game;

export default Game;

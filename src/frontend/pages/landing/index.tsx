import { Button, Card, Input, theme } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const styles = require("./index.module.scss");

const { useToken } = theme;

export default function LandingPage() {
  const [isQuestShown, setIsQuestShown] = useState(false);
  const [quest, setQuest] = useState("");
  const [dest, setDest] = useState("");
  const { token } = useToken();
  const router = useRouter();

  const callback = () => {
    if (isQuestShown && quest) {
      router.push(
        `/itinerary?location=${encodeURIComponent(
          dest
        )}&quest=${encodeURIComponent(quest)}`
      );
    } else {
      router.push(`/main-quests?location=${encodeURIComponent(dest)}`);
    }
  };

  return (
    <div
      className={styles.LandingPage}
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Card className={styles["card"]}>
        <div
          className={styles["card-body"]}
          onKeyDown={(evt) => {
            if (evt.key !== "Enter") {
              return;
            }

            callback();
          }}
        >
          <div
            style={{
              color: token.colorPrimary,
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            ☁️ ClaudeAtlas
          </div>
          <div style={{ textAlign: "center" }}>
            Where do you want to travel to?
          </div>
          <Input
            value={dest}
            onChange={(evt) => setDest(evt.target.value)}
            placeholder="Enter a city name"
          />
          {isQuestShown ? (
            <Input
              value={quest}
              onChange={(evt) => setQuest(evt.target.value)}
              placeholder="Where do you have to visit?"
            />
          ) : (
            <Button block onClick={() => setIsQuestShown((val) => !val)}>
              I have a place I have to visit
            </Button>
          )}
          <Button type="primary" block onClick={callback}>
            Show me some itineraries!
          </Button>
        </div>
      </Card>
    </div>
  );
}

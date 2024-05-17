import Navbar from "@/app/components/navigation/navbar";
import VoiceRec from "./components/textToSpeech";

export default function Home() {
  return (
    <div>
      <Navbar />
      <VoiceRec />
    </div>
  );
}

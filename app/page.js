import Image from "next/image";
import ChatApp from "./components/ChatApp";
import Me from "./components/Me";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      {/* <ChatApp /> */}
      <Me />
    </main>
  );
}

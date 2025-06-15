import { ChatInterface } from "../chat-interface";
import { TaskContent } from "./task-content";

export default function TasksChatbot() {
  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      <ChatInterface />
      <TaskContent />
    </div>
  );
}

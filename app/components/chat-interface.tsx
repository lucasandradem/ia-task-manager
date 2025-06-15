import type React from "react";

import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "That's an interesting question! Let me think about that for a moment.",
  "I'd be happy to help you with that. Here's what I think...",
  "Great point! From my perspective, I would say...",
  "That's a fascinating topic. Let me share some insights on that.",
  "I understand what you're asking. Here's my take on it...",
  "Thanks for bringing that up! I think the key thing to consider is...",
  "That's a really good question. Based on what I know...",
  "I appreciate you asking! Let me break this down for you...",
  "Interesting! I've been thinking about similar topics lately...",
  "That's something I can definitely help with. Here's what I suggest...",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, messages.length]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("oi")
    ) {
      return "Hello! How can I help you today? 👋";
    }

    if (
      lowerMessage.includes("how are you") ||
      lowerMessage.includes("como vai")
    ) {
      return "I'm doing great, thank you for asking! I'm here and ready to chat with you. How are you doing?";
    }

    if (lowerMessage.includes("name") || lowerMessage.includes("nome")) {
      return "I'm your AI assistant! You can call me Bot. What's your name?";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("ajuda")) {
      return "I'm here to help! You can ask me questions, have a conversation, or just chat about anything you'd like. What would you like to talk about?";
    }

    if (lowerMessage.includes("weather") || lowerMessage.includes("tempo")) {
      return "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for the most accurate forecast in your area!";
    }

    if (lowerMessage.includes("joke") || lowerMessage.includes("piada")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 😄",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
        "What do you call a fake noodle? An impasta! 🍝",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length === 0 || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const clearChat = () => {
    setMessages([]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="h-full max-h-[600px]">
      <div className="mx-auto max-w-4xl">
        <Card className="h-[85vh] flex flex-col shadow-xl">
          <CardContent className="flex-1 overflow-hidden">
            <div
              className="h-full overflow-y-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="space-y-4 min-h-full">
                <div className={`flex gap-3 ${"justify-start"}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${"bg-white border shadow-sm"}`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      Olá! Descreva a tarefa!
                    </p>
                    <p
                      className={`text-xs mt-1 opacity-70 ${"text-slate-500"}`}
                    >
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-blue-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 opacity-70 ${
                          message.role === "user"
                            ? "text-blue-100"
                            : "text-slate-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-slate-600 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-blue-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-white/50 backdrop-blur p-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1"
                maxLength={500}
              />
              <Button
                type="submit"
                disabled={isLoading || input.length === 0}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

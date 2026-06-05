import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { messages } from "../../data/mockData";

const CHATS = {
  1: [
    { id: 1, from: "seller", text: "Hello! Your order is ready for pickup.", time: "10:23 AM" },
    { id: 2, from: "me", text: "Great! I'll pick it up this afternoon.", time: "10:25 AM" },
    { id: 3, from: "seller", text: "Perfect. Our store is open until 7 PM.", time: "10:26 AM" },
  ],
  2: [
    { id: 1, from: "seller", text: "Hi there! We have a special discount for you this week — 15% off all electronics!", time: "9:00 AM" },
  ],
  3: [
    { id: 1, from: "me", text: "Hi, is the 20000mAh power bank still available?", time: "Yesterday" },
    { id: 2, from: "seller", text: "Yes it is! Would you like to place an order?", time: "Yesterday" },
  ],
};

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState(CHATS);

  const send = () => {
    if (!input.trim()) return;
    setChats((c) => ({
      ...c,
      [activeChat]: [...(c[activeChat] || []), { id: Date.now(), from: "me", text: input, time: "Just now" }],
    }));
    setInput("");
  };

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Messages</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex" style={{ height: "60vh" }}>
          {/* Sidebar */}
          <div className="w-72 border-r border-gray-100 dark:border-gray-700 flex flex-col shrink-0">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <input placeholder="Search…" className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2 text-sm outline-none text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setActiveChat(msg.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-gray-50 dark:border-gray-700 transition ${activeChat === msg.id ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-bold truncate ${activeChat === msg.id ? "text-green-700 dark:text-green-400" : "text-gray-800 dark:text-white"}`}>{msg.from}</p>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{msg.last}</p>
                  </div>
                  {msg.unread > 0 && (
                    <span className="w-4 h-4 bg-green-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0">{msg.unread}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                {messages.find((m) => m.id === activeChat)?.avatar}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800 dark:text-white">{messages.find((m) => m.id === activeChat)?.from}</p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(chats[activeChat] || []).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-green-200" : "text-gray-400"}`}>{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"><FiPaperclip size={16} /></button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none border border-gray-200 dark:border-gray-600 focus:border-green-400 transition"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={send}
                className="w-9 h-9 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center text-white transition"
              >
                <FiSend size={15} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Bot, X, Send, Minus, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const StickyActions: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Thanks for reaching out to Aadhyaraj Technologies 😊\nCan I have your name please?",
    },
  ]);

  const [input, setInput] = useState("");
  const [step, setStep] = useState<"START" | "ASK_PHONE" | "ASK_MESSAGE" | "DONE">("START");

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // PHONE VALIDATION
  const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    let reply = "";

    // STEP 1: NAME
    if (step === "START") {
      setUserData((prev) => ({ ...prev, name: userMessage }));
      setStep("ASK_PHONE");

      reply = "Nice to meet you 😊\nCan I have your contact number please?";
    }

    // STEP 2: PHONE
    else if (step === "ASK_PHONE") {
      if (!isValidPhone(userMessage)) {
        reply = "Please enter a valid 10-digit phone number 📱";
      } else {
        setUserData((prev) => ({ ...prev, phone: userMessage }));
        setStep("ASK_MESSAGE");

        reply = "Got it 👍\nHow can we help you today?";
      }
    }

    // STEP 3: MESSAGE + SAVE LEAD
    else if (step === "ASK_MESSAGE") {
      setUserData((prev) => ({ ...prev, message: userMessage }));
      setStep("DONE");

      const finalData = {
        name: userData.name,
        phone: userData.phone,
        message: userMessage,
        email: "chat@aadhraj.com",
        subject: "AI Chat Lead",
      };

      // SEND TO BACKEND
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }).catch((err) => console.error("Chat send error:", err));

      reply =
        "Thank you 😊 Our team will contact you shortly.";

      // OPTIONAL WHATSAPP REDIRECT
      setTimeout(() => {
        window.open(
          "https://wa.me/919127912345?text=Hi, I just contacted via website chat",
          "_blank"
        );
      }, 2000);
    }

    // DONE STATE
    else {
      reply = "If you need anything else, feel free to ask 👍";
    }

    // TYPING EFFECT
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    }, 800);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-[9999]">
        <motion.a
          href="https://wa.me/919127912345"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg border-2 border-white/20"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.a>
      </div>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border overflow-hidden flex flex-col h-[520px]"
            >
              {/* HEADER */}
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                    <Bot className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">
                      AadhRaj Assistant
                    </h3>
                    <p className="text-xs text-gray-600">Online</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-black/10 rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-black/10 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] flex gap-2 ${
                        msg.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          msg.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-stone-200"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>

                      <div
                        className={`p-3 rounded-2xl text-sm ${
                          msg.role === "user"
                            ? "bg-green-600 text-white rounded-tr-none"
                            : "bg-white border rounded-tl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}

                {/* TYPING */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border rounded-2xl p-3 text-sm flex gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* INPUT */}
              <div className="p-3 border-t flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 text-sm border rounded-xl focus:outline-none"
                />

                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING BUTTON */}
        <motion.button
          onClick={() => {
            setIsChatOpen((p) => !p);
            setIsMinimized(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg flex items-center justify-center"
        >
          {isChatOpen && !isMinimized ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default StickyActions;
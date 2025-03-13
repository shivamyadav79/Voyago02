// CityChat.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import debounce from "lodash.debounce";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5002");

const CityChat = ({ cityId, user }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (!cityId) return;
        socket.emit("joinRoom", cityId);
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        socket.on("messageDeleted", ({ messageId }) => {
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        });
        socket.on("userTyping", (status) => {
            setIsTyping(status);
        });

        return () => {
            socket.emit("leaveRoom", cityId);
            socket.off("message");
            socket.off("messageDeleted");
            socket.off("userTyping");
        };
    }, [cityId]);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMessage = {
            cityId,
            userId: user.id,
            username: user.name,
            message,
            avatar: user.avatar,
            id: Date.now(),
        };
        socket.emit("newMessage", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        setMessage("");
    };

    const handleTyping = useCallback(
        debounce(() => {
            socket.emit("userTyping", true);
            setTimeout(() => socket.emit("userTyping", false), 1000);
        }, 300),
        []
    );

    const deleteMessage = (id) => {
        socket.emit("deleteMessage", id);
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-blue-600 text-white py-2 px-4 font-bold flex justify-between">
                City Chat - {cityId}
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
            </div>

            <div className="p-3 h-60 overflow-y-auto">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2 mb-2"
                    >
                        <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <div className="bg-gray-200 px-3 py-2 rounded-lg">
                            <p className="font-semibold">{msg.username}</p>
                            <p>{msg.message}</p>
                        </div>
                        {msg.userId === user.id && (
                            <button
                                className="text-red-500 text-sm"
                                onClick={() => deleteMessage(msg.id)}
                            >
                                🗑
                            </button>
                        )}
                    </motion.div>
                ))}
                <div ref={chatRef}></div>
                {isTyping && (
                    <p className="text-sm italic text-gray-500">Someone is typing...</p>
                )}
            </div>

            {showEmojiPicker && (
                <EmojiPicker onEmojiClick={(emojiObject) => setMessage(message + emojiObject.emoji)} />
            )}

            <div className="flex items-center border-t p-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleTyping}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default CityChat;

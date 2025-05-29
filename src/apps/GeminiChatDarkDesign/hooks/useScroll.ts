import { useRef, useState } from "react";

export const useScroll = () => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollEndRef.current?.scrollIntoView();
  };

  return {
    isAtBottom,
    setIsAtBottom,
    showScrollToBottom,
    setShowScrollToBottom,
    scrollContainerRef,
    scrollEndRef,
  };
};

import { useEffect, useRef, useState } from "react";
import { IMessage } from "../interfaces";

export const useScrollControl = (messages: Array<IMessage>) => {
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Функция скроллинга в самый низ
  const scrollToBottom = () => {
    if (scrollContainerRef !== null) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Проверка положения скролла относительно конца контейнера
  const handleScroll = () => {
    if (scrollContainerRef === null || scrollContainerRef.current === null) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current as HTMLDivElement;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 8 * 34;
    setShowScrollDownButton(!isNearBottom);
  };

  // Подписка и отписка наблюдателя за скроллом контейнера
  useEffect(() => {
    if (scrollContainerRef === null || scrollContainerRef.current === null) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Скролл в низ при старте
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Скролл в низ при изменении сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return { showScrollDownButton, scrollContainerRef, scrollToBottom };
};

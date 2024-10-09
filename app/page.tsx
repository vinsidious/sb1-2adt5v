"use client";

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter, usePathname } from 'next/navigation';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple',
  'orange', 'pink', 'teal', 'indigo', 'cyan'
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const colorIndex = colors.findIndex(color => pathname === `/${color}`);
    if (colorIndex !== -1) {
      setCurrentIndex(colorIndex);
    } else if (pathname === '/') {
      setCurrentIndex(0);
    }
  }, [pathname]);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Up' || eventData.dir === 'Down') {
        setDirection(eventData.deltaY);
      }
    },
    onSwipedUp: () => {
      if (currentIndex < colors.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        router.push(`/${colors[currentIndex + 1]}`);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
        router.push(`/${colors[currentIndex - 1]}`);
      }
    },
    onTouchEndOrOnMouseUp: () => {
      setDirection(0);
    },
    trackMouse: true,
  });

  const currentColor = colors[currentIndex];
  const prevColor = colors[currentIndex - 1] || colors[currentIndex];
  const nextColor = colors[currentIndex + 1] || colors[currentIndex];

  const containerStyle = {
    backgroundColor: currentColor,
    transform: `translateY(${direction}px)`,
  };

  const prevStyle = {
    position: 'fixed' as const,
    top: '-100%',
    left: 0,
    right: 0,
    bottom: '100%',
    backgroundColor: prevColor,
    transform: `translateY(${Math.max(0, direction)}px)`,
  };

  const nextStyle = {
    position: 'fixed' as const,
    top: '100%',
    left: 0,
    right: 0,
    bottom: '-100%',
    backgroundColor: nextColor,
    transform: `translateY(${Math.min(0, direction)}px)`,
  };

  return (
    <div {...handlers}>
      <div style={prevStyle} />
      <div className="page-container" style={containerStyle}>
        <div className="page-content">
          {currentColor.charAt(0).toUpperCase() + currentColor.slice(1)} Page
        </div>
      </div>
      <div style={nextStyle} />
    </div>
  );
}
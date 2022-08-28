/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  NONE = 'NONE',
}

// 获取滚动方向与滚动距离
export default (): { direction: Direction; distance: number } => {
  const [direction, setDirection] = useState(Direction.NONE);
  const [distance, setDistance] = useState(0);

  let top: number;
  let left: number;

  const _listener = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    if (scrollTop - top > 0) {
      setDirection(Direction.DOWN);
      setDistance(scrollTop);
    }
    if (scrollTop - top < 0) {
      setDirection(Direction.UP);
      setDistance(scrollTop);
    }
    if (scrollLeft - left > 0) {
      setDirection(Direction.RIGHT);
      setDistance(scrollLeft);
    }
    if (scrollLeft - left < 0) {
      setDirection(Direction.LEFT);
      setDistance(scrollLeft);
    }
    top = scrollTop;
    left = scrollLeft;
  };

  useEffect(() => {
    top = window.scrollY || document.documentElement.scrollTop;
    left = window.scrollX || document.documentElement.scrollLeft;
    const listener = throttle(_listener, 200);
    window.addEventListener('scroll', listener, false);
    return () => {
      window.removeEventListener('scroll', listener, false);
    };
  }, []);

  return { direction, distance };
};

import { useState, useEffect } from 'react';

interface CurrentTime {
  time: string;
  date: string;
}

export function useCurrentTime(): CurrentTime {
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    time: '',
    date: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time (HH:MM:SS)
      const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      // Format date
      const date = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentTime({ time, date });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
}

import { useEffect, useState } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="digital-clock-container">
      <div className="digital-clock">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default DigitalClock;

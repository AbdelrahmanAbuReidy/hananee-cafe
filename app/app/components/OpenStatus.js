'use client';

import { useEffect, useState } from 'react';
import styles from './OpenStatus.module.css';

const OPEN_HOUR = 9;   // 9 AM
const CLOSE_HOUR = 23; // 11 PM

function getMalaysiaHour() {
  // Hananee is in Kuching (MYT, UTC+8). Compute the local hour in Asia/Kuala_Lumpur
  // regardless of the visitor's timezone.
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const hourPart = parts.find((p) => p.type === 'hour');
  const hour = parseInt(hourPart?.value ?? '0', 10);
  // `hour12: false` with the `h24` cycle can yield "24" for midnight on some
  // platforms; en-US returns "0" but we normalise defensively.
  return Number.isFinite(hour) ? hour % 24 : 0;
}

function getStatus(hour) {
  if (hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
    if (hour >= CLOSE_HOUR - 1) {
      return { open: true, label: 'Closing Soon', detail: 'Last call before 11 PM' };
    }
    return { open: true, label: 'Open Now', detail: 'Pit lane is hot — come in' };
  }
  if (hour < OPEN_HOUR) {
    const hoursTo = OPEN_HOUR - hour;
    return {
      open: false,
      label: 'Closed',
      detail: hoursTo === 1 ? 'Lights on in 1 hour' : `Opens in ${hoursTo} hours`,
    };
  }
  // After close, count to next 9 AM (next day)
  const hoursTo = 24 - hour + OPEN_HOUR;
  return {
    open: false,
    label: 'Closed',
    detail: hoursTo === 1 ? 'Lights on in 1 hour' : `Opens in ${hoursTo} hours`,
  };
}

export default function OpenStatus({ variant = 'default' }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(getMalaysiaHour()));
    update();
    // Re-check once a minute in case the visitor leaves the tab open across the open/close threshold.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Render a stable placeholder during SSR / before the timezone-aware client effect runs,
  // so the markup matches across server + first client paint.
  if (!status) {
    return (
      <div
        className={`${styles.wrap} ${styles[variant] || ''} ${styles.loading}`}
        aria-live="polite"
        aria-label="Checking opening status"
      >
        <span className={styles.dot} aria-hidden="true" />
        <div className={styles.copy}>
          <span className={styles.label}>Checking…</span>
          <span className={styles.detail}>9 AM – 11 PM daily</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.wrap} ${styles[variant] || ''} ${status.open ? styles.open : styles.closed}`}
      aria-live="polite"
      aria-label={`${status.label} — ${status.detail}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.copy}>
        <span className={styles.label}>{status.label}</span>
        <span className={styles.detail}>{status.detail}</span>
      </div>
    </div>
  );
}

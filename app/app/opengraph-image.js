import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Branded social-share card (WhatsApp / Facebook / iMessage / Twitter).
// Generated at build time so the preview is always a correctly-sized 1200x630
// PNG well under every scraper's size limit — no heavy static asset to drop.
export const alt = 'Hananee Café — F1-Inspired Coffee Experience in Kuching, Sarawak';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Inline the logo so the renderer never has to fetch it over the network.
const logoSrc = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), 'public', 'logo.jpg'),
).toString('base64')}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #2f4f27 0%, #1a2d16 55%, #243d1e 100%)',
          color: '#fdf9ed',
          padding: '72px',
          position: 'relative',
        }}
      >
        {/* F1 racing stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '16px',
            display: 'flex',
            background:
              'repeating-linear-gradient(90deg, #e10600 0 44px, transparent 44px 88px)',
          }}
        />

        {/* Main row: logo + wordmark */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '56px' }}>
          <div
            style={{
              display: 'flex',
              width: '288px',
              height: '288px',
              borderRadius: '40px',
              overflow: 'hidden',
              border: '6px solid rgba(212, 168, 67, 0.9)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45)',
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={288}
              height={288}
              style={{ objectFit: 'cover', borderRadius: '34px' }}
              alt=""
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '728px' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '25px',
                letterSpacing: '6px',
                color: '#ff6b63',
              }}
            >
              F1-INSPIRED COFFEE EXPERIENCE
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '96px',
                lineHeight: 1.02,
                marginTop: '16px',
                color: '#ffffff',
              }}
            >
              Hananee Café
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '34px',
                marginTop: '22px',
                color: '#e0cc88',
              }}
            >
              Handcrafted Coffee / Racing Vibes
            </div>
          </div>
        </div>

        {/* Bottom row: location + hours */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '28px',
            color: '#dcefd8',
          }}
        >
          <div style={{ display: 'flex' }}>Kuching, Sarawak, Malaysia</div>
          <div style={{ display: 'flex', color: '#d4a843' }}>
            Open Daily 9AM - 11PM
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

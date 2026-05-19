import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  maxHeight?: number;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '',
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Creator',
  title = 'Content Creator',
  handle = 'creator',
  status = 'Available',
  contactText = 'View Profile',
  showUserInfo = true,
  onContactClick,
  maxHeight = 460,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };
      for (const [k, v] of Object.entries(props)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) { currentX = x; currentY = y; setVarsFromXY(currentX, currentY); },
      setTarget(x, y) { targetX = x; targetY = y; start(); },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) { initialUntil = performance.now() + durationMs; start(); },
      getCurrent() { return { x: currentX, y: currentY, tx: targetX, ty: targetY }; },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null; running = false; lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerEnter = useCallback((event: PointerEvent) => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    shell.classList.add('active', 'entering');
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => shell.classList.remove('entering'), ANIMATION_CONFIG.ENTER_TRANSITION_MS);
    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    const { beta, gamma } = event;
    if (beta == null || gamma == null) return;
    const centerX = shell.clientWidth / 2;
    const centerY = shell.clientHeight / 2;
    const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
    const y = clamp(centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity, 0, shell.clientHeight);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine, mobileTiltSensitivity]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    const move = handlePointerMove as EventListener;
    const enter = handlePointerEnter as EventListener;
    const leave = handlePointerLeave as EventListener;
    const orient = handleDeviceOrientation as EventListener;

    shell.addEventListener('pointerenter', enter);
    shell.addEventListener('pointermove', move);
    shell.addEventListener('pointerleave', leave);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent as typeof DeviceMotionEvent & { requestPermission?: () => Promise<string> };
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion.requestPermission().then(state => { if (state === 'granted') window.addEventListener('deviceorientation', orient); }).catch(console.error);
      } else {
        window.addEventListener('deviceorientation', orient);
      }
    };
    shell.addEventListener('click', handleClick);

    tiltEngine.setImmediate((shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET, ANIMATION_CONFIG.INITIAL_Y_OFFSET);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', enter);
      shell.removeEventListener('pointermove', move);
      shell.removeEventListener('pointerleave', leave);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', orient);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [enableTilt, enableMobileTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave, handleDeviceOrientation]);

  const cardRadius = '24px';

  const cardStyle = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
    '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
    '--behind-glow-color': behindGlowColor ?? 'rgba(197,255,61,0.4)',
    '--behind-glow-size': behindGlowSize ?? '50%',
    '--pointer-x': '50%', '--pointer-y': '50%',
    '--pointer-from-center': '0', '--pointer-from-top': '0.5', '--pointer-from-left': '0.5',
    '--card-opacity': '0', '--rotate-x': '0deg', '--rotate-y': '0deg',
    '--background-x': '50%', '--background-y': '50%',
    '--card-radius': cardRadius,
    '--sunpillar-1': 'hsl(2,100%,73%)', '--sunpillar-2': 'hsl(53,100%,69%)',
    '--sunpillar-3': 'hsl(93,100%,69%)', '--sunpillar-4': 'hsl(176,100%,76%)',
    '--sunpillar-5': 'hsl(228,100%,74%)', '--sunpillar-6': 'hsl(283,100%,73%)',
    '--sunpillar-clr-1': 'var(--sunpillar-1)', '--sunpillar-clr-2': 'var(--sunpillar-2)',
    '--sunpillar-clr-3': 'var(--sunpillar-3)', '--sunpillar-clr-4': 'var(--sunpillar-4)',
    '--sunpillar-clr-5': 'var(--sunpillar-5)', '--sunpillar-clr-6': 'var(--sunpillar-6)',
  }), [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize, cardRadius]);

  const shineStyle: React.CSSProperties = {
    maskImage: 'var(--icon)', maskMode: 'luminance', maskRepeat: 'repeat',
    maskSize: '150%', maskPosition: 'top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))',
    filter: 'brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5)',
    animation: 'pc-holo-bg 18s linear infinite', animationPlayState: 'running',
    mixBlendMode: 'color-dodge', transform: 'translate3d(0,0,1px)',
    overflow: 'hidden', zIndex: 3, background: 'transparent',
    backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundImage: `repeating-linear-gradient(0deg,var(--sunpillar-clr-1) 5%,var(--sunpillar-clr-2) 10%,var(--sunpillar-clr-3) 15%,var(--sunpillar-clr-4) 20%,var(--sunpillar-clr-5) 25%,var(--sunpillar-clr-6) 30%,var(--sunpillar-clr-1) 35%), repeating-linear-gradient(-45deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,29%,66%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12%), radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,0%,0.1) 12%,hsla(0,0%,0%,0.15) 20%,hsla(0,0%,0%,0.25) 120%)`,
    gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none',
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0,0,1.1px)', overflow: 'hidden',
    backgroundImage: `radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsl(248,25%,80%) 12%,hsla(207,40%,30%,0.8) 90%)`,
    mixBlendMode: 'overlay', filter: 'brightness(0.8) contrast(1.2)',
    zIndex: 4, gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none',
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{ perspective: '500px', width: '100%', ...cardStyle } as React.CSSProperties}
    >
      <div ref={shellRef} className="relative z-[1]">
        <section
          className="relative overflow-hidden flex flex-col"
          style={{
            width: '100%',
            maxHeight: `${maxHeight}px`,
            aspectRatio: '0.718',
            borderRadius: cardRadius,
            background: '#ffffff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 1s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            const shell = shellRef.current;
            e.currentTarget.style.transition = shell?.classList.contains('entering') ? 'transform 180ms ease-out' : 'transform 1s ease';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          {/* Photo — fills top 70% */}
          <div className="relative overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
            <img
              src={avatarUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover object-top"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Info bar — white, bottom */}
          {showUserInfo && (
            <div
              className="shrink-0 flex items-center justify-between px-4 py-4 border-t-2 border-black"
              style={{ background: '#fff' }}
            >
              <div className="flex flex-col gap-1.5">
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '17px', lineHeight: 1, color: '#000', fontWeight: 700 }}>
                  {name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#444', lineHeight: 1 }}>
                  {title}
                </div>
              </div>
              {contactText && (
                <button
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '999px', border: '1.5px solid #000', color: '#000', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onClick={() => onContactClick?.()}
                  type="button"
                >
                  {contactText}
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;

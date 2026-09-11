import {
  USER_PROFILE,
  WEEKLY_ACTIVITY,
  HOME_STATS,
  EXERCISE_CATEGORIES,
  PROGRESS_DATA,
  PROGRESS_TIMEFRAMES,
  SET_TYPES,
  CALENDAR_DAYS,
  RECENT_WORKOUTS
} from './data.js';

// SVG Icon Helper
export function icon(name, size = 18, color = 'currentColor', fill = 'none') {
  const icons = {
    dumbbell: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`,
    play: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill === 'none' ? color : fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
    pause: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    flame: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>`,
    trophy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
    chevronRight: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    chevronLeft: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
    plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    minus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
    search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    calendar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    trendingUp: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    home: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    user: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    bookmark: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
    more: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
    info: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    target: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    scale: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    bell: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    download: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    upload: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
    fileText: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
    shield: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
    help: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
    volume2: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    volumeX: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
    rotateCcw: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`
  };
  return icons[name] || '';
}

// Muscle Anatomy Diagram SVG
export function renderMuscleMap(primary = "Chest", secondary = "Triceps") {
  return `
    <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-card); margin: 8px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <span style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Muscle Groups</span>
        <div style="display: flex; gap: 12px; font-size: 11px;">
          <span style="display: flex; align-items: center; gap: 5px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 6px #EF4444;"></span>
            <span style="color: var(--text-primary); font-weight: 600;">${primary} (Primary)</span>
          </span>
          <span style="display: flex; align-items: center; gap: 5px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #F97316; box-shadow: 0 0 6px #F97316;"></span>
            <span style="color: var(--text-secondary);">${secondary} (Secondary)</span>
          </span>
        </div>
      </div>

      <div style="display: flex; justify-content: center; align-items: center; gap: 28px; padding: 4px 0;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <svg width="80" height="115" viewBox="0 0 100 140" fill="none">
            <circle cx="50" cy="18" r="10" fill="#243248" />
            <path d="M46 28 H54 V34 H46 Z" fill="#243248" />
            <path d="M32 36 C38 32, 62 32, 68 36 L78 44 L74 54 L66 42 L34 42 L26 54 L22 44 Z" fill="#243248" />
            <path d="M35 43 C42 42, 49 44, 50 48 C51 44, 58 42, 65 43 L63 58 C56 61, 51 59, 50 54 C49 59, 44 61, 37 58 Z" fill="#EF4444" filter="drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))" />
            <path d="M42 60 H58 L56 82 H44 Z" fill="#1C273A" />
            <path d="M22 46 L30 52 L26 72 L18 66 Z" fill="#243248" />
            <path d="M78 46 L70 52 L74 72 L82 66 Z" fill="#243248" />
            <path d="M18 68 L26 74 L22 96 L15 88 Z" fill="#1C273A" />
            <path d="M82 68 L74 74 L78 96 L85 88 Z" fill="#1C273A" />
            <path d="M40 84 H60 L65 116 H54 L50 94 L46 116 H35 Z" fill="#243248" />
            <path d="M37 118 H46 L44 138 H38 Z" fill="#1C273A" />
            <path d="M63 118 H54 L56 138 H62 Z" fill="#1C273A" />
          </svg>
          <span style="font-size: 10px; color: var(--text-muted); margin-top: 3px;">Front</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <svg width="80" height="115" viewBox="0 0 100 140" fill="none">
            <circle cx="50" cy="18" r="10" fill="#243248" />
            <path d="M45 28 H55 L64 36 L50 54 L36 36 Z" fill="#1C273A" />
            <path d="M36 44 L50 55 L64 44 L60 68 H40 Z" fill="#243248" />
            <path d="M20 46 L28 52 L24 72 L17 66 Z" fill="#F97316" filter="drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))" />
            <path d="M80 46 L72 52 L76 72 L83 66 Z" fill="#F97316" filter="drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))" />
            <path d="M17 68 L24 74 L21 96 L14 88 Z" fill="#1C273A" />
            <path d="M83 68 L76 74 L79 96 L86 88 Z" fill="#1C273A" />
            <path d="M42 68 H58 L64 88 H36 Z" fill="#243248" />
            <path d="M38 90 H48 L46 116 H36 Z" fill="#1C273A" />
            <path d="M62 90 H52 L54 116 H64 Z" fill="#1C273A" />
            <path d="M37 118 H45 L43 138 H37 Z" fill="#1C273A" />
            <path d="M63 118 H55 L57 138 H63 Z" fill="#1C273A" />
          </svg>
          <span style="font-size: 10px; color: var(--text-muted); margin-top: 3px;">Back</span>
        </div>
      </div>
    </div>
  `;
}

// Screen 01: Onboarding
export function renderOnboarding(store = {}) {
  const isCloud = store?.isCloudConnected;
  const user = store?.currentUser;

  return `
    <div class="screen-fade-slide" style="position: relative; height: 100%; min-height: 720px; display: flex; flex-direction: column; justify-content: flex-end; padding: 32px 24px 44px 24px; background: url('/assets/hero-bg.jpg') center center / cover no-repeat; color: #FFFFFF;">
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11, 15, 23, 0.25) 0%, rgba(11, 15, 23, 0.6) 40%, rgba(11, 15, 23, 0.96) 80%, #0B0F17 100%); z-index: 1;"></div>
      <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center;">
        
        <!-- Cloud Status Pill -->
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 99px; background: rgba(0, 229, 153, 0.15); border: 1px solid rgba(0, 229, 153, 0.35); font-size: 11px; font-weight: 700; color: var(--primary); margin-bottom: 20px;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 6px var(--primary);"></span>
          <span>${isCloud ? 'Supabase PostgreSQL Cloud: Connected 🟢' : 'Local Offline Mode 💾'}</span>
        </div>

        <div style="width: 60px; height: 60px; border-radius: 18px; background: linear-gradient(135deg, #00E599 0%, #00BF7E 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0, 229, 153, 0.4); margin-bottom: 16px;">
          ${icon('dumbbell', 34, '#0B0F17')}
        </div>
        <h1 style="font-family: var(--font-heading); font-size: 32px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 8px;">
          Gym<span style="color: var(--primary);">Track</span>
        </h1>
        <p style="font-size: 14.5px; color: var(--text-secondary); line-height: 1.45; max-width: 250px; margin-bottom: 24px;">
          Track your workouts.<br /><span style="color: #E2E8F0; font-weight: 600;">Build a stronger you.</span>
        </p>

        ${user ? `
          <div style="width: 100%; background: rgba(19, 27, 38, 0.85); border: 1px solid rgba(0, 229, 153, 0.35); border-radius: 14px; padding: 12px; margin-bottom: 14px; display: flex; align-items: center; gap: 10px; text-align: left;">
            <img src="${user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);" />
            <div style="flex: 1;">
              <div style="font-size: 13.5px; font-weight: 700;">${user.name}</div>
              <div style="font-size: 10.5px; color: var(--text-muted);">${user.email}</div>
            </div>
            <span style="font-size: 11px; color: var(--primary); font-weight: 700;">Cloud Sync</span>
          </div>
          <button onclick="window.GymTrack.navigateTo('home')" class="btn-primary" style="width: 100%; padding: 14px; font-size: 14.5px; border-radius: 14px; margin-bottom: 10px;">
            <span>Go to Dashboard</span>
            ${icon('chevronRight', 18, '#070B11')}
          </button>
        ` : `
          <button onclick="window.GymTrack.quickLoginCloud()" class="btn-primary" style="width: 100%; padding: 14px; font-size: 14px; border-radius: 14px; margin-bottom: 10px;">
            <span>⚡ Login as Alex Nguyen (Supabase)</span>
          </button>
          <button onclick="window.GymTrack.navigateTo('home')" style="font-size: 13px; color: var(--text-secondary); font-weight: 600; padding: 6px 14px;">
            Continue as Guest (Local Offline)
          </button>
        `}
      </div>
    </div>
  `;
}

// Screen 02: Home Dashboard
export function renderHome(store) {
  const profile = USER_PROFILE;
  const stats = HOME_STATS;
  const liveVolume = store.workoutSets.reduce((acc, s) => acc + (s.completed ? s.weight * s.reps : 0), 0);

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 18px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">Good evening,</div>
          <div style="font-size: 20px; font-family: var(--font-heading); font-weight: 700;">Alex 👋</div>
        </div>
        <div onclick="window.GymTrack.navigateTo('profile')" style="width: 42px; height: 42px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(0, 229, 153, 0.4); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
          <img src="${profile.avatarUrl}" alt="Alex" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>

      <!-- TODAY'S WORKOUT CARD -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(135deg, #131B26 0%, #1A2638 100%); border: 1px solid rgba(255, 255, 255, 0.08); padding: 18px; box-shadow: var(--shadow-card); transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 4px;">TODAY'S WORKOUT</div>
        <h2 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin-bottom: 4px;">Push Day</h2>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">6 exercises • ~60 min</div>
        <button onclick="window.GymTrack.navigateTo('active_workout')" class="btn-primary" style="width: 100%; padding: 12px; font-size: 14px; border-radius: 12px;">
          ${icon('play', 15, '#070B11', '#070B11')}
          <span>Start Workout</span>
          ${icon('chevronRight', 15, '#070B11')}
        </button>
      </div>

      <!-- THIS WEEK STREAK -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 14px; font-weight: 700; font-family: var(--font-heading);">This Week</span>
          <button onclick="window.GymTrack.navigateTo('history')" style="font-size: 11.5px; color: var(--text-muted); display: flex; align-items: center; gap: 3px;">
            <span>View Calendar</span>
            ${icon('chevronRight', 12, 'var(--text-muted)')}
          </button>
        </div>
        <div style="display: flex; justify-content: space-between; background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 10px; border: 1px solid var(--border-card);">
          ${WEEKLY_ACTIVITY.map(item => `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <span style="font-size: 11px; color: var(--text-muted); font-weight: 500;">${item.day}</span>
              <div class="${item.isToday ? 'today-dot-ping' : ''}" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${item.completed ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'}; color: ${item.completed ? '#0B0F17' : 'transparent'}; box-shadow: ${item.completed ? '0 0 10px var(--primary-glow)' : 'none'};">
                ${item.completed ? icon('check', 14, '#0B0F17') : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3 STATS TILES -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 8px; text-align: center; border: 1px solid var(--border-card); transition: all 0.2s;" onmouseover="this.style.borderColor='rgba(0,194,255,0.4)'" onmouseout="this.style.borderColor='var(--border-card)'">
          <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(0, 194, 255, 0.12); color: var(--accent-cyan); display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto;">
            ${icon('flame', 15, 'var(--accent-cyan)')}
          </div>
          <span style="font-size: 17px; font-weight: 800; font-family: var(--font-heading); display: block;">${stats.workoutsThisWeek}</span>
          <span style="font-size: 10.5px; color: var(--text-muted);">Workouts</span>
        </div>

        <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 8px; text-align: center; border: 1px solid var(--border-card); transition: all 0.2s;" onmouseover="this.style.borderColor='rgba(0,229,153,0.4)'" onmouseout="this.style.borderColor='var(--border-card)'">
          <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary-subtle); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto;">
            ${icon('dumbbell', 15, 'var(--primary)')}
          </div>
          <span style="font-size: 15px; font-weight: 800; font-family: var(--font-heading); display: block;">${liveVolume > 0 ? (12450 + liveVolume).toLocaleString() : stats.totalVolumeKg}</span>
          <span style="font-size: 10.5px; color: var(--text-muted);">Total Volume</span>
        </div>

        <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 8px; text-align: center; border: 1px solid var(--border-card); transition: all 0.2s;" onmouseover="this.style.borderColor='rgba(245,158,11,0.4)'" onmouseout="this.style.borderColor='var(--border-card)'">
          <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(245, 158, 11, 0.12); color: var(--accent-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto;">
            ${icon('trophy', 15, 'var(--accent-gold)')}
          </div>
          <span style="font-size: 17px; font-weight: 800; font-family: var(--font-heading); display: block;">${stats.prsCount}</span>
          <span style="font-size: 10.5px; color: var(--text-muted);">PRs</span>
        </div>
      </div>

      <!-- LATEST PR CARD -->
      <div onclick="window.GymTrack.navigateTo('progress')" style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255, 255, 255, 0.05); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
            ${icon('dumbbell', 18)}
          </div>
          <div>
            <div style="font-size: 9.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">LATEST PR</div>
            <div style="font-size: 13.5px; font-weight: 700; font-family: var(--font-heading);">${stats.latestPR.exercise}</div>
            <div style="font-size: 11px; color: var(--primary); font-weight: 600;">${stats.latestPR.weight} kg × ${stats.latestPR.reps}</div>
          </div>
        </div>
        <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); color: var(--accent-gold); display: flex; align-items: center; justify-content: center;">
          ${icon('trophy', 15, 'var(--accent-gold)')}
        </div>
      </div>
    </div>
  `;
}

// Screen 03: Active Workout
export function renderActiveWorkout(store) {
  const sets = store.workoutSets;
  const timeFormatted = store.formatTime(store.workoutSeconds);
  const restFormatted = store.formatTime(store.restSecondsLeft);
  const isUrgent = store.restSecondsLeft <= 10 && store.restSecondsLeft > 0;

  // Calculate working volume vs total volume
  const completedSets = sets.filter(s => s.completed);
  const totalVolume = completedSets.reduce((sum, s) => sum + (s.weight * s.reps), 0);
  const workingVolume = completedSets.filter(s => s.setType !== 'W').reduce((sum, s) => sum + (s.weight * s.reps), 0);

  return `
    <div class="screen-fade-slide" style="padding: 12px 18px 20px 18px; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <button onclick="window.GymTrack.navigateTo('home')" style="display: flex; align-items: center; gap: 5px; color: var(--text-primary); font-size: 15px; font-weight: 600;">
          ${icon('chevronLeft', 20)}
          <span>Push Day</span>
        </button>
        <button onclick="window.GymTrack.openDataModal()" title="Export / Manage Workout Data" style="color: var(--text-secondary); display: flex; align-items: center; gap: 4px; font-size: 11.5px; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.05);">
          ${icon('download', 14)}
          <span>Export</span>
        </button>
      </div>

      <!-- Circular Neon Arc Timer with Breathing Glow -->
      <div style="display: flex; flex-direction: column; align-items: center; padding: 6px 0;">
        <div
          onclick="window.GymTrack.toggleWorkoutTimer()"
          class="workout-timer-pulse"
          title="Click to pause/resume"
          style="width: 156px; height: 74px; border-radius: 100px 100px 0 0; border: 3px solid var(--primary); border-bottom: none; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 14px; background: radial-gradient(ellipse at bottom, rgba(0, 229, 153, 0.15) 0%, transparent 80%); cursor: pointer;"
        >
          <span id="active-workout-timer-text" style="font-size: 27px; font-weight: 800; font-family: var(--font-mono); letter-spacing: 1px; color: #FFFFFF;">
            ${timeFormatted}
          </span>
          <span style="font-size: 9px; font-weight: 700; color: var(--primary); letter-spacing: 1px;">
            ${store.isWorkoutTimerRunning ? 'WORKOUT TIME' : 'PAUSED'}
          </span>
        </div>
      </div>

      <!-- Bench Press Exercise Card -->
      <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 14px; border: 1px solid var(--border-card);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80" alt="Bench Press" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover;" />
            <div>
              <div style="font-size: 14.5px; font-weight: 700; font-family: var(--font-heading);">Bench Press</div>
              <div style="font-size: 11px; color: var(--text-muted);">
                Working Vol: <strong style="color: var(--primary);">${workingVolume.toLocaleString()} kg</strong>
              </div>
            </div>
          </div>
          <button onclick="window.GymTrack.navigateTo('exercise_detail')" style="color: var(--text-muted);">
            ${icon('info', 18)}
          </button>
        </div>

        <!-- Table Header -->
        <div style="display: grid; grid-template-columns: 36px 1fr 1fr 40px 36px; gap: 6px; padding: 6px 4px; font-size: 9.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px; border-bottom: 1px solid var(--border-subtle); text-align: center;">
          <div title="Click badge below to switch Type">TYPE</div>
          <div>WEIGHT</div>
          <div>REPS</div>
          <div>RPE</div>
          <div>✓</div>
        </div>

        <!-- Set Rows with Interactive Set Type Badges -->
        <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 6px;">
          ${sets.map((s, idx) => {
            const typeCode = s.setType || 'N';
            const displayBadge = typeCode === 'N' ? `${s.setNumber}` : typeCode;
            return `
              <div style="display: grid; grid-template-columns: 36px 1fr 1fr 40px 36px; gap: 6px; align-items: center; padding: 7px 4px; border-radius: 8px; background: ${s.completed ? 'rgba(0, 229, 153, 0.06)' : 'rgba(255, 255, 255, 0.02)'}; text-align: center; font-size: 13px; font-family: var(--font-mono); transition: all 0.25s ease;">
                <div>
                  <button
                    onclick="event.stopPropagation(); window.GymTrack.cycleSetType('${s.id}')"
                    class="set-type-badge set-badge-${typeCode}"
                    title="Type: ${typeCode} (Click to cycle: Normal → Warmup → Drop → Failure → Superset)"
                  >
                    ${displayBadge}
                  </button>
                </div>
                <div style="font-weight: 600;">${s.weight} <span style="font-size: 10px; color: var(--text-muted);">kg</span></div>
                <div style="font-weight: 600;">${s.reps}</div>
                <div style="color: var(--text-secondary);">${s.rpe}</div>
                <button
                  onclick="window.GymTrack.toggleSet('${s.id}')"
                  class="${s.completed ? 'checkmark-bounce' : ''}"
                  style="width: 26px; height: 26px; margin: 0 auto; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: ${s.completed ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)'}; color: ${s.completed ? '#0B0F17' : 'transparent'}; box-shadow: ${s.completed ? '0 0 10px var(--primary-glow)' : 'none'}; border: ${s.completed ? 'none' : '1px solid rgba(255, 255, 255, 0.15)'}; cursor: pointer;"
                >
                  ${icon('check', 15, s.completed ? '#0B0F17' : 'transparent')}
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Set Type Quick Legend -->
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 9px; font-weight: 700; color: var(--text-muted); padding: 7px 4px 0 4px; border-top: 1px solid rgba(255,255,255,0.04); margin-top: 5px;">
          <span>Set Legend:</span>
          <span style="color: #00E599;">• 1-5 Normal</span>
          <span style="color: #F59E0B;">• W Warmup</span>
          <span style="color: #C084FC;">• D Drop</span>
          <span style="color: #F87171;">• F Failure</span>
          <span style="color: #22D3EE;">• S Super</span>
        </div>

        <button onclick="window.GymTrack.openAddSetModal()" style="width: 100%; margin-top: 10px; padding: 9px; border-radius: 10px; background: rgba(255, 255, 255, 0.04); border: 1px dashed rgba(255, 255, 255, 0.15); color: var(--primary); font-size: 12.5px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'">
          ${icon('plus', 15, 'var(--primary)')}
          <span>Add Set</span>
        </button>
      </div>

      <!-- FLOATING REST TIMER WIDGET (With Warning Pulse) -->
      ${store.isRestTimerVisible ? `
        <div class="${isUrgent ? 'timer-warning-pulse' : ''}" style="background: rgba(19, 27, 38, 0.95); backdrop-filter: blur(10px); border: 1px solid ${isUrgent ? 'rgba(239, 68, 68, 0.6)' : 'rgba(0, 229, 153, 0.3)'}; border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 12px ${isUrgent ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0, 229, 153, 0.15)'}; transition: all 0.3s ease;">
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 9.5px; color: ${isUrgent ? 'var(--accent-red)' : 'var(--text-muted)'}; font-weight: 700;">${isUrgent ? 'READY TO LIFT!' : 'Rest'}</span>
              <button onclick="window.GymTrack.toggleSound()" title="Toggle Sound Beep" style="color: ${store.isSoundEnabled ? 'var(--primary)' : 'var(--text-muted)'};">
                ${icon(store.isSoundEnabled ? 'volume2' : 'volumeX', 13)}
              </button>
            </div>
            <div id="active-rest-timer-text" style="font-size: 19px; font-weight: 800; font-family: var(--font-mono); color: ${isUrgent ? 'var(--accent-red)' : 'var(--primary)'};">${restFormatted}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button onclick="window.GymTrack.toggleRestTimer()" style="width: 34px; height: 34px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${store.isRestTimerRunning ? icon('pause', 15) : icon('play', 15, '#FFFFFF', '#FFFFFF')}
            </button>
            <button onclick="window.GymTrack.addRest(30)" style="padding: 6px 10px; border-radius: 7px; background: rgba(0, 229, 153, 0.15); color: var(--primary); font-size: 11.5px; font-weight: 700; border: 1px solid rgba(0, 229, 153, 0.3);">
              +30s
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Complete Set / Finish Workout CTA -->
      <button onclick="window.GymTrack.completeWorkout()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14.5px; border-radius: 12px; margin-top: auto;">
        <span>Complete Set & Log PR</span>
      </button>
    </div>
  `;
}

// Screen 04: Exercise Library
export function renderExerciseLibrary(store) {
  const query = (store.searchQuery || '').toLowerCase();
  const category = store.libraryCategory || 'all';
  const exercises = store.exercises || [];

  const list = exercises.filter(ex => {
    const matchCat = category === 'all' || ex.category === category;
    const matchSearch = ex.name.toLowerCase().includes(query) || ex.muscleGroup.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">Exercise Library</h1>
        <button onclick="window.GymTrack.openExerciseModal()" style="font-size: 11px; padding: 4px 9px; border-radius: 6px; background: var(--primary-subtle); color: var(--primary); border: 1px solid rgba(0,229,153,0.3); font-weight: 600; display: flex; align-items: center; gap: 4px;">
          ${icon('plus', 12, 'var(--primary)')}
          <span>Custom</span>
        </button>
      </div>

      <!-- Search Input -->
      <div style="position: relative; display: flex; align-items: center;">
        <span style="position: absolute; left: 12px; color: var(--text-muted); display: flex;">
          ${icon('search', 16, 'var(--text-muted)')}
        </span>
        <input
          type="text"
          placeholder="Search exercises..."
          value="${store.searchQuery || ''}"
          oninput="window.GymTrack.setSearchQuery(this.value)"
          style="width: 100%; padding: 10px 12px 10px 36px; font-size: 13px; border-radius: var(--radius-md); background: var(--bg-card); border: 1px solid var(--border-card); color: var(--text-primary);"
        />
      </div>

      <!-- Categories Pills -->
      <div style="display: flex; gap: 7px; overflow-x: auto; padding-bottom: 2px;">
        ${EXERCISE_CATEGORIES.map(cat => `
          <button
            onclick="window.GymTrack.setCategory('${cat.id}')"
            style="padding: 6px 13px; border-radius: var(--radius-full); font-size: 11.5px; font-weight: 600; white-space: nowrap; background: ${category === cat.id ? 'var(--primary)' : 'var(--bg-card)'}; color: ${category === cat.id ? '#0B0F17' : 'var(--text-secondary)'}; border: ${category === cat.id ? 'none' : '1px solid var(--border-card)'}; transition: all 0.2s;"
          >
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <!-- Exercise List -->
      <div style="display: flex; flex-direction: column; gap: 9px;">
        ${list.map(ex => `
          <div onclick="window.GymTrack.selectExercise('${ex.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; border-radius: var(--radius-md); background: var(--bg-card); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${ex.thumbnail}" alt="${ex.name}" style="width: 42px; height: 42px; border-radius: 9px; object-fit: cover;" />
              <div>
                <div style="font-size: 13.5px; font-weight: 700; font-family: var(--font-heading);">${ex.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${ex.muscleGroup} • ${ex.equipment}</div>
              </div>
            </div>
            ${icon('chevronRight', 16, 'var(--text-muted)')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Screen 05: Progress & Analytics (with Self-Drawing SVG Chart & Timeframe Filter)
export function renderProgress(store) {
  const activeTab = store.progressTab || 'strength';
  const tf = store.progressTimeframe || '3m';
  const tfData = PROGRESS_TIMEFRAMES[tf] || PROGRESS_DATA;

  const timeframes = [
    { id: '7d', label: '7D' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: 'all', label: 'All' },
  ];

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">Progress</h1>
        <!-- Timeframe Pill Filter -->
        <div style="display: flex; gap: 3px; background: var(--bg-card); padding: 3px; border-radius: 8px; border: 1px solid var(--border-card);">
          ${timeframes.map(t => `
            <button
              onclick="window.GymTrack.setTimeframe('${t.id}')"
              class="timeframe-pill ${tf === t.id ? 'active' : ''}"
            >
              ${t.label}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); background: var(--bg-card); padding: 3px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
        ${['strength', 'volume', 'body', 'pr'].map(t => `
          <button
            onclick="window.GymTrack.setProgressTab('${t}')"
            style="padding: 6px 0; border-radius: 8px; font-size: 11px; font-weight: 600; text-transform: capitalize; background: ${activeTab === t ? 'var(--bg-elevated)' : 'transparent'}; color: ${activeTab === t ? 'var(--text-primary)' : 'var(--text-muted)'};"
          >
            ${t}
          </button>
        `).join('')}
      </div>

      <!-- Growth Banner & Dynamic SVG Chart -->
      <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 14px; border: 1px solid var(--border-card); box-shadow: var(--shadow-card);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80" alt="Bench" style="width: 28px; height: 28px; border-radius: 7px; object-fit: cover;" />
            <span style="font-size: 14.5px; font-weight: 700; font-family: var(--font-heading);">${tfData.exercise || 'Bench Press'}</span>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--primary); background: var(--primary-subtle); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(0, 229, 153, 0.25);">
            +${tfData.growthPercent}% <span style="color: var(--text-muted); font-weight: 500;">${tfData.period}</span>
          </span>
        </div>

        <div style="position: relative; width: 100%; height: 130px;">
          <svg width="100%" height="100%" viewBox="0 0 300 120" fill="none">
            <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3 3" />
            <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3 3" />
            <line x1="0" y1="105" x2="300" y2="105" stroke="rgba(255,255,255,0.05)" />

            <defs>
              <linearGradient id="chartGlowSvg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E599" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#00E599" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path d="${tfData.svgArea}" fill="url(#chartGlowSvg)" />
            <!-- Self-Drawing Animated Path Line -->
            <path class="chart-line-animated" d="${tfData.svgPath}" stroke="#00E599" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(0, 229, 153, 0.6))" />
            ${tfData.historyPoints.map((p, idx) => `
              <circle
                cx="${p.x}"
                cy="${p.y}"
                r="${idx === tfData.historyPoints.length - 1 ? 5 : 3}"
                fill="${idx === tfData.historyPoints.length - 1 ? '#FFFFFF' : '#00E599'}"
                stroke="#00E599"
                stroke-width="${idx === tfData.historyPoints.length - 1 ? 3 : 0}"
              />
            `).join('')}
          </svg>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 2px; padding: 0 6px;">
            ${tfData.historyPoints.map(p => `<span>${p.month}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- 4 Stats 2x2 Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px;">
        <div style="background: var(--bg-card); padding: 11px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted);">Current Working</div>
          <div style="font-size: 15px; font-weight: 700; font-family: var(--font-heading); margin-top: 2px;">${tfData.current}</div>
        </div>
        <div style="background: var(--bg-card); padding: 11px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted);">Best Set</div>
          <div style="font-size: 15px; font-weight: 700; font-family: var(--font-heading); margin-top: 2px;">${tfData.bestSet}</div>
        </div>
        <div style="background: var(--bg-card); padding: 11px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted);">Est. 1RM (Epley)</div>
          <div style="font-size: 15px; font-weight: 700; font-family: var(--font-heading); color: var(--primary); margin-top: 2px;">${tfData.est1RM}</div>
        </div>
        <div style="background: var(--bg-card); padding: 11px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted);">Total Volume (${tf.toUpperCase()})</div>
          <div style="font-size: 15px; font-weight: 700; font-family: var(--font-heading); margin-top: 2px;">${tfData.totalVolume}</div>
        </div>
      </div>

      <!-- Muscle Group Volume Breakdown -->
      <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-card);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="font-size: 12.5px; font-weight: 700; font-family: var(--font-heading);">Muscle Group Distribution</div>
          <span style="font-size: 10px; color: var(--primary); font-weight: 600;">${tfData.period}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${tfData.muscleVolume.map(item => `
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary); font-weight: 600;">${item.group}</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="color: var(--text-muted); font-size: 10px;">${item.percent}%</span>
                  <span style="font-weight: 700; color: var(--text-primary); font-family: var(--font-mono);">${item.volume}</span>
                </div>
              </div>
              <div style="height: 6px; background: rgba(255, 255, 255, 0.06); border-radius: 99px; overflow: hidden;">
                <div style="width: ${item.percent}%; height: 100%; background: ${item.color}; border-radius: 99px; transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Screen 06: History & Calendar
export function renderHistory(store) {
  const profile = USER_PROFILE;

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 15px;">
      <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">History</h1>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); background: var(--bg-card); padding: 3px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: var(--bg-elevated); color: var(--text-primary);">Calendar</button>
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: transparent; color: var(--text-muted);">Workouts</button>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 4px;">
        <button style="color: var(--text-muted);">${icon('chevronLeft', 16)}</button>
        <span style="font-size: 13.5px; font-weight: 700; font-family: var(--font-heading);">September 2025</span>
        <button style="color: var(--text-muted);">${icon('chevronRight', 16)}</button>
      </div>

      <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 12px; border: 1px solid var(--border-card);">
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 9.5px; color: var(--text-muted); font-weight: 700; margin-bottom: 8px;">
          ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<div>${d}</div>`).join('')}
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center;">
          ${CALENDAR_DAYS.map(item => `
            <div
              onclick="window.GymTrack.selectCalendarDay(${item.day})"
              style="aspect-ratio: 1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: ${item.hasWorkout ? 700 : 400}; cursor: pointer; background: ${item.hasWorkout ? 'var(--primary)' : 'transparent'}; color: ${item.hasWorkout ? '#070B11' : 'var(--text-muted)'}; box-shadow: ${item.hasWorkout ? '0 0 6px var(--primary-glow)' : 'none'}; border: ${item.day === store.selectedCalendarDay ? '2px solid #FFFFFF' : 'none'}; transition: transform 0.2s;"
              onmouseover="this.style.transform='scale(1.15)'"
              onmouseout="this.style.transform='scale(1)'"
            >
              ${item.day}
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
        <div style="background: var(--bg-card); padding: 9px 6px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
          <div style="font-size: 9.5px; color: var(--text-muted);">This Month</div>
          <div style="font-size: 14.5px; font-weight: 800; color: var(--text-primary); margin-top: 1px;">${profile.totalWorkoutsMonth}</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">Workouts</div>
        </div>
        <div style="background: var(--bg-card); padding: 9px 6px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
          <div style="font-size: 9.5px; color: var(--text-muted);">Current Streak</div>
          <div style="font-size: 14.5px; font-weight: 800; color: var(--primary); margin-top: 1px;">${profile.currentStreak}</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">Days</div>
        </div>
        <div style="background: var(--bg-card); padding: 9px 6px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
          <div style="font-size: 9.5px; color: var(--text-muted);">Longest Streak</div>
          <div style="font-size: 14.5px; font-weight: 800; color: var(--accent-gold); margin-top: 1px;">${profile.longestStreak}</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">Days</div>
        </div>
      </div>

      <!-- Recent Workouts -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 13px; font-weight: 700; font-family: var(--font-heading);">Recent Workouts</span>
          <button style="font-size: 11px; color: var(--text-muted);">See all</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${RECENT_WORKOUTS.map(w => `
            <div onclick="window.GymTrack.navigateTo('calendar_detail')" style="display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(0, 229, 153, 0.12); color: var(--primary); display: flex; align-items: center; justify-content: center;">
                  ${icon('calendar', 16, 'var(--primary)')}
                </div>
                <div>
                  <div style="font-size: 13.5px; font-weight: 700;">${w.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${w.date} • ${w.duration} • ${w.volume}</div>
                </div>
              </div>
              ${icon('chevronRight', 15, 'var(--text-muted)')}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Screen 07: Workout Programs
export function renderPrograms(store) {
  const programs = store.programs || [];

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 15px; height: 100%;">
      <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">Workout Programs</h1>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); background: var(--bg-card); padding: 3px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: var(--bg-elevated); color: var(--text-primary);">My Programs</button>
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: transparent; color: var(--text-muted);">Templates</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 11px;">
        ${programs.map(prog => `
          <div onclick="window.GymTrack.navigateTo('active_workout')" style="display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${prog.image}" alt="${prog.title}" style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover;" />
              <div>
                <div style="font-size: 14.5px; font-weight: 700; font-family: var(--font-heading);">${prog.title}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 1px;">${prog.daysPerWeek} • ${prog.duration}</div>
              </div>
            </div>
            ${icon('chevronRight', 16, 'var(--text-muted)')}
          </div>
        `).join('')}
      </div>

      <button onclick="window.GymTrack.openProgramModal()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-top: auto;">
        ${icon('plus', 16, '#070B11')}
        <span>Create New Program</span>
      </button>
    </div>
  `;
}

// Screen 08: Exercise Detail
export function renderExerciseDetail(store) {
  const exercises = store.exercises || [];
  const ex = exercises.find(e => e.id === store.selectedExerciseId) || exercises[0];

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <button onclick="window.GymTrack.navigateTo('exercise_library')" style="display: flex; align-items: center; gap: 5px; color: var(--text-primary); font-size: 15px; font-weight: 700;">
          ${icon('chevronLeft', 20)}
          <span>${ex.name}</span>
        </button>
        <button style="color: var(--primary);">${icon('bookmark', 18, 'var(--primary)', 'var(--primary)')}</button>
      </div>

      <div style="display: flex; gap: 7px;">
        <span style="font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-card); color: var(--text-secondary);">${ex.muscleGroup}</span>
        <span style="font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-card); color: var(--text-secondary);">${ex.equipment}</span>
        <span style="font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-card); color: var(--text-secondary);">${ex.difficulty}</span>
      </div>

      <div style="position: relative; width: 100%; height: 165px; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-card);">
        <img src="/assets/bench-press.jpg" alt="${ex.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(0, 229, 153, 0.9); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px rgba(0, 229, 153, 0.6); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            ${icon('play', 18, '#070B11', '#070B11')}
          </div>
        </div>
      </div>

      <div>
        <div style="font-size: 13.5px; font-weight: 700; font-family: var(--font-heading); margin-bottom: 8px;">Instructions</div>
        <ol style="padding-left: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: var(--text-secondary); line-height: 1.45;">
          ${(ex.instructions || [
            "Lie on the bench with your feet flat on the floor.",
            "Grab the bar with a slightly wider than shoulder width grip.",
            "Keep your back flat and tight.",
            "Lower the bar to your mid-chest.",
            "Press back up and repeat."
          ]).map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>

      ${renderMuscleMap(ex.muscleGroup, 'Triceps')}

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateX(3px)'" onmouseout="this.style.transform='translateX(0)'">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="/assets/bench-press.jpg" alt="video" style="width: 38px; height: 38px; border-radius: 7px; object-fit: cover;" />
          <div>
            <div style="font-size: 12.5px; font-weight: 700;">How to Bench Press</div>
            <div style="font-size: 10.5px; color: var(--text-muted);">1:24</div>
          </div>
        </div>
        ${icon('chevronRight', 16, 'var(--text-muted)')}
      </div>
    </div>
  `;
}

// Screen 09: Add / Edit Set Modal
export function renderAddSetModal(store, isStandAlone = false) {
  const s = store.newSetForm || { weight: 80, reps: 8, setType: 'working', rpe: 8, restSeconds: 120, notes: '' };

  return `
    <div class="modal-bottom-sheet" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 15px; height: 100%; background: var(--bg-app);">
      <div style="display: flex; align-items: center;">
        <button onclick="${isStandAlone ? `window.GymTrack.navigateTo('active_workout')` : `window.GymTrack.closeAddSetModal()`}" style="display: flex; align-items: center; gap: 5px; color: var(--text-primary); font-size: 15px; font-weight: 700;">
          ${icon('chevronLeft', 20)}
          <span>Add Set</span>
        </button>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; padding: 4px 0;">
        <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80" alt="exercise" style="width: 38px; height: 38px; border-radius: 9px; object-fit: cover;" />
        <div>
          <div style="font-size: 14.5px; font-weight: 700; font-family: var(--font-heading);">Bench Press</div>
          <div style="font-size: 11px; color: var(--text-muted);">Last: 75kg × 8</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 11px; border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted); margin-bottom: 7px; font-weight: 600;">Weight (kg)</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button onclick="window.GymTrack.changeFormWeight(-2.5)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${icon('minus', 14)}
            </button>
            <span style="font-size: 19px; font-weight: 800; font-family: var(--font-mono);">${s.weight}</span>
            <button onclick="window.GymTrack.changeFormWeight(2.5)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${icon('plus', 14)}
            </button>
          </div>
        </div>

        <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 11px; border: 1px solid var(--border-card);">
          <div style="font-size: 10.5px; color: var(--text-muted); margin-bottom: 7px; font-weight: 600;">Reps</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button onclick="window.GymTrack.changeFormReps(-1)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${icon('minus', 14)}
            </button>
            <span style="font-size: 19px; font-weight: 800; font-family: var(--font-mono);">${s.reps}</span>
            <button onclick="window.GymTrack.changeFormReps(1)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
              ${icon('plus', 14)}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 7px; font-weight: 600;">Set Type</div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px;">
          ${SET_TYPES.map(t => {
            const isSelected = (s.setType || 'N') === t.id;
            return `
              <button
                onclick="window.GymTrack.setFormType('${t.id}')"
                style="padding: 7px 0; border-radius: 7px; font-size: 11px; font-weight: 800; font-family: var(--font-mono); background: ${isSelected ? t.bg : 'var(--bg-card)'}; color: ${isSelected ? t.color : 'var(--text-secondary)'}; border: 1px solid ${isSelected ? t.border : 'var(--border-card)'}; transition: all 0.2s;"
                title="${t.name}: ${t.desc}"
              >
                ${t.code}
              </button>
            `;
          }).join('')}
        </div>
        <div style="font-size: 10px; color: var(--text-muted); margin-top: 5px; text-align: center;">
          <strong style="color: var(--text-primary);">${SET_TYPES.find(t => t.id === (s.setType || 'N'))?.name || 'Working Set'}</strong>: ${SET_TYPES.find(t => t.id === (s.setType || 'N'))?.desc || ''}
        </div>
      </div>

      <div>
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 7px; font-weight: 600;">RPE</div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${[6, 7, 8, 9, 10].map(n => `
            <button
              onclick="window.GymTrack.setFormRPE(${n})"
              style="padding: 8px 0; border-radius: 7px; font-size: 12.5px; font-weight: 700; background: ${s.rpe === n ? 'var(--primary)' : 'var(--bg-card)'}; color: ${s.rpe === n ? '#0B0F17' : 'var(--text-secondary)'}; border: ${s.rpe === n ? 'none' : '1px solid var(--border-card)'};"
            >
              ${n}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 11px 13px; border: 1px solid var(--border-card);">
        <div style="font-size: 10.5px; color: var(--text-muted); margin-bottom: 7px; font-weight: 600;">Rest Time (seconds)</div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <button onclick="window.GymTrack.changeFormRest(-15)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
            ${icon('minus', 14)}
          </button>
          <span style="font-size: 17px; font-weight: 800; font-family: var(--font-mono);">${s.restSeconds}s</span>
          <button onclick="window.GymTrack.changeFormRest(15)" style="width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
            ${icon('plus', 14)}
          </button>
        </div>
      </div>

      <button onclick="window.GymTrack.saveNewSet()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-top: auto;">
        <span>Save Set</span>
      </button>
    </div>
  `;
}

// Screen 10: Calendar Date Detail
export function renderCalendarDetail(store) {
  const w = RECENT_WORKOUTS[0];
  const day = store.selectedCalendarDay || 10;

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 13px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <button onclick="window.GymTrack.navigateTo('history')" style="display: flex; align-items: center; gap: 5px; color: var(--text-primary); font-size: 15px; font-weight: 700;">
          ${icon('chevronLeft', 20)}
          <span>Calendar</span>
        </button>
      </div>

      <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 10px; border: 1px solid var(--border-card);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
          <span style="font-size: 11.5px; font-weight: 700; color: var(--text-secondary);">September 2025</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center;">
          ${CALENDAR_DAYS.slice(0, 21).map(item => `
            <div
              onclick="window.GymTrack.selectCalendarDay(${item.day})"
              style="aspect-ratio: 1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: ${item.hasWorkout ? 700 : 400}; cursor: pointer; background: ${item.day === day ? '#FFFFFF' : item.hasWorkout ? 'var(--primary)' : 'transparent'}; color: ${item.day === day ? '#0B0F17' : item.hasWorkout ? '#070B11' : 'var(--text-muted)'};"
            >
              ${item.day}
            </div>
          `).join('')}
        </div>
      </div>

      <div style="font-size: 12.5px; font-weight: 700; color: var(--text-secondary);">Sep ${day}, 2025</div>

      <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 14px; border: 1px solid var(--border-card); display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div style="font-size: 16px; font-weight: 800; font-family: var(--font-heading);">${w.name}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 1px;">${w.duration} • ${w.volume}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${w.exercises.map(ex => `
            <div style="background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); padding: 9px 11px; border: 1px solid rgba(255, 255, 255, 0.04);">
              <div style="font-size: 12.5px; font-weight: 700; font-family: var(--font-heading);">${ex.name}</div>
              <div style="font-size: 11px; color: var(--text-secondary); font-family: var(--font-mono); margin-top: 3px;">${ex.setsText}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Screen 11: Goals
export function renderGoals(store) {
  const goals = store.goals || [];

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 15px; height: 100%;">
      <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">Goals</h1>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); background: var(--bg-card); padding: 3px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: var(--bg-elevated); color: var(--text-primary);">Active</button>
        <button style="padding: 6px 0; border-radius: 8px; font-size: 12px; font-weight: 600; background: transparent; color: var(--text-muted);">Completed</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 11px;">
        ${goals.map(g => `
          <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-card); display: flex; flex-direction: column; gap: 10px; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(3px)'" onmouseout="this.style.transform='translateX(0)'">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: ${g.color}25; color: ${g.color}; display: flex; align-items: center; justify-content: center;">
                  ${icon(g.category === 'strength' ? 'check' : g.category === 'weight' ? 'target' : 'flame', 13, g.color)}
                </div>
                <div>
                  <div style="font-size: 13.5px; font-weight: 700; font-family: var(--font-heading);">${g.title}</div>
                  <div style="font-size: 10.5px; color: var(--text-muted);">${g.subtitle}</div>
                </div>
              </div>
              <span style="font-size: 11.5px; font-weight: 700; color: var(--text-secondary);">${g.percent}%</span>
            </div>

            <div>
              <div style="height: 5px; background: rgba(255, 255, 255, 0.08); border-radius: 99px; overflow: hidden; margin-bottom: 5px;">
                <div style="width: ${g.percent}%; height: 100%; background: ${g.color}; border-radius: 99px; transition: width 0.8s ease;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: var(--text-muted);">
                <span>${g.current} / ${g.target}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <button onclick="window.GymTrack.openGoalModal()" style="width: 100%; padding: 11px; border-radius: 11px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-primary); font-size: 12.5px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: auto;">
        ${icon('plus', 15)}
        <span>Add New Goal</span>
      </button>
    </div>
  `;
}

// Screen 12: Profile & Settings
export function renderProfile(store) {
  const profile = USER_PROFILE;

  const items = [
    { icon: 'user', label: 'Personal Information' },
    { icon: 'target', label: 'Goals', action: "window.GymTrack.navigateTo('goals')" },
    { icon: 'scale', label: 'Units', value: 'kg, km' },
    { icon: 'bell', label: 'Sound & Audio Beep', value: store.isSoundEnabled ? 'On' : 'Off', action: "window.GymTrack.toggleSound()" },
    { icon: 'download', label: 'Data Export & Backup', value: 'CSV, JSON', action: "window.GymTrack.openDataModal()" },
    { icon: 'rotateCcw', label: 'Reset to Demo Data', value: 'Reset', action: "window.GymTrack.resetToDemoData()" },
  ];

  return `
    <div class="screen-fade-slide" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 18px;">
      <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
        <img src="${profile.avatarUrl}" alt="${profile.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);" />
        <div>
          <h2 style="font-size: 17px; font-weight: 800; font-family: var(--font-heading);">${profile.name}</h2>
          <p style="font-size: 11.5px; color: var(--text-muted);">${profile.email}</p>
        </div>
      </div>

      <div style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-card); overflow: hidden;">
        ${items.map((it, idx) => `
          <div
            ${it.action ? `onclick="${it.action}"` : ''}
            style="display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; border-bottom: ${idx < items.length - 1 ? '1px solid var(--border-subtle)' : 'none'}; cursor: pointer; transition: background 0.2s;"
            onmouseover="this.style.background='var(--bg-elevated)'"
            onmouseout="this.style.background='transparent'"
          >
            <div style="display: flex; align-items: center; gap: 11px;">
              ${icon(it.icon, 16, 'var(--text-secondary)')}
              <span style="font-size: 12.5px; font-weight: 600;">${it.label}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
              ${it.value ? `<span style="font-size: 11.5px; color: var(--text-muted);">${it.value}</span>` : ''}
              ${icon('chevronRight', 15, 'var(--text-muted)')}
            </div>
          </div>
        `).join('')}
      </div>

      <div>
        <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.6px; margin-bottom: 7px; padding-left: 4px;">SUPPORT</div>
        <div style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-card); overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; border-bottom: 1px solid var(--border-subtle); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 11px;">
              ${icon('help', 16, 'var(--text-secondary)')}
              <span style="font-size: 12.5px; font-weight: 600;">Help Center</span>
            </div>
            ${icon('chevronRight', 15, 'var(--text-muted)')}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 11px;">
              ${icon('info', 16, 'var(--text-secondary)')}
              <span style="font-size: 12.5px; font-weight: 600;">About GymTrack</span>
            </div>
            ${icon('chevronRight', 15, 'var(--text-muted)')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// PROGRAM BUILDER MODAL
export function renderProgramBuilderModal(store) {
  return `
    <div class="modal-bottom-sheet" style="padding: 20px; display: flex; flex-direction: column; gap: 14px; background: var(--bg-app); height: 100%;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800;">Create Workout Program</h3>
        <button onclick="window.GymTrack.closeProgramModal()" style="color: var(--text-muted); font-size: 16px;">✕</button>
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Program Title</label>
        <input id="new-program-title" type="text" placeholder="e.g. Hypertrophy Split, Push/Pull" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Days Per Week</label>
        <input id="new-program-days" type="text" placeholder="e.g. 4-5 days / week" value="4 days / week" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Duration</label>
        <input id="new-program-duration" type="text" placeholder="e.g. 8 weeks, 12 weeks" value="8 weeks" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <button onclick="window.GymTrack.saveCustomProgram()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-top: 10px;">
        <span>Save Program</span>
      </button>
    </div>
  `;
}

// CUSTOM EXERCISE MODAL
export function renderCustomExerciseModal(store) {
  return `
    <div class="modal-bottom-sheet" style="padding: 20px; display: flex; flex-direction: column; gap: 14px; background: var(--bg-app); height: 100%;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800;">Add Custom Exercise</h3>
        <button onclick="window.GymTrack.closeExerciseModal()" style="color: var(--text-muted); font-size: 16px;">✕</button>
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Exercise Name</label>
        <input id="new-ex-name" type="text" placeholder="e.g. Bulgarian Split Squat" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Category</label>
          <select id="new-ex-category" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);">
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="shoulders">Shoulders</option>
            <option value="legs">Legs</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
          </select>
        </div>
        <div>
          <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Equipment</label>
          <select id="new-ex-equipment" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);">
            <option value="Dumbbell">Dumbbell</option>
            <option value="Barbell">Barbell</option>
            <option value="Machine">Machine</option>
            <option value="Cable">Cable</option>
            <option value="Bodyweight">Bodyweight</option>
          </select>
        </div>
      </div>

      <button onclick="window.GymTrack.saveCustomExercise()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-top: 10px;">
        <span>Save Exercise</span>
      </button>
    </div>
  `;
}

// GOAL CREATOR MODAL
export function renderGoalModal(store) {
  return `
    <div class="modal-bottom-sheet" style="padding: 20px; display: flex; flex-direction: column; gap: 14px; background: var(--bg-app); height: 100%;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800;">Add New Goal</h3>
        <button onclick="window.GymTrack.closeGoalModal()" style="color: var(--text-muted); font-size: 16px;">✕</button>
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Goal Title</label>
        <input id="new-goal-title" type="text" placeholder="e.g. Squat, Deadlift, Running" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <div>
        <label style="font-size: 11px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;">Target Goal</label>
        <input id="new-goal-target" type="text" placeholder="e.g. Reach 140 kg, Workout 5x/week" style="width: 100%; padding: 10px; font-size: 13px; border-radius: 8px; background: var(--bg-card); color: #FFF; border: 1px solid var(--border-card);" />
      </div>

      <button onclick="window.GymTrack.saveCustomGoal()" class="btn-primary" style="width: 100%; padding: 13px; font-size: 14px; border-radius: 12px; margin-top: 10px;">
        <span>Save Goal</span>
      </button>
    </div>
  `;
}

// DATA MANAGEMENT MODAL (Export CSV/JSON, Import Backup, Reset)
export function renderDataManagementModal(store) {
  const setsCount = store.workoutSets.length;
  const programsCount = store.programs.length;
  const exercisesCount = store.exercises.length;
  const goalsCount = store.goals.length;

  return `
    <div class="modal-bottom-sheet" style="padding: 20px 22px; display: flex; flex-direction: column; gap: 16px; background: var(--bg-app); height: 100%;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 9px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0, 229, 153, 0.15); color: var(--primary); display: flex; align-items: center; justify-content: center;">
            ${icon('download', 18, 'var(--primary)')}
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800;">Data & Backup Center</h3>
            <p style="font-size: 11px; color: var(--text-muted);">Manage workouts, sets & programs</p>
          </div>
        </div>
        <button onclick="window.GymTrack.closeDataModal()" style="color: var(--text-muted); font-size: 18px; padding: 4px;">✕</button>
      </div>

      <!-- Current Data Summary Pill -->
      <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border-card); display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
        <div>
          <div style="font-size: 15px; font-weight: 800; font-family: var(--font-mono); color: var(--primary);">${setsCount}</div>
          <div style="font-size: 9px; color: var(--text-muted);">Sets Logged</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 800; font-family: var(--font-mono); color: var(--accent-cyan);">${exercisesCount}</div>
          <div style="font-size: 9px; color: var(--text-muted);">Exercises</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 800; font-family: var(--font-mono); color: var(--accent-purple);">${programsCount}</div>
          <div style="font-size: 9px; color: var(--text-muted);">Programs</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 800; font-family: var(--font-mono); color: var(--accent-gold);">${goalsCount}</div>
          <div style="font-size: 9px; color: var(--text-muted);">Goals</div>
        </div>
      </div>

      <!-- EXPORT SECTION -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">EXPORT OPTIONS</div>
        
        <button
          onclick="window.GymTrack.exportDataJSON()"
          style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-1px)'"
          onmouseout="this.style.borderColor='var(--border-card)'; this.style.transform='translateY(0)'"
        >
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0, 229, 153, 0.15); color: var(--primary); display: flex; align-items: center; justify-content: center;">
              ${icon('download', 16, 'var(--primary)')}
            </div>
            <div style="text-align: left;">
              <div style="font-size: 13px; font-weight: 700;">Export Full JSON Backup</div>
              <div style="font-size: 10.5px; color: var(--text-muted);">Snapshot of sets, exercises, programs & goals</div>
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--primary); font-family: var(--font-mono);">.JSON</span>
        </button>

        <button
          onclick="window.GymTrack.exportDataCSV()"
          style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.borderColor='var(--accent-cyan)'; this.style.transform='translateY(-1px)'"
          onmouseout="this.style.borderColor='var(--border-card)'; this.style.transform='translateY(0)'"
        >
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0, 194, 255, 0.15); color: var(--accent-cyan); display: flex; align-items: center; justify-content: center;">
              ${icon('fileText', 16, 'var(--accent-cyan)')}
            </div>
            <div style="text-align: left;">
              <div style="font-size: 13px; font-weight: 700;">Export Workouts CSV</div>
              <div style="font-size: 10.5px; color: var(--text-muted);">Spreadsheet table for Excel & Google Sheets</div>
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); font-family: var(--font-mono);">.CSV</span>
        </button>
      </div>

      <!-- RESTORE / IMPORT SECTION -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">RESTORE / IMPORT</div>

        <input type="file" id="gymtrack-import-input" accept=".json" style="display: none;" onchange="window.GymTrack.importDataJSON(event)" />

        <button
          onclick="document.getElementById('gymtrack-import-input').click()"
          style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-card); cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.borderColor='var(--accent-purple)'; this.style.transform='translateY(-1px)'"
          onmouseout="this.style.borderColor='var(--border-card)'; this.style.transform='translateY(0)'"
        >
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(168, 85, 247, 0.15); color: var(--accent-purple); display: flex; align-items: center; justify-content: center;">
              ${icon('upload', 16, 'var(--accent-purple)')}
            </div>
            <div style="text-align: left;">
              <div style="font-size: 13px; font-weight: 700;">Restore Backup File</div>
              <div style="font-size: 10.5px; color: var(--text-muted);">Upload .json backup to restore all data</div>
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--accent-purple);">Upload</span>
        </button>
      </div>

      <!-- RESET SECTION -->
      <div style="margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px;">
        <button
          onclick="window.GymTrack.resetToDemoData()"
          style="flex: 1; padding: 11px; border-radius: 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); color: #F87171; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;"
        >
          ${icon('rotateCcw', 14, '#F87171')}
          <span>Reset to Clean Defaults</span>
        </button>
      </div>
    </div>
  `;
}


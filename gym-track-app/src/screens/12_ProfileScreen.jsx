import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { USER_PROFILE } from '../data/mockData';
import { User, Target, Scale, Bell, Download, Shield, HelpCircle, Info, ChevronRight } from 'lucide-react';

export default function ProfileScreen() {
  const { navigateTo } = useWorkout();

  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal Information', action: () => {} },
    { id: 'goals', icon: Target, label: 'Goals', action: () => navigateTo('goals') },
    { id: 'units', icon: Scale, label: 'Units', value: 'kg, km', action: () => {} },
    { id: 'notifications', icon: Bell, label: 'Notifications', value: 'On', action: () => {} },
    { id: 'export', icon: Download, label: 'Data Export', action: () => {} },
    { id: 'security', icon: Shield, label: 'Account & Security', action: () => {} },
  ];

  const supportItems = [
    { id: 'help', icon: HelpCircle, label: 'Help Center' },
    { id: 'about', icon: Info, label: 'About GymTrack' },
  ];

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 0' }}>
        <img
          src={USER_PROFILE.avatarUrl}
          alt={USER_PROFILE.name}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--primary)'
          }}
        />
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {USER_PROFILE.name}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {USER_PROFILE.email}
          </p>
        </div>
      </div>

      {/* Main Settings Group */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-card)',
        overflow: 'hidden'
      }}>
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: idx < menuItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color="var(--text-secondary)" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {item.value && (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.value}</span>
                )}
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Section */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.6px', marginBottom: '8px', paddingLeft: '4px' }}>
          SUPPORT
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          overflow: 'hidden'
        }}>
          {supportItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: idx < supportItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} color="var(--text-secondary)" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
                </div>

                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

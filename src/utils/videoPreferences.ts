// User preference utilities for video settings
export class VideoPreferences {
  private static STORAGE_KEY = 'video-preferences';
  
  static getPreferences() {
    if (typeof window === 'undefined') {
      return { muted: false }; // Default for SSR
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load video preferences:', e);
    }
    
    return { muted: false }; // Default preference
  }
  
  static setMuted(muted: boolean) {
    if (typeof window === 'undefined') return;
    
    try {
      const preferences = this.getPreferences();
      preferences.muted = muted;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('video-preferences-changed', {
        detail: preferences
      }));
    } catch (e) {
      console.warn('Could not save video preferences:', e);
    }
  }
  
  static isMuted() {
    return this.getPreferences().muted;
  }
}

// Make it globally available
if (typeof window !== 'undefined') {
  (window as any).VideoPreferences = VideoPreferences;
}

// Web Audio API Synthesizer for Cyberpunk Game SFX (Disabled per user request)

class SoundEngine {
  private isMuted: boolean = true;

  constructor() {
    this.isMuted = true;
  }

  public getMuted(): boolean {
    return true;
  }

  public toggleMute(): boolean {
    return true;
  }

  // Button SFX silenced per user preference
  public playHover() {}
  public playClick() {}
  public playSelect(_isSelected: boolean = true) {}
  public playSeatSelect(_isSelected: boolean = true) {}
  public playSuccess() {}
  public playGlitch() {}
}

export const soundFx = new SoundEngine();

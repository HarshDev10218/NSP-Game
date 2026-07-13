// --- CRITICAL CONFIGURATION PARAMS ---
const SUPABASE_URL = 'https://xmbjhlyrswvlwfknktey.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYmpobHlyc3d2bHdma25rdGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzc3OTQsImV4cCI6MjA5Nzk1Mzc5NH0.6FEB8ZqvlUdYeZb9DPu5bVfeAHbJVvZHhtIBCFlS9gY';

const cyberbase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { useEffect, useRef, useState } = React;

// ==========================================
// 🛒 DYNAMIC RUNTIME TRAIL MODIFIER CORE
// ==========================================
const TRAIL_MODIFIERS = {
    trail_default: { speed: 1.0, coin: 1.0 },
    trail_speed: { speed: 1.20, coin: 1.0 },
    trail_coin: { speed: 1.0, coin: 1.50 },
    trail_neon_pulse: { speed: 1.22, coin: 1.10 },
    trail_quantum: { speed: 1.25, coin: 1.20 },
    trail_plasma: { speed: 1.28, coin: 1.30 },
    trail_hyper_drive: { speed: 1.32, coin: 1.40 },
    trail_overclock: { speed: 1.35, coin: 1.55 },
    trail_nebula: { speed: 1.40, coin: 1.70 },
    trail_void_rift: { speed: 1.45, coin: 1.90 },
    trail_singularity: { speed: 1.50, coin: 2.20 },
    trail_chrono_apex: { speed: 1.60, coin: 3.00 },
    trail_deus_ex: { speed: 1.75, coin: 4.50 }
};

// ==========================================
// 🛒 HYBRID EXPANDED ECONOMY MATRIX
// ==========================================
const MASTER_SHOP_CATALOG = {
    shapes: [
        // --- COMMON TIERS [NORMAL GEOMETRIC VECTOR HULLS] ---
        { id: 'shape_default', name: 'Vector Blue [NORMAL]', cost: 0, type: 'shapes', shape: 'tri', color: '#00f0ff', desc: 'Standard kinetic arrowhead frame configuration.' },
        { id: 'shape_red_arrow', name: 'Vector Red [NORMAL]', cost: 250, type: 'shapes', shape: 'tri', color: '#ff3300', desc: 'Standard variant structural configuration.' },
        { id: 'shape_square', name: 'Matrix Quad [NORMAL]', cost: 600, type: 'shapes', shape: 'sq', color: '#00ff66', desc: 'Symmetrical low-drag quad geometry frame.' },
        { id: 'shape_triangle', name: 'Delta Core [NORMAL]', cost: 900, type: 'shapes', shape: 'tri', color: '#ffaa00', desc: 'Equilateral defense grid vector layout.' },
        { id: 'shape_pentagon', name: 'Aegis Shield [NORMAL]', cost: 1500, type: 'shapes', shape: 'pent', color: '#00aaff', desc: 'Glacial chassis structure with five anchor indices.' },
        { id: 'shape_hexagon', name: 'Lattice Hex [NORMAL]', cost: 2200, type: 'shapes', shape: 'hex', color: '#cc00ff', desc: 'Honeycomb reinforced carbon lattice chassis.' },
        { id: 'shape_octagon', name: 'Iron Fortress [NORMAL]', cost: 3000, type: 'shapes', shape: 'oct', color: '#ff0055', desc: 'Heavyweight metallic armor perimeter plate layout.' },

        // --- RARE TIERS [NORMAL GEOMETRIC VECTOR HULLS] ---
        { id: 'shape_diamond', name: 'Diamond Core [RARE]', cost: 4500, type: 'shapes', shape: 'pent', color: '#00ffff', desc: 'Hardened tracking crystal hull routing geometry.' },
        { id: 'shape_star', name: 'Stellar Anchor [RARE]', cost: 6000, type: 'shapes', shape: 'oct', color: '#ffff00', desc: 'Multi-point energy dispersion engine layout.' },
        { id: 'shape_cross', name: 'Cross Vector [RARE]', cost: 7500, type: 'shapes', shape: 'sq', color: '#ff3333', desc: 'Intersecting quadrant grid alignment frame.' },
        { id: 'shape_shuriken', name: 'Gale Shuriken [RARE]', cost: 9000, type: 'shapes', shape: 'oct', color: '#888888', desc: 'Kinetic spinning projectile chassis design.' },
        { id: 'shape_crystal', name: 'Prism Node [RARE]', cost: 11000, type: 'shapes', shape: 'pent', color: '#00ffaa', desc: 'Resonant structural quartz calculation cluster.' },

        // --- EPIC TIERS [ANOMALY ANATOMY - SPECIAL EMOJI SKINS] ---
        { id: 'shape_neon_star', name: 'Neon Star 🌟 [EPIC]', cost: 15000, type: 'shapes', shape: 'char', emoji: '🌟', desc: 'Overclocked radiating stellar anchor protocol.' },
        { id: 'shape_galaxy_orb', name: 'Galaxy Orb 🌌 [EPIC]', cost: 20000, type: 'shapes', shape: 'char', emoji: '🌌', desc: 'Vortex core containing nebula positional data rows.' },
        { id: 'shape_sun_core', name: 'Sun Core ☀️ [EPIC]', cost: 27500, type: 'shapes', shape: 'char', emoji: '☀️', desc: 'High-density fusion solar radiation protection envelope.' },
        { id: 'shape_energy_crystal', name: 'Energy Crystal 💎 [EPIC]', cost: 35000, type: 'shapes', shape: 'char', emoji: '💎', desc: 'Hyper-charged plasma battery housing.' },
        { id: 'shape_gear', name: 'Kinetic Gear ⚙️ [EPIC]', cost: 45000, type: 'shapes', shape: 'char', emoji: '⚙️', desc: 'Mechanical rotational frame system link layout.' },

        // --- LEGENDARY TIERS [ANOMALY ANATOMY - SPECIAL EMOJI SKINS] ---
        { id: 'shape_black_hole', name: 'Black Hole 🕳️ [LEGENDARY]', cost: 60000, type: 'shapes', shape: 'char', emoji: '🕳️', desc: 'Gravitational event horizon dimensional containment grid.' },
        { id: 'shape_nova_core', name: 'Nova Core 💥 [LEGENDARY]', cost: 80000, type: 'shapes', shape: 'char', emoji: '💥', desc: 'Critical mass unstable explosive mainframe geometry.' },
        { id: 'shape_infinity_core', name: 'Infinity Loop ♾️ [LEGENDARY]', cost: 100000, type: 'shapes', shape: 'char', emoji: '♾️', desc: 'Infinite calculation bridge processing node.' },
        { id: 'shape_celestial_core', name: 'Cosmic Archon 👑 [LEGENDARY]', cost: 150000, type: 'shapes', shape: 'char', emoji: '👑', desc: 'Ultimate cosmic administration matrix configuration.' },

        // --- NEW MYTHIC TIERS [GOD ANOMALIES - ELITE REAPERS] ---
        { id: 'shape_chrono_warp', name: 'Chrono Singularity 🌀 [MYTHIC]', cost: 250000, type: 'shapes', shape: 'char', emoji: '🌀', desc: 'Bends localized runtime layout parameters inside the sector.' },
        { id: 'shape_deus_matrix', name: 'Deus Ex Matrix 🤖 [MYTHIC]', cost: 500000, type: 'shapes', shape: 'char', emoji: '🤖', desc: 'Sentient algorithmic framework override matrix.' },
        { id: 'shape_glitch_lord', name: 'Glitch Overlord 👾 [MYTHIC]', cost: 1000000, type: 'shapes', shape: 'char', emoji: '👾', desc: 'Corrupts visual vector buffers to destabilize hostile logic paths.' },

        // --- SECRET EXPEDITION COMPLETION ---
        { id: 'shape_developer', name: 'Developer Mode 👨‍💻 [ADMIN]', cost: 0, type: 'shapes', shape: 'char', emoji: '👨‍💻', desc: 'UNLOCKED: Complete all system quests to establish bridge.' }
    ],
    abilities: [
        { id: 'ability_speed_boost', name: 'Propulsion Mod', cost: 1200, type: 'abilities', desc: '+5% Baseline system locomotive translation speed multipliers.' },
        { id: 'ability_bullet_power', name: 'Payload Charge', cost: 1800, type: 'abilities', desc: '+5% Projectile kinetic damage calculations.' },
        { id: 'ability_rapid_fire', name: 'Cycle Overclock', cost: 2500, type: 'abilities', desc: '+5% Weapon reload capacitor cooling rate enhancements.' },
        { id: 'ability_lucky_drop', name: 'Matrix Fortune', cost: 3000, type: 'abilities', desc: '+5% Algorithmic item table drop generation parameters.' },
        { id: 'ability_coin_magnet', name: 'Vacuum Perim', cost: 5000, type: 'abilities', desc: '+20% Spatial distance item collection linkage range.' },
        { id: 'ability_extra_health', name: 'Buffer Extension', cost: 6500, type: 'abilities', desc: '+10 Maximum capacity structural integrity units.' },
        { id: 'ability_shield_master', name: 'Plasma Retention', cost: 8000, type: 'abilities', desc: 'Orbital energy shields remain active 10% longer.' },
        { id: 'ability_power_expert', name: 'Status Prolong', cost: 10000, type: 'abilities', desc: 'Overclock modules extend operational loops by 10%.' },
        { id: 'ability_critical_shot', name: 'Vector Breach', cost: 15000, type: 'abilities', desc: '5% Probability to deal double target data row damage values.' },
        { id: 'ability_rapid_dash', name: 'Thruster Recharge', cost: 18000, type: 'abilities', desc: 'Locomotion dodge latency values optimized down by 10%.' },
        { id: 'ability_energy_recovery', name: 'Passive Repair', cost: 22000, type: 'abilities', desc: 'Reconstructs 1 structural node point every 20 seconds.' },
        { id: 'ability_treasure_hunter', name: 'Mining Protocol', cost: 26000, type: 'abilities', desc: '+10% Net economy compilation database writes.' },
        { id: 'ability_phoenix_spirit', name: 'Phoenix Loop', cost: 40000, type: 'abilities', desc: 'Intercepts critical assembly failures to force localized frame reload.' },
        { id: 'ability_boss_hunter', name: 'Titan Saboteur', cost: 50000, type: 'abilities', desc: '+10% Combat scaling output against sector gateway boss anchors.' },
        { id: 'ability_overdrive', name: 'Desperation Core', cost: 60000, type: 'abilities', desc: 'Fires 15% quicker when structural parameters breach under 30%.' },
        { id: 'ability_power_master', name: 'Frequency Scaling', cost: 75000, type: 'abilities', desc: 'Algorithmic modules scale drop distributions 10% more frequently.' },
        // --- NEW MYTHIC ABILITIES ---
        { id: 'ability_time_dilation', name: 'CHRONO DIAL [MYTHIC]', cost: 120000, type: 'abilities', desc: 'Passively retards layout translation velocity of all active enemies by 35%.' },
        { id: 'ability_infinite_pierce', name: 'QUANTUM REACH [MYTHIC]', cost: 200000, type: 'abilities', desc: 'Removes destination collision block overrides; bullets pierce endlessly.' },
        { id: 'ability_singularity_purge', name: 'SINGULARITY REAP [MYTHIC]', cost: 350000, type: 'abilities', desc: 'Triggers a total map sweeps clean wipe when integrity logs hit below 15%.' }
    ],
    trails: [
        { id: 'trail_default', name: 'STEALTH FLOW [COMMON]', cost: 0, type: 'trails', desc: 'Standard clean thruster lines.' },
        { id: 'trail_speed', name: 'VOLT SPARK [COMMON]', cost: 1000, type: 'trails', desc: 'Propulsion multiplier array: Speed +20%' },
        { id: 'trail_coin', name: 'MIDAS GLOW [COMMON]', cost: 3500, type: 'trails', desc: 'Economy multiplier configuration: Coin Yield +50%' },
        { id: 'trail_neon_pulse', name: 'NEON PULSE [RARE]', cost: 5000, type: 'trails', desc: 'Optimized vector parameters: Speed +22% | Coin Yield +10%' },
        { id: 'trail_quantum', name: 'QUANTUM STREAM [RARE]', cost: 8000, type: 'trails', desc: 'Entangled data exhaust: Speed +25% | Coin Yield +20%' },
        { id: 'trail_plasma', name: 'PLASMA WAKE [EPIC]', cost: 12000, type: 'trails', desc: 'Superheated matrix lines: Speed +28% | Coin Yield +30%' },
        { id: 'trail_hyper_drive', name: 'HYPER DRIVE [EPIC]', cost: 18000, type: 'trails', desc: 'Warp matrix emitter smoke: Speed +32% | Coin Yield +40%' },
        { id: 'trail_overclock', name: 'OVERCLOCK SMOKE [EPIC]', cost: 25000, type: 'trails', desc: 'Volatile core exhaust metrics: Speed +35% | Coin Yield +55%' },
        { id: 'trail_nebula', name: 'NEBULA FLOW [LEGENDARY]', cost: 40000, type: 'trails', desc: 'Cosmic calculation particles: Speed +40% | Coin Yield +70%' },
        { id: 'trail_void_rift', name: 'VOID RIFT [LEGENDARY]', cost: 60000, type: 'trails', desc: 'Sub-atomic spatial tears: Speed +45% | Coin Yield +90%' },
        { id: 'trail_singularity', name: 'SINGULARITY WAKE [LEGENDARY]', cost: 90000, type: 'trails', desc: 'Displacement black hole metrics: Speed +50% | Coin Yield +120%' },
        { id: 'trail_chrono_apex', name: 'CHRONO APEX [MYTHIC]', cost: 150000, type: 'trails', desc: 'Overclocked master reality matrix lines: Speed +60% | Coin Yield +200%' },
        { id: 'trail_deus_ex', name: 'DEUS EX TRAIL [MYTHIC]', cost: 300000, type: 'trails', desc: 'Ultimate development testing pipeline exhaust: Speed +75% | Coin Yield +350%' }
    ]
};

// ==========================================
// 🏆 STATIC ACHIEVEMENT DEF REGISTRY
// ==========================================
const MASTER_ACHIEVEMENT_REGISTRY = [
    { id: 'ach_first_kill', cat: 'Beginner', name: 'FIRST PURGE', desc: 'Record your first hostile elimination on the sector grid.', reward: 100 },
    { id: 'ach_first_boss', cat: 'Beginner', name: 'VANGUARD SMASH', desc: 'Successfully bring down a Megamech Anchor tier section boss.', reward: 300 },
    { id: 'ach_surv_5', cat: 'Survival', name: 'GRID SURVIVOR I', desc: 'Endure deployment configuration for a total of 5 minutes.', reward: 500, target: 300 },
    { id: 'ach_surv_10', cat: 'Survival', name: 'GRID SURVIVOR II', desc: 'Endure deployment configuration for a total of 10 minutes.', reward: 1000, target: 600 },
    { id: 'ach_kill_100', cat: 'Combat', name: 'SECTOR CLEANSER I', desc: 'Eliminate 100 system hostiles over your active lifecycle.', reward: 400, target: 100 },
    { id: 'ach_kill_1000', cat: 'Combat', name: 'SECTOR CLEANSER II', desc: 'Eliminate 1,000 system hostiles over your active lifecycle.', reward: 1500, target: 1000 },
    { id: 'ach_boss_10', cat: 'Boss', name: 'TITAN BREAK I', desc: 'Purge a cumulative counter total of 10 sector gate bosses.', reward: 1200, target: 10 },
    { id: 'ach_surv_20', cat: 'Survival', name: 'GRID SURVIVOR III', desc: 'Endure deployment configuration for a total of 20 minutes.', reward: 2500, target: 1200 },
    { id: 'ach_kill_5000', cat: 'Combat', name: 'SECTOR CLEANSER III', desc: 'Eliminate 5,000 system hostiles over your active lifecycle.', reward: 3000, target: 5000 },
    { id: 'ach_boss_50', cat: 'Boss', name: 'TITAN BREAK II', desc: 'Purge a cumulative counter total of 50 sector gate bosses.', reward: 5000, target: 50 },
    { id: 'ach_coin_10000', cat: 'Economy', name: 'DATA MINER I', desc: 'Accumulate a total of 10,000 capital credits from all deployments.', reward: 2000, target: 10000 }
];

// ==========================================
// 🔊 CHIP-TUNE SYNTHESIZER AUDIO CORE
// ==========================================
const AudioEngine = {
    ctx: null, masterVol: 0.5, musicVol: 0.4, sfxVol: 0.5, isMuted: false, musicNode: null, userInteracted: false,
    init() {
        if (!this.userInteracted) return;
        if (this.ctx) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        this.ctx = new AudioContextClass();
    },
    getGain(type) {
        if (!this.ctx || this.isMuted) return 0;
        return this.masterVol * (type === 'music' ? this.musicVol : this.sfxVol);
    },
    playSFX(type) {
        this.init(); if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const now = this.ctx.currentTime; const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);
        const currentSFXVolume = this.getGain('sfx');
        switch(type) {
            case 'click':
                osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); gain.gain.setValueAtTime(currentSFXVolume * 0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05); osc.start(now); osc.stop(now + 0.05); break;
            case 'start':
                osc.type = 'triangle'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
                gain.gain.setValueAtTime(currentSFXVolume * 0.6, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.3); osc.start(now); osc.stop(now + 0.3); break;
            case 'shoot':
                osc.type = 'triangle'; osc.frequency.setValueAtTime(880, now); osc.frequency.linearRampToValueAtTime(220, now + 0.1);
                gain.gain.setValueAtTime(currentSFXVolume * 0.15, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1); break;
            case 'hit':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(120, now); gain.gain.setValueAtTime(currentSFXVolume * 0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.06); osc.start(now); osc.stop(now + 0.06); break;
            case 'damage':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(180, now); osc.frequency.linearRampToValueAtTime(60, now + 0.25);
                gain.gain.setValueAtTime(currentSFXVolume * 0.4, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.25); osc.start(now); osc.stop(now + 0.25); break;
            case 'explosion':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now); osc.frequency.linearRampToValueAtTime(30, now + 0.4);
                gain.gain.setValueAtTime(currentSFXVolume * 0.6, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.4); osc.start(now); osc.stop(now + 0.4); break;
            case 'powerup':
                osc.type = 'sine'; osc.frequency.setValueAtTime(440, now); osc.frequency.setValueAtTime(554, now + 0.06); osc.frequency.setValueAtTime(659, now + 0.12);
                osc.frequency.setValueAtTime(880, now + 0.18); gain.gain.setValueAtTime(currentSFXVolume * 0.4, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
                osc.start(now); osc.stop(now + 0.3); break;
            case 'boss_spawn':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(70, now); osc.frequency.linearRampToValueAtTime(110, now + 0.6);
                gain.gain.setValueAtTime(currentSFXVolume * 0.7, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.6); osc.start(now); osc.stop(now + 0.6); break;
            case 'boss_death':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now); osc.frequency.linearRampToValueAtTime(40, now + 1.0);
                gain.gain.setValueAtTime(currentSFXVolume * 0.8, now); gain.gain.linearRampToValueAtTime(0.01, now + 1.0); osc.start(now); osc.stop(now + 1.0); break;
            case 'gameover':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, now); osc.frequency.linearRampToValueAtTime(55, now + 0.8);
                gain.gain.setValueAtTime(currentSFXVolume * 0.6, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.8); osc.start(now); osc.stop(now + 0.8); break;
        }
    },
    setMusicTheme(state) {
        this.init(); if (!this.ctx) return;
        if (this.musicNode) { try { this.musicNode.stop(); } catch(e){} this.musicNode = null; }
        const currentMusicVolume = this.getGain('music'); if (currentMusicVolume <= 0) return;
        const now = this.ctx.currentTime; const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination); osc.type = 'triangle'; gain.gain.setValueAtTime(currentMusicVolume * 0.15, now);
        let notes = [];
        if (state === 'START_SCREEN') notes = [110, 130, 146, 130];
        if (state === 'PLAY') notes = [146, 165, 174, 196, 220, 196, 174, 165];
        if (state === 'BOSS' || state === 'PAUSED') notes = [98, 98, 87, 87, 73, 73, 110, 110];
        if (state === 'GAME_OVER') notes = [87, 82, 73, 65];
        if (notes.length === 0) return;
        const noteLength = state === 'BOSS' ? 0.2 : 0.4;
        notes.forEach((freq, idx) => {
            const timeOffset = idx * noteLength; osc.frequency.setValueAtTime(freq, now + timeOffset);
            gain.gain.setValueAtTime(currentMusicVolume * 0.15, now + timeOffset);
            gain.gain.linearRampToValueAtTime(currentMusicVolume * 0.05, now + timeOffset + noteLength - 0.02);
        });
        osc.loop = true; osc.start(now); const seqTotalDuration = notes.length * noteLength; osc.stop(now + seqTotalDuration);
        this.musicNode = osc;
        this.loopTimer = setTimeout(() => { if (this.musicNode === osc) this.setMusicTheme(state); }, seqTotalDuration * 1000);
    },
    stopMusic() { if (this.loopTimer) clearTimeout(this.loopTimer); if (this.musicNode) { try { this.musicNode.stop(); } catch(e){} this.musicNode = null; } }
};


// ==========================================
// 🗺️ MAP CONFIGURATIONS & PROGRESSION
// ==========================================
const MAP_CONFIGS = [
    { name: "Neon City", theme: "Blue and purple cyberpunk city", gridColor: "#121226", bgTop: "#080811", bgBottom: "#1a0b2e", particleColor: "#00f0ff", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Desert Outpost", theme: "Sand dunes", gridColor: "#332211", bgTop: "#ffaa00", bgBottom: "#552200", particleColor: "#ffcc00", friction: 0.95, enemySpeedMod: 1.1 },
    { name: "Frozen Wasteland", theme: "Snowstorm", gridColor: "#112233", bgTop: "#aaddff", bgBottom: "#112233", particleColor: "#ffffff", friction: 0.8, enemySpeedMod: 1.2 },
    { name: "Toxic Laboratory", theme: "Underground facility", gridColor: "#113311", bgTop: "#002200", bgBottom: "#113311", particleColor: "#00ff00", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Cyber Factory", theme: "Giant factory", gridColor: "#222222", bgTop: "#111111", bgBottom: "#333333", particleColor: "#aaaaaa", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Ancient Temple", theme: "Lost ruins", gridColor: "#2a3b2a", bgTop: "#112211", bgBottom: "#2a3b2a", particleColor: "#88cc88", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Haunted Graveyard", theme: "Night fog", gridColor: "#1a1a2e", bgTop: "#0a0a1a", bgBottom: "#1a1a2e", particleColor: "#555577", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Volcano Core", theme: "Lava world", gridColor: "#3b1111", bgTop: "#550000", bgBottom: "#ff4400", particleColor: "#ff4400", friction: 1.0, enemySpeedMod: 1.1 },
    { name: "Sky Islands", theme: "Floating islands", gridColor: "#113355", bgTop: "#0055aa", bgBottom: "#aaddff", particleColor: "#aaddff", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Underwater Base", theme: "Ocean research", gridColor: "#0a1a3a", bgTop: "#001133", bgBottom: "#0a1a3a", particleColor: "#00aaff", friction: 1.2, enemySpeedMod: 0.9 },
    { name: "Space Station", theme: "Orbiting station", gridColor: "#050510", bgTop: "#000000", bgBottom: "#050510", particleColor: "#ffffff", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Alien Planet", theme: "Purple landscape", gridColor: "#220033", bgTop: "#110022", bgBottom: "#440066", particleColor: "#aa00ff", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Crystal Caverns", theme: "Underground crystal cave", gridColor: "#111133", bgTop: "#001122", bgBottom: "#111133", particleColor: "#00ffff", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Dark Dimension", theme: "Shadow world", gridColor: "#0d001a", bgTop: "#000000", bgBottom: "#0d001a", particleColor: "#330066", friction: 1.0, enemySpeedMod: 1.0 },
    { name: "Final Nexus", theme: "Ultimate futuristic arena", gridColor: "#330033", bgTop: "#220022", bgBottom: "#550055", particleColor: "#ff00ff", friction: 1.0, enemySpeedMod: 1.2 }
];

const DYNAMIC_EVENTS = ['Meteor Shower', 'Heavy Rain', 'Thunderstorm', 'Blizzard', 'Sandstorm', 'Toxic Gas Leak', 'Solar Eclipse', 'Earthquake', 'Blackout', 'Alien Invasion'];
const INTERACTIVE_OBJECTS = ['Treasure Chest', 'Healing Fountain', 'Supply Crate', 'Teleporter', 'Bounce Pad', 'Shield Generator', 'Speed Boost Zone', 'Explosive Barrel', 'Turret', 'Hidden Secret Room'];
const NPC_TYPES = ['Merchant', 'Mechanic', 'Scientist', 'Medic', 'Survivor', 'Blacksmith', 'Drone Assistant', 'Quest Giver'];

// ==========================================
// 🕹️ MAIN SIMULATION ENGINE PLAYSPACE
// ==========================================
function CyberpunkSurvival() {
    const canvasRef = useRef(null);
    const knobRef = useRef(null);

    const [gameState, setGameState] = useState('START_SCREEN');
    const [hud, setHud] = useState({ health: 100, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00", coins: 0, combo: 0 });

    const [selectedMapIndex, setSelectedMapIndex] = useState(0);

    const mapStateRef = useRef({ mapIndex: 0, nextMapAt: 60, currentEvent: null, eventTimer: 0, showBanner: false, bannerTimer: 0 });
    const interactiveObjectsRef = useRef([]);
    const npcsRef = useRef([]);

    const [bossHp, setBossHp] = useState({ current: 0, max: 250, active: false });
    const [cards, setCards] = useState([]);

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const [activeCoinWallet, setActiveCoinWallet] = useState(0);
    const [unlockedInventory, setUnlockedInventory] = useState(['shape_default', 'ability_default', 'trail_default']);
    const [equippedShape, setEquippedShape] = useState('shape_default');
    const [equippedAbility, setEquippedAbility] = useState('ability_default');
    const [equippedTrail, setEquippedTrail] = useState('trail_default');
    const [activeShopTab, setActiveShopTab] = useState('shapes');

    const [showShop, setShowShop] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showQuests, setShowQuests] = useState(false);
    const [showStartLeaderboard, setShowStartLeaderboard] = useState(false);
    const [showEnemies, setShowEnemies] = useState(false);
    const [showMaps, setShowMaps] = useState(false);

    const [completedAchievements, setCompletedAchievements] = useState([]);
    const [dailyQuests, setDailyQuests] = useState([
        { id: 'd_kills_1', type: 'kills', target: 200, progress: 0, reward: 250, desc: 'Purge 200 grid hostiles in a daily cycle.', claimed: false },
        { id: 'd_boss_1', type: 'bosses', target: 2, progress: 0, reward: 500, desc: 'Defeat 2 Megamech Anchor section bosses.', claimed: false },
        { id: 'd_time_1', type: 'time', target: 480, progress: 0, reward: 400, desc: 'Survive for a combined total of 8 minutes.', claimed: false }
    ]);

    const [cfgScreenShake, setCfgScreenShake] = useState(true);
    const [cfgParticles, setCfgParticles] = useState(true);
    const [cfgFpsCounter, setCfgFpsCounter] = useState(false);
    const [cfgHighContrast, setCfgHighContrast] = useState(false);

    const [lifetimeStats, setLifetimeStats] = useState({
        games_played: 0, total_kills: 0, bosses_defeated: 0, deaths: 0,
        total_coins_earned: 0, coins_spent: 0, highest_kill_count: 0,
        longest_survival_time: 0, total_survival_seconds: 0, highest_combo: 0,
        total_powerups_collected: 0, total_play_time_seconds: 0
    });

    const [leaderboard, setLeaderboard] = useState([]);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbError, setDbError] = useState(null);
    const [finalUpgradesManifest, setFinalUpgradesManifest] = useState([]);

    const [mVolume, setMVol] = useState(50);
    const [musVolume, setMusVol] = useState(40);
    const [sfxVolume, setSfxVol] = useState(50);
    const [muteActive, setMuteActive] = useState(false);

    const isSelectionLocked = useRef(false);

    let logicalWidth = 800;
    let logicalHeight = 600;
    const playerRef = useRef({ x: 400, y: 300, radius: 14, baseSpeed: 3.5, speedMult: 1, health: 100, level: 1, xp: 0, xpNeeded: 12, fireCooldown: 0, baseFireRate: 35, laserCooldown: 180, shieldAngle: 0, basePickupRadius: 80, pickupRadius: 80, lastDir: { x: 1, y: 0 }, flashTime: 0 });
    const enemiesRef = useRef([]);
    const projectilesRef = useRef([]);
    const gemsRef = useRef([]);
    const particlesRef = useRef([]);
    const keysRef = useRef({});
    const cameraRef = useRef({ x: 0, y: 0 });
    const touchVectorRef = useRef({ x: 0, y: 0 });

    const gameMetrics = useRef({ accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0, coinsEarnedThisRun: 0, currentCombo: 0, highestComboThisRun: 0, totalPowerupsThisRun: 0, screenShakeIntensity: 0 });
    const floatingTextsRef = useRef([]);
    const fpsRef = useRef({ lastFrameTime: 0, currentFps: 0, frameCount: 0, fpsTimer: 0 });

    const lastTimestamp = useRef(0);
    const cancelEngineId = useRef(null);
    const bossSpawnedForCurrentMilestone = useRef(false);

    const upgradesRef = useRef({
        attackSpeed: { id: "attackSpeed", name: "COOLDOWN OVERCLOCK", desc: "Boosts firing speed. Lvl 4+ unlocks 3-way split-streams.", lvl: 0 },
        shield: { id: "shield", name: "PLASMA ORBITAL", desc: "Rotating energy shielding orbs. Lvl 5+ hyper-accelerates rotation.", lvl: 0 },
        laser: { id: "laser", name: "PIERCING LASER RAY", desc: "Fires piercing beam. Higher levels expand width and uptime.", lvl: 0 },
        magnet: { id: "magnet", name: "MAGNETIC FIELD LINK", desc: "Expands collection vacuum perimeter by 60px per stage (Max Lvl 6).", lvl: 0 },
        speed: { id: "speed", name: "BOOT OVERDRIVE", desc: "Increases baseline system locomotion propulsion speed by 15%.", lvl: 0 },
        xpBoost: { id: "xpBoost", name: "XP BOOST", desc: "Increases XP drop yield by 50% per level.", lvl: 0 }
    });

    // ==========================================
    // 🔐 PROFILE SECURITY DATA PIPELINES (HOISTED)
    // ==========================================
    function loadProfileCloudData(uid) {
        cyberbase.from('profiles').select('username, coins, inventory, equipped_shape, equipped_ability, equipped_trail, settings, lifetime_stats, completed_achievements, daily_quests_state').eq('id', uid).single()
        .then(({ data, error }) => {
            if (error) throw error;
            if (data) {
                setUsername(data.username); setActiveCoinWallet(data.coins);
                if (data.inventory) setUnlockedInventory(data.inventory);
                if (data.equipped_shape) setEquippedShape(data.equipped_shape);
                if (data.equipped_ability) setEquippedAbility(data.equipped_ability);
                if (data.equipped_trail) setEquippedTrail(data.equipped_trail);
                if (data.completed_achievements) setCompletedAchievements(data.completed_achievements);

                if (data.settings) {
                    setMVol(data.settings.master_vol ?? 50); setMusVol(data.settings.music_vol ?? 40); setSfxVol(data.settings.sfx_vol ?? 50);
                    setCfgScreenShake(data.settings.screen_shake ?? true); setCfgParticles(data.settings.particles ?? true);
                    setCfgFpsCounter(data.settings.fps_counter ?? false); setCfgHighContrast(data.settings.high_contrast ?? false);
                }
                if (data.lifetime_stats) setLifetimeStats(data.lifetime_stats);

                if (data.daily_quests_state) {
                    const todayStr = new Date().toDateString();
                    if (data.daily_quests_state.last_reset_date !== todayStr) {
                        const refreshedQuests = [
                            { id: 'd_kills_1', type: 'kills', target: 200, progress: 0, reward: 250, desc: 'Purge 200 grid hostiles in a daily cycle.', claimed: false },
                            { id: 'd_boss_1', type: 'bosses', target: 2, progress: 0, reward: 500, desc: 'Defeat 2 Megamech Anchor section bosses.', claimed: false },
                            { id: 'd_time_1', type: 'time', target: 480, progress: 0, reward: 400, desc: 'Survive for a combined total of 8 minutes.', claimed: false }
                        ];
                        setDailyQuests(refreshedQuests); // Fixed calculation array index typo
                        cyberbase.from('profiles').update({ daily_quests_state: { last_reset_date: todayStr, quests: refreshedQuests } }).eq('id', uid);
                    } else {
                        setDailyQuests(data.daily_quests_state.quests || []);
                    }
                }
            }
        }).catch(err => console.error("Database connection exception dropped:", err.message));
    }

    function handleAuthenticationAction(e) {
        e.preventDefault(); setDbLoading(true); setDbError(null); AudioEngine.playSFX('click');
        if (isSignUp) {
            cyberbase.auth.signUp({ email, password })
            .then(({ data: authData, error: authErr }) => {
                if (authErr) throw authErr;
                if (authData.user) {
                    return cyberbase.from('profiles').insert([{
                        id: authData.user.id, username: username.toUpperCase().trim(), coins: 0,
                        inventory: ['shape_default', 'ability_default', 'trail_default'],
                        equipped_shape: 'shape_default', equipped_ability: 'ability_default', equipped_trail: 'trail_default',
                        settings: { master_vol: 50, music_vol: 40, sfx_vol: 50, screen_shake: true, particles: true, fps_counter: false, high_contrast: false },
                        lifetime_stats: { games_played: 0, total_kills: 0, bosses_defeated: 0, deaths: 0, total_coins_earned: 0, coins_spent: 0, highest_kill_count: 0, longest_survival_time: 0, total_survival_seconds: 0, highest_combo: 0, total_powerups_collected: 0, total_play_time_seconds: 0, map_survival_times: {} },
                        completed_achievements: [],
                        daily_quests_state: { last_reset_date: new Date().toDateString(), quests: dailyQuests }
                    }]);
                }
            })
            .then(() => { cyberbase.auth.getSession().then(({ data: { session } }) => { if (session) { setUser(session.user); setActiveCoinWallet(0); setUnlockedInventory(['shape_default', 'ability_default', 'trail_default']); } setDbLoading(false); }); })
            .catch(err => { setDbError(err.message); setDbLoading(false); });
        } else {
            cyberbase.auth.signInWithPassword({ email, password })
            .then(({ data: authData, error: authErr }) => {
                if (authErr) throw authErr;
                setUser(authData.user); loadProfileCloudData(authData.user.id);
                setDbLoading(false);
            }).catch(err => { setDbError(err.message); setDbLoading(false); });
        }
    }

    function saveSettingsToCloud(shake, particles, fps, contrast) {
        if (!user) return;
        const settingsPayload = { master_vol: mVolume, music_vol: musVolume, sfx_vol: sfxVolume, screen_shake: shake, particles: particles, fps_counter: fps, high_contrast: contrast };
        cyberbase.from('profiles').update({ settings: settingsPayload }).eq('id', user.id);
    }

    function handleShopTransaction(item) {
        if (!user) return; AudioEngine.playSFX('click');
        const isOwned = unlockedInventory.includes(item.id);

        if (isOwned) {
            let updatePayload = {};
            if (item.type === 'shapes') { setEquippedShape(item.id); updatePayload.equipped_shape = item.id; }
            if (item.type === 'abilities') { setEquippedAbility(item.id); updatePayload.equipped_ability = item.id; }
            if (item.type === 'trails') { setEquippedTrail(item.id); updatePayload.equipped_trail = item.id; }
            cyberbase.from('profiles').update(updatePayload).eq('id', user.id);
        } else {
            if (item.id === 'shape_developer') {
                const totalActiveQuestsCount = dailyQuests.length;
                const completedQuestsCount = dailyQuests.filter(q => q.progress >= q.target).length;

                if (completedQuestsCount < totalActiveQuestsCount) {
                    alert("ACCESS OVERRIDE FAILURE: Developer Hull requires ALL ongoing Daily Missions to be completed!");
                    return;
                }
            } else if (activeCoinWallet < item.cost) {
                alert("INSUFFICIENT CAPITAL CREDITS IN COIN RESERVES.");
                return;
            }

            const directWalletResult = item.id === 'shape_developer' ? activeCoinWallet : activeCoinWallet - item.cost;
            const updatedInventoryList = [...unlockedInventory, item.id];
            const updatedStatsObj = { ...lifetimeStats, coins_spent: (lifetimeStats.coins_spent ?? 0) + (item.id === 'shape_developer' ? 0 : item.cost) };
            setDbLoading(true);

            cyberbase.from('profiles').update({ coins: directWalletResult, inventory: updatedInventoryList, lifetime_stats: updatedStatsObj }).eq('id', user.id)
            .then(({ error }) => {
                if (!error) { setActiveCoinWallet(directWalletResult); setUnlockedInventory(updatedInventoryList); setLifetimeStats(updatedStatsObj); }
                setDbLoading(false);
            });
        }
    }

    function handleClaimQuestReward(questId) {
        if (!user || dbLoading) return; AudioEngine.playSFX('powerup'); setDbLoading(true);
        const updatedQuests = dailyQuests.map(q => { if (q.id === questId) return { ...q, claimed: true }; return q; });
        const targetedQuest = dailyQuests.find(q => q.id === questId);
        const addedCoinsAmt = targetedQuest ? targetedQuest.reward : 0;
        const newWalletTotal = activeCoinWallet + addedCoinsAmt;
        cyberbase.from('profiles').update({ coins: newWalletTotal, daily_quests_state: { last_reset_date: new Date().toDateString(), quests: updatedQuests } }).eq('id', user.id)
        .then(({ error }) => {
            if (!error) { setActiveCoinWallet(newWalletTotal); setDailyQuests(updatedQuests); }
            setDbLoading(false);
        });
    }

    function handleResetProgressAction() {
        if (!user || !confirm("CRITICAL WARNING: THIS WILL PERMANENTLY WIPE ALL STORE PROGRESS. CONTINUE?")) return; setDbLoading(true);
        const blankStats = { games_played: 0, total_kills: 0, bosses_defeated: 0, deaths: 0, total_coins_earned: 0, coins_spent: 0, highest_kill_count: 0, longest_survival_time: 0, total_survival_seconds: 0, highest_combo: 0, total_powerups_collected: 0, total_play_time_seconds: 0 };
        const blankInventory = ['shape_default', 'ability_default', 'trail_default'];
        cyberbase.from('profiles').update({ coins: 0, inventory: blankInventory, equipped_shape: 'shape_default', equipped_ability: 'ability_default', equipped_trail: 'trail_default', lifetime_stats: blankStats, completed_achievements: [] }).eq('id', user.id)
        .then(({ error }) => {
            if (!error) { setActiveCoinWallet(0); setUnlockedInventory(blankInventory); setEquippedShape('shape_default'); setEquippedAbility('ability_default'); setEquippedTrail('trail_default'); setLifetimeStats(blankStats); setCompletedAchievements([]); setShowSettings(false); }
            setDbLoading(false);
        });
    }

    function fetchLeaderboardScores() {
        setDbLoading(true); setDbError(null);
        cyberbase.from('leaderboard').select('player_name, kills, survival_time').order('kills', { ascending: false }).limit(5)
        .then(({ data, error }) => {
            if (error) throw error; setLeaderboard(data || []);
            setDbLoading(false);
        }).catch(err => { setDbError("Leaderboard data pipeline failed"); setDbLoading(false); });
    }

    function submitScoreToDatabase() {
        if (!user || scoreSubmitted) return; setDbLoading(true);
        const m = gameMetrics.current;
        cyberbase.from('leaderboard').insert([{ player_name: username, kills: m.killCounter, survival_time: hud.time }])
        .then(({ error: boardErr }) => {
            if (boardErr) throw boardErr;
            const updatedKillsTotal = (lifetimeStats.total_kills ?? 0) + m.killCounter;
            const updatedBossesTotal = (lifetimeStats.bosses_defeated ?? 0) + m.bossesKilled;
            const updatedSurvivalSecs = (lifetimeStats.total_survival_seconds ?? 0) + m.clockSeconds;

            let unlockedIdsThisSession = [...completedAchievements];
            let operationalBonusAwardedCoins = 0;

            MASTER_ACHIEVEMENT_REGISTRY.forEach(ach => {
                if (unlockedIdsThisSession.includes(ach.id)) return;
                let checkConditionPassed = false;
                if (ach.id === 'ach_first_kill' && m.killCounter >= 1) checkConditionPassed = true;
                if (ach.id === 'ach_first_boss' && m.bossesKilled >= 1) checkConditionPassed = true;
                if (ach.id === 'ach_surv_5' && updatedSurvivalSecs >= 300) checkConditionPassed = true;
                if (ach.id === 'ach_surv_10' && updatedSurvivalSecs >= 600) checkConditionPassed = true;
                if (ach.id === 'ach_surv_20' && updatedSurvivalSecs >= 1200) checkConditionPassed = true;
                if (ach.id === 'ach_kill_100' && updatedKillsTotal >= 100) checkConditionPassed = true;
                if (ach.id === 'ach_kill_1000' && updatedKillsTotal >= 1000) checkConditionPassed = true;
                if (ach.id === 'ach_kill_5000' && updatedKillsTotal >= 5000) checkConditionPassed = true;
                if (ach.id === 'ach_boss_10' && updatedBossesTotal >= 10) checkConditionPassed = true;
                if (ach.id === 'ach_boss_50' && updatedBossesTotal >= 50) checkConditionPassed = true;
                if (ach.id === 'ach_coin_10000' && (lifetimeStats.total_coins_earned ?? 0) + m.coinsEarnedThisRun + operationalBonusAwardedCoins >= 10000) checkConditionPassed = true;
                if (checkConditionPassed) { unlockedIdsThisSession.push(ach.id); operationalBonusAwardedCoins += ach.reward; }
            });

            const syncQuestsState = dailyQuests.map(q => {
                let currentProgAmt = q.progress;
                if (q.type === 'kills') currentProgAmt = Math.min(q.target, q.progress + m.killCounter);
                if (q.type === 'bosses') currentProgAmt = Math.min(q.target, q.progress + m.bossesKilled);
                if (q.type === 'time') currentProgAmt = Math.min(q.target, q.progress + m.clockSeconds);
                return { ...q, progress: currentProgAmt };
            });

            const totalRunCoinsMinedNet = m.coinsEarnedThisRun + operationalBonusAwardedCoins;
            const finalCoinWalletBalance = activeCoinWallet + totalRunCoinsMinedNet;

            const currentMapSurvivalTimes = lifetimeStats.map_survival_times || {};
            const prevMaxSurvival = currentMapSurvivalTimes[mapStateRef.current.mapIndex] || 0;
            const updatedMapSurvivalTimes = { ...currentMapSurvivalTimes, [mapStateRef.current.mapIndex]: Math.max(prevMaxSurvival, m.clockSeconds) };

            const updatedStatsObj = {
                games_played: (lifetimeStats.games_played ?? 0) + 1, total_kills: updatedKillsTotal, bosses_defeated: updatedBossesTotal, deaths: (lifetimeStats.deaths ?? 0) + 1,
                total_coins_earned: (lifetimeStats.total_coins_earned ?? 0) + totalRunCoinsMinedNet, coins_spent: lifetimeStats.coins_spent ?? 0, highest_kill_count: Math.max(lifetimeStats.highest_kill_count ?? 0, m.killCounter),
                longest_survival_time: Math.max(lifetimeStats.longest_survival_time ?? 0, m.clockSeconds), total_survival_seconds: updatedSurvivalSecs, highest_combo: Math.max(lifetimeStats.highest_combo ?? 0, m.highestComboThisRun),
                total_powerups_collected: (lifetimeStats.total_powerups_collected ?? 0) + m.totalPowerupsThisRun, total_play_time_seconds: (lifetimeStats.total_play_time_seconds ?? 0) + m.clockSeconds,
                map_survival_times: updatedMapSurvivalTimes
            };

            return cyberbase.from('profiles').update({ coins: finalCoinWalletBalance, lifetime_stats: updatedStatsObj, completed_achievements: unlockedIdsThisSession, daily_quests_state: { last_reset_date: new Date().toDateString(), quests: syncQuestsState } }).eq('id', user.id)
            .then(({ error: economyErr }) => {
                if (economyErr) throw economyErr;
                setActiveCoinWallet(finalCoinWalletBalance); setLifetimeStats(updatedStatsObj); setCompletedAchievements(unlockedIdsThisSession); setDailyQuests(syncQuestsState); setScoreSubmitted(true);
                fetchLeaderboardScores();
            });
        }).catch(err => { setDbError("Synchronization layer locked out"); setDbLoading(false); });
    }

    function toggleStartLeaderboardMode() { AudioEngine.playSFX('click'); if (!showStartLeaderboard) fetchLeaderboardScores(); setShowStartLeaderboard(!showStartLeaderboard); }
    function initializeGameSession() { if (!user) return; AudioEngine.playSFX('start'); startSimulation(); }

    function startSimulation() {
        const p = playerRef.current;
        p.maxHealth = 100;
        if (equippedAbility === 'ability_extra_health') p.maxHealth += 10;
        p.x = 400; p.y = 300; p.health = p.maxHealth; p.level = 1; p.xp = 0; p.xpNeeded = 12; p.speedMult = 1; p.laserCooldown = 180; p.pickupRadius = p.basePickupRadius * (equippedAbility === 'ability_coin_magnet' ? 1.2 : 1.0); p.flashTime = 0;
        enemiesRef.current = []; projectilesRef.current = []; gemsRef.current = []; particlesRef.current = []; floatingTextsRef.current = [];
        gameMetrics.current = { accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0, coinsEarnedThisRun: 0, currentCombo: 0, highestComboThisRun: 0, totalPowerupsThisRun: 0, screenShakeIntensity: 0 };
        touchVectorRef.current = { x: 0, y: 0 }; bossSpawnedForCurrentMilestone.current = false; lastTimestamp.current = performance.now();

        mapStateRef.current = { mapIndex: selectedMapIndex, nextMapAt: 60, currentEvent: null, eventTimer: 0, showBanner: false, bannerTimer: 0 };
        interactiveObjectsRef.current = [];
        npcsRef.current = [];

        setScoreSubmitted(false); setShowStartLeaderboard(false); isSelectionLocked.current = false; setFinalUpgradesManifest([]);
        Object.keys(upgradesRef.current).forEach(k => upgradesRef.current[k].lvl = 0); setBossHp({ current: 0, max: 250, active: false });
        setHud({ health: p.maxHealth, maxHealth: p.maxHealth, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00", coins: activeCoinWallet, combo: 0 });
        setGameState('PLAY');
    }

    function handleSignOut() { AudioEngine.playSFX('click'); cyberbase.auth.signOut().then(() => { setUser(null); setPassword(''); setActiveCoinWallet(0); }); }
    function compileFinalUpgradesReport() { setFinalUpgradesManifest(Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.lvl > 0)); }

    useEffect(() => {
        cyberbase.auth.getSession().then(({ data: { session } }) => {
            if (session) { setUser(session.user); loadProfileCloudData(session.user.id); }
        });
    }, []);

    useEffect(() => {
        AudioEngine.masterVol = mVolume / 100;
        AudioEngine.musicVol = musVolume / 100;
        AudioEngine.sfxVol = sfxVolume / 100;
        AudioEngine.isMuted = muteActive;
        if (AudioEngine.userInteracted) {
            AudioEngine.setMusicTheme(gameState === 'PLAY' && bossHp.active ? 'BOSS' : gameState);
        }
    }, [mVolume, musVolume, sfxVolume, muteActive, gameState, bossHp.active]);

    useEffect(() => {
        if (AudioEngine.userInteracted) return;
        const unlockAudio = () => {
            if (!AudioEngine.userInteracted) {
                AudioEngine.userInteracted = true;
                AudioEngine.init();
                AudioEngine.setMusicTheme(gameState === 'PLAY' && bossHp.active ? 'BOSS' : gameState);
                window.removeEventListener('click', unlockAudio);
                window.removeEventListener('keydown', unlockAudio);
                window.removeEventListener('touchstart', unlockAudio);
            }
        };
        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);
        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };
    }, [gameState, bossHp.active]);

    useEffect(() => {
        const handleGlobalPauseKeyListener = (e) => {
            if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
                if (gameState === 'PLAY') { AudioEngine.playSFX('click'); setGameState('PAUSED'); }
                else if (gameState === 'PAUSED') { AudioEngine.playSFX('click'); setGameState('PLAY'); }
            }
        };
        window.addEventListener('keydown', handleGlobalPauseKeyListener);
        return () => window.removeEventListener('keydown', handleGlobalPauseKeyListener);
    }, [gameState]);

    // ==========================================
    // ⚙️ ANIMATION RUNTIME GAME PHYSICS LOOP
    // ==========================================
    useEffect(() => {
        if (gameState !== 'PLAY') return;

        const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
        const handleKey = (e, status) => { keysRef.current[e.key.toLowerCase()] = status; };
        const listenDown = (e) => handleKey(e, true); const listenUp = (e) => handleKey(e, false);
        window.addEventListener('keydown', listenDown); window.addEventListener('keyup', listenUp);

        const resizeCanvasBufferToViewport = () => {
            const container = canvas.parentElement; if (!container) return;
            canvas.width = container.clientWidth; canvas.height = container.clientHeight;
            logicalWidth = container.clientWidth; logicalHeight = container.clientHeight;
        };
        window.addEventListener('resize', resizeCanvasBufferToViewport); resizeCanvasBufferToViewport();

        const runEngineStep = (timestamp) => {
            if (!lastTimestamp.current) lastTimestamp.current = timestamp;
            let dt = timestamp - lastTimestamp.current; lastTimestamp.current = timestamp;
            if (dt > 100) dt = 16.66; const frameRatio = dt / 16.666;

            fpsRef.current.frameCount++; fpsRef.current.fpsTimer += dt;
            if (fpsRef.current.fpsTimer >= 1000) { fpsRef.current.currentFps = fpsRef.current.frameCount; fpsRef.current.frameCount = 0; fpsRef.current.fpsTimer -= 1000; }

            const p = playerRef.current;
            if (p.health <= 0) { setGameState('GAME_OVER'); compileFinalUpgradesReport(); return; }

            const bossActive = enemiesRef.current.some(e => e.type === 'boss');

            if (gameState === 'PLAY') {
                const metrics = gameMetrics.current;



                const activeTrailMods = TRAIL_MODIFIERS[equippedTrail] || { speed: 1.0, coin: 1.0 };
                const hasBlazeAbility = false;
                const hasFrostAbility = false;
                const hasLuckAbility = equippedAbility === 'ability_lucky_drop';

                const comboSpeedBuff = Math.min(1.3, 1 + (metrics.currentCombo * 0.01));
                p.speedMult = activeTrailMods.speed * comboSpeedBuff * (equippedAbility === 'ability_speed_boost' ? 1.05 : 1.0);
                if (p.flashTime > 0) p.flashTime -= frameRatio;
                if (metrics.screenShakeIntensity > 0) metrics.screenShakeIntensity -= 0.4 * frameRatio;

                metrics.accumTime += dt;
                if (metrics.accumTime >= 1000) {
                    metrics.accumTime -= 1000; metrics.clockSeconds++;
                    if (metrics.clockSeconds % 60 === 0) {
                        const calculated_payamt = Math.ceil(50 * activeTrailMods.coin);
                        metrics.coinsEarnedThisRun += calculated_payamt;
                        floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: `+${calculated_payamt} BONUS`, color: '#ffaa00', alpha: 1, scale: 1.2 });
                    }

                    // Dynamic Events Logic
                    if (mapStateRef.current.eventTimer > 0) {
                        mapStateRef.current.eventTimer -= 1;
                        if (mapStateRef.current.eventTimer <= 0) {
                            mapStateRef.current.currentEvent = null;
                        }
                    } else if (Math.random() < 0.005) { // periodic event
                        mapStateRef.current.currentEvent = DYNAMIC_EVENTS[Math.floor(Math.random() * DYNAMIC_EVENTS.length)];
                        mapStateRef.current.eventTimer = 900; // Event lasts 15 seconds (60fps)
                        floatingTextsRef.current.push({ x: p.x, y: p.y - 60, text: `EVENT: ${mapStateRef.current.currentEvent}`, color: '#ff00ff', alpha: 1, scale: 1.5 });
                    }

                    // Interactive Objects & NPCs Spawning
                    if (Math.random() < 0.005) {
                        const type = INTERACTIVE_OBJECTS[Math.floor(Math.random() * INTERACTIVE_OBJECTS.length)];
                        interactiveObjectsRef.current.push({
                            x: p.x + (Math.random() * 800 - 400),
                            y: p.y + (Math.random() * 800 - 400),
                            type: type,
                            r: 15,
                            active: true
                        });
                    }
                    if (Math.random() < 0.002) {
                        const type = NPC_TYPES[Math.floor(Math.random() * NPC_TYPES.length)];
                        npcsRef.current.push({
                            x: p.x + (Math.random() * 800 - 400),
                            y: p.y + (Math.random() * 800 - 400),
                            type: type,
                            r: 18,
                            active: true
                        });
                    }

                    // Interactive Objects Logic
                    interactiveObjectsRef.current.forEach(obj => {
                        if (obj.active && Math.hypot(p.x - obj.x, p.y - obj.y) < p.radius + obj.r + 10) {
                            obj.active = false;
                            AudioEngine.playSFX('powerup');
                            if (obj.type.includes('Chest') || obj.type.includes('Crate')) {
                                metrics.coinsEarnedThisRun += 200;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: `+200 COINS`, color: '#ffaa00', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Fountain')) {
                                p.health = p.maxHealth;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: `FULL HEAL`, color: '#ff0055', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Bounce Pad')) {
                                p.x += p.lastDir.x * 200; p.y += p.lastDir.y * 200;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "BOING!", color: '#00f0ff', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Speed Boost')) {
                                p.speedMult += 0.5;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "SPEED UP!", color: '#00ff66', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Explosive Barrel')) {
                                AudioEngine.playSFX('explosion');
                                if (cfgScreenShake) metrics.screenShakeIntensity = 15;
                                enemiesRef.current.forEach(e => {
                                    if (Math.hypot(e.x - obj.x, e.y - obj.y) < 150) {
                                        e.hp -= 20; e.flashTime = 5;
                                    }
                                });
                                floatingTextsRef.current.push({ x: obj.x, y: obj.y - 30, text: "BOOM!", color: '#ff4400', alpha: 1, scale: 1.5 });
                            } else if (obj.type.includes('Shield Generator')) {
                                upgradesRef.current.shield.lvl++;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "SHIELDS UP!", color: '#00aaff', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Turret')) {
                                AudioEngine.playSFX('shoot');
                                for (let i = 0; i < 8; i++) {
                                    projectilesRef.current.push({ x: obj.x, y: obj.y, vx: Math.cos(Math.PI/4 * i) * 15, vy: Math.sin(Math.PI/4 * i) * 15, radius: 6, laser: false, dead: false });
                                }
                                floatingTextsRef.current.push({ x: obj.x, y: obj.y - 30, text: "TURRET FIRED!", color: '#00ff66', alpha: 1, scale: 1.2 });
                            } else if (obj.type.includes('Teleporter') || obj.type.includes('Hidden Secret Room')) {
                                p.x += (Math.random() * 800 - 400); p.y += (Math.random() * 800 - 400);
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "WARPED!", color: '#9900ff', alpha: 1, scale: 1.2 });
                            } else {
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: obj.type.toUpperCase(), color: '#00f0ff', alpha: 1, scale: 1.0 });
                            }
                        }
                    });

                    // NPC Logic
                    npcsRef.current.forEach(npc => {
                        if (npc.active && Math.hypot(p.x - npc.x, p.y - npc.y) < p.radius + npc.r + 10) {
                            npc.active = false;
                            AudioEngine.playSFX('powerup');
                            if (npc.type === 'Merchant' || npc.type === 'Blacksmith') {
                                upgradesRef.current.attackSpeed.lvl++;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "WEAPON UPGRADED!", color: '#ffaa00', alpha: 1, scale: 1.2 });
                            } else if (npc.type === 'Medic' || npc.type === 'Survivor') {
                                p.health = Math.min(p.maxHealth, p.health + 40);
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "+40 HP", color: '#ff0055', alpha: 1, scale: 1.2 });
                            } else if (npc.type === 'Scientist' || npc.type === 'Mechanic') {
                                upgradesRef.current.laser.lvl++;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "LASER UPGRADED!", color: '#00ffff', alpha: 1, scale: 1.2 });
                            } else if (npc.type === 'Drone Assistant' || npc.type === 'Quest Giver') {
                                p.xp = p.xpNeeded;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: "WISDOM GAINED!", color: '#00ff66', alpha: 1, scale: 1.2 });
                            } else {
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 30, text: npc.type.toUpperCase() + " GREETS YOU!", color: '#00ff66', alpha: 1, scale: 1.0 });
                            }
                        }
                    });

                    interactiveObjectsRef.current = interactiveObjectsRef.current.filter(o => o.active);
                    npcsRef.current = npcsRef.current.filter(n => n.active);

                    // Environmental Hazards Mechanics
                    const currentMap = MAP_CONFIGS[mapStateRef.current.mapIndex];
                    if (currentMap.name === "Toxic Laboratory" || currentMap.name === "Alien Planet") {
                        if (Math.random() < 0.05) p.health = Math.max(0, p.health - 0.15 * frameRatio); // Ambient damage
                    } else if (currentMap.name === "Cyber Factory") {
                        p.x += 1.0 * frameRatio; // Conveyor belt pushes right
                    } else if (currentMap.name === "Sky Islands") {
                        p.x -= 0.5 * frameRatio; p.y -= 0.5 * frameRatio; // Wind pushes
                    } else if (currentMap.name === "Volcano Core") {
                        if (Math.random() < 0.01) { // Falling meteors
                            projectilesRef.current.push({ x: p.x + (Math.random()*400-200), y: p.y - 400, vx: 0, vy: 8, radius: 12, laser: false, dead: false, isEnemy: true });
                        }
                    } else if (currentMap.name === "Dark Dimension") {
                        if (Math.random() < 0.005) { // Random teleport
                            p.x += (Math.random() * 400 - 200); p.y += (Math.random() * 400 - 200);
                        }
                    }

                    const event = mapStateRef.current.currentEvent;
                    if (event === 'Thunderstorm' && Math.random() < 0.05) {
                         if (cfgScreenShake) metrics.screenShakeIntensity = 10;
                         if (Math.random() < 0.2) p.flashTime = 5; // Lightning flash
                    } else if (event === 'Toxic Gas Leak') {
                         p.health = Math.max(0, p.health - 0.05 * frameRatio);
                    } else if (event === 'Meteor Shower' && Math.random() < 0.02) {
                         projectilesRef.current.push({ x: p.x + (Math.random()*600-300), y: p.y - 400, vx: 0, vy: 10, radius: 15, laser: false, dead: false, isEnemy: true });
                    } else if (event === 'Heavy Rain' || event === 'Blizzard') {
                         // Rain/Snow particles
                         if (cfgParticles && Math.random() < 0.8) particlesRef.current.push({ x: p.x + (Math.random()*1000-500), y: p.y - 400, vx: (event === 'Blizzard' ? 5 : 2), vy: (event === 'Blizzard' ? 5 : 12), r: (event === 'Blizzard' ? 4 : 1), alpha: 0.6, color: (event === 'Blizzard' ? '#ffffff' : '#aaddff') });
                    } else if (event === 'Sandstorm') {
                         p.speedMult *= 0.8; // Slow down
                         if (cfgParticles && Math.random() < 0.8) particlesRef.current.push({ x: p.x - 500, y: p.y + (Math.random()*800-400), vx: 15, vy: 2, r: 3, alpha: 0.4, color: '#ffcc00' });
                    } else if (event === 'Solar Eclipse') {
                         // Screen gets darker (handled in render loop normally, but let's just do a small visual flash here or nothing mechanically)
                         if (Math.random() < 0.01) p.flashTime = 2;
                    } else if (event === 'Earthquake') {
                         if (cfgScreenShake) metrics.screenShakeIntensity = 8;
                         p.speedMult *= 0.7; // Hard to walk
                    } else if (event === 'Blackout') {
                         // Just mechanically, maybe weapons cool down slower
                         p.fireCooldown += 0.2 * frameRatio;
                    } else if (event === 'Alien Invasion' && Math.random() < 0.05) {
                         // Spawn extra enemies
                         enemiesRef.current.push({ x: p.x + (Math.random()*800-400), y: p.y - 500, type: 'drone', hp: 10, maxHp: 10, speed: 2, r: 12, color: '#aa00ff', shape: 'hex', dead: false, freezeFactor: 1.0, flashTime: 0 });
                    }

                    const min = Math.floor(metrics.clockSeconds / 60).toString().padStart(2, '0');
                    const sec = (metrics.clockSeconds % 60).toString().padStart(2, '0');
                    setHud(prev => ({ ...prev, time: `${min}:${sec}`, coins: activeCoinWallet + metrics.coinsEarnedThisRun }));
                }

                if (metrics.currentCombo > 0) {
                    if (!metrics.comboDecayTimer) metrics.comboDecayTimer = 0; metrics.comboDecayTimer += dt;
                    if (metrics.comboDecayTimer >= 2200) { metrics.currentCombo = 0; metrics.comboDecayTimer = 0; setHud(prev => ({ ...prev, combo: 0 })); }
                }

                let mx = 0, my = 0;
                if (keysRef.current['w'] || keysRef.current['arrowup']) my = -1;
                if (keysRef.current['s'] || keysRef.current['arrowdown']) my = 1;
                if (keysRef.current['a'] || keysRef.current['arrowleft']) mx = -1;
                if (keysRef.current['d'] || keysRef.current['arrowright']) mx = 1;

                if (mx !== 0 || my !== 0) {
                    const len = Math.hypot(mx, my); const nX = mx / len; const nY = my / len;

                    const mapConfig = MAP_CONFIGS[mapStateRef.current.mapIndex];
                    const mapSpeedMod = mapConfig.friction || 1.0;
                    p.x += nX * (p.baseSpeed * p.speedMult * mapSpeedMod) * frameRatio; p.y += nY * (p.baseSpeed * p.speedMult * mapSpeedMod) * frameRatio; p.lastDir = { x: nX, y: nY };
                    if (cfgParticles && Math.random() < 0.4) { particlesRef.current.push({ x: p.x, y: p.y, vx: -nX * 2, vy: -nY * 2, r: 2.5, alpha: 0.8, color: mapConfig.particleColor }); }

                } else if (touchVectorRef.current.x !== 0 || touchVectorRef.current.y !== 0) {
                    const tx = touchVectorRef.current.x; const ty = touchVectorRef.current.y;

                    const mapConfig = MAP_CONFIGS[mapStateRef.current.mapIndex];
                    const mapSpeedMod = mapConfig.friction || 1.0;
                    p.x += tx * (p.baseSpeed * p.speedMult * mapSpeedMod) * frameRatio; p.y += ty * (p.baseSpeed * p.speedMult * mapSpeedMod) * frameRatio;
                    const touchLen = Math.hypot(tx, ty);
                    if (touchLen > 0.1) { p.lastDir = { x: tx / touchLen, y: ty / touchLen }; if (cfgParticles && Math.random() < 0.4) { particlesRef.current.push({ x: p.x, y: p.y, vx: -(tx / touchLen) * 2, vy: -(ty / touchLen) * 2, r: 2.5, alpha: 0.8, color: mapConfig.particleColor }); } }

                }

                cameraRef.current.x = p.x - logicalWidth / 2; cameraRef.current.y = p.y - logicalHeight / 2;

                if (p.fireCooldown > 0) p.fireCooldown -= frameRatio;
                if (p.fireCooldown <= 0 && enemiesRef.current.length > 0) {
                    let target = null, minDist = Infinity; enemiesRef.current.forEach(e => { const d = Math.hypot(e.x - p.x, e.y - p.y); if (d < minDist) { minDist = d; target = e; } });
                    if (target && minDist < 500) {
                        const angle = Math.atan2(target.y - p.y, target.x - p.x); const projectileVelocitySpeed = hasBlazeAbility ? 14 : 9; const attackLvl = upgradesRef.current.attackSpeed.lvl; AudioEngine.playSFX('shoot');
                        if (attackLvl >= 4) {
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * projectileVelocitySpeed, vy: Math.sin(angle) * projectileVelocitySpeed, radius: 5, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle - 0.25) * projectileVelocitySpeed, vy: Math.sin(angle - 0.25) * projectileVelocitySpeed, radius: 4, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle + 0.25) * projectileVelocitySpeed, vy: Math.sin(angle + 0.25) * projectileVelocitySpeed, radius: 4, laser: false, dead: false });
                        } else { projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * projectileVelocitySpeed, vy: Math.sin(angle) * projectileVelocitySpeed, radius: 5, laser: false, dead: false }); }
                        p.fireCooldown = Math.max(5, (p.baseFireRate * (equippedAbility === 'ability_rapid_fire' ? 0.95 : 1.0)) * (1 - Math.min(0.75, attackLvl * 0.20)));
                    }
                }

                if (upgradesRef.current.laser.lvl > 0) {
                    p.laserCooldown -= frameRatio; if (p.laserCooldown <= 0) { const angle = Math.atan2(p.lastDir.y, p.lastDir.x); const laserLvl = upgradesRef.current.laser.lvl; projectilesRef.current.push({ x: p.x, y: p.y, angle: angle, width: laserLvl >= 4 ? 54 : 34, length: 1200, duration: laserLvl >= 4 ? 25 : 15, laser: true, dead: false }); p.laserCooldown = Math.max(70, 190 - laserLvl * 25); }
                }
                if (upgradesRef.current.shield.lvl > 0) { p.shieldAngle += (upgradesRef.current.shield.lvl >= 5 ? 0.09 : 0.04) * frameRatio; }

                const difficultyMod = 1 + metrics.bossesKilled * 0.5; const currentSec = metrics.clockSeconds;
                if (!metrics.tickTracker) metrics.tickTracker = 0; metrics.tickTracker += frameRatio;

                let spawnThreshold = currentSec > 120 ? 22 : (currentSec > 60 ? 35 : 48);
                if (metrics.tickTracker >= spawnThreshold && !bossActive) {
                    metrics.tickTracker = 0; const angle = Math.random() * Math.PI * 2; const sx = p.x + Math.cos(angle) * 540; const sy = p.y + Math.sin(angle) * 540;
                    let pool = ['drone', 'drone']; if (currentSec >= 30) pool.push('breacher', 'breacher'); if (currentSec >= 65) pool.push('hound'); if (currentSec >= 90) pool.push('sniper'); if (currentSec >= 110) pool.push('goliath');
                    const chosen = pool[Math.floor(Math.random() * pool.length)];
                    let enemyConfig = { x: sx, y: sy, type: chosen, dead: false, state: 'chase', timer: 0, freezeFactor: 1.0, flashTime: 0 };
                    if (chosen === 'drone') { enemyConfig.hp = Math.floor(1 * difficultyMod); enemyConfig.speed = 1.6; enemyConfig.r = 11; enemyConfig.color = '#ff0055'; enemyConfig.shape = 'sq'; }
                    if (chosen === 'breacher') { enemyConfig.hp = Math.floor(2 * difficultyMod); enemyConfig.speed = 3.2; enemyConfig.r = 10; enemyConfig.color = '#ffaa00'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'hound') { enemyConfig.hp = Math.floor(3 * difficultyMod); enemyConfig.speed = 2.4; enemyConfig.r = 12; enemyConfig.color = '#ff00aa'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'sniper') { enemyConfig.hp = Math.floor(4 * difficultyMod); enemyConfig.speed = 1.8; enemyConfig.r = 12; enemyConfig.color = '#00ff66'; enemyConfig.shape = 'pent'; }
                    if (chosen === 'goliath') { enemyConfig.hp = Math.floor(28 * difficultyMod); enemyConfig.speed = 0.7; enemyConfig.r = 24; enemyConfig.color = '#00f0ff'; enemyConfig.shape = 'oct'; }
                    enemyConfig.maxHp = enemyConfig.hp; enemiesRef.current.push(enemyConfig);
                }

                if (Math.floor(currentSec / 180) > metrics.bossesKilled) {
                    if (!bossSpawnedForCurrentMilestone.current && !bossActive) {
                        const bMaxHp = Math.floor(250 * (1 + metrics.bossesKilled * 0.75)); enemiesRef.current.push({ x: p.x, y: p.y - 400, type: 'boss', hp: bMaxHp, maxHp: bMaxHp, speed: 0.8, r: 42, color: '#9900ff', shape: 'oct', dead: false, bossActionTimer: 120, state: 'normal', dashVx: 0, dashVy: 0, freezeFactor: 1.0, flashTime: 0 });
                        bossSpawnedForCurrentMilestone.current = true; AudioEngine.playSFX('boss_spawn'); setBossHp({ current: bMaxHp, max: bMaxHp, active: true });
                        if (cfgScreenShake) metrics.screenShakeIntensity = 15;
                    }
                } else { bossSpawnedForCurrentMilestone.current = false; }

                enemiesRef.current.forEach(e => {

                    const mapConfig = MAP_CONFIGS[mapStateRef.current.mapIndex];
                    const distToPlayer = Math.hypot(p.y - e.y, p.x - e.x); const trueCalculatedSpeed = e.speed * e.freezeFactor * frameRatio * (mapConfig.enemySpeedMod || 1.0); if (e.flashTime > 0) e.flashTime -= frameRatio;

                    if (e.type === 'boss') {
                        e.bossActionTimer -= frameRatio; const isBossPhase2 = e.hp <= (e.maxHp * 0.5); const calculatedActionSpeedMultiplier = isBossPhase2 ? 1.45 : 1.0;
                        if (e.state === 'normal') {
                            const angle = Math.atan2(p.y - e.y, p.x - e.x); e.x += Math.cos(angle) * trueCalculatedSpeed * calculatedActionSpeedMultiplier; e.y += Math.sin(angle) * trueCalculatedSpeed * calculatedActionSpeedMultiplier;
                            if (e.bossActionTimer <= 0) {
                                e.bossActionTimer = (140 + Math.random() * 60) / calculatedActionSpeedMultiplier; const rollAction = Math.random();
                                if (rollAction < 0.35) { e.state = 'charge_dash'; e.timer = 30; } else if (rollAction < 0.70 && distToPlayer < 250) { e.state = 'slash_shock'; e.timer = 15; } else {
                                    for (let i = 0; i < (isBossPhase2 ? 7 : 4); i++) { enemiesRef.current.push({ x: e.x + Math.cos((Math.PI*2/4)*i)*60, y: e.y + Math.sin((Math.PI*2/4)*i)*60, type: 'drone', hp: Math.floor(1*difficultyMod), maxHp: Math.floor(1*difficultyMod), speed: 2.5, r: 9, color: isBossPhase2 ? '#ff0033' : '#a347ff', shape: 'sq', dead: false, freezeFactor: 1.0, flashTime: 0 }); }
                                }
                            }
                        } else if (e.state === 'charge_dash') { e.timer -= frameRatio; if (e.timer <= 0) { const angle = Math.atan2(p.y - e.y, p.x - e.x); e.dashVx = Math.cos(angle) * (isBossPhase2 ? 15 : 11); e.dashVy = Math.sin(angle) * (isBossPhase2 ? 15 : 11); e.state = 'dashing'; e.timer = 22; } } else if (e.state === 'dashing') { e.x += e.dashVx * e.freezeFactor * frameRatio; e.y += e.dashVy * e.freezeFactor * frameRatio; e.timer -= frameRatio; if (e.timer <= 0) e.state = 'normal'; } else if (e.state === 'slash_shock') { e.timer -= frameRatio; if (e.timer <= 0) { if (distToPlayer < (isBossPhase2 ? 180 : 140)) { p.health = Math.max(0, p.health - 35); p.flashTime = 5; AudioEngine.playSFX('damage'); if (cfgScreenShake) metrics.screenShakeIntensity = 12; } e.state = 'normal'; } }
                    } else {
                        const angle = Math.atan2(p.y - e.y, p.x - e.x);
                        if (e.type === 'breacher') {
                            if (e.state === 'chase') { e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed; if (distToPlayer < 40) { e.state = 'detonating'; e.timer = 18; } } else if (e.state === 'detonating') {
                                e.timer -= frameRatio; e.x += Math.cos(angle) * 0.5 * trueCalculatedSpeed; e.y += Math.sin(angle) * 0.5 * trueCalculatedSpeed;
                                if (e.timer <= 0) {
                                    e.hp = -10; AudioEngine.playSFX('explosion');
                                    if (distToPlayer < 75) {
                                        p.health = Math.max(0, p.health - 22); p.flashTime = 5; AudioEngine.playSFX('damage');
                                        if (cfgScreenShake) metrics.screenShakeIntensity = 8;
                                    }
                                }
                            }
                        } else if (e.type === 'sniper') {
                            if (distToPlayer > 250) {
                                e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed;
                            } else if (distToPlayer < 150) {
                                e.x -= Math.cos(angle) * trueCalculatedSpeed; e.y -= Math.sin(angle) * trueCalculatedSpeed;
                            }

                            e.timer -= frameRatio;
                            if (e.timer <= 0) {
                                projectilesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7, radius: 4, laser: false, dead: false, isEnemy: true });
                                e.timer = 120 + Math.random() * 60; // shoot every 2-3 seconds
                                AudioEngine.playSFX('shoot');
                            }
                        } else { e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed; }
                    }

                    if (distToPlayer < e.r + p.radius) { p.health = Math.max(0, p.health - (e.type === 'boss' ? (e.state === 'dashing' ? 2.5 : 1.4) : (e.type === 'goliath' ? 0.8 : 0.35)) * frameRatio); p.flashTime = 3; if (Math.random() < 0.08) AudioEngine.playSFX('damage'); }
                    if (upgradesRef.current.shield.lvl > 0) { const shields = Math.min(4, upgradesRef.current.shield.lvl); for (let i = 0; i < shields; i++) { const sa = p.shieldAngle + (i * (Math.PI * 2 / shields)); if (Math.hypot(e.x - (p.x + Math.cos(sa)*65), e.y - (p.y + Math.sin(sa)*65)) < e.r + 6) { e.hp -= (0.12 + (upgradesRef.current.shield.lvl * 0.04)) * frameRatio; e.flashTime = 3; if (hasFrostAbility) e.freezeFactor = 0.5; } } }
                });

                projectilesRef.current.forEach(proj => {
                    if (proj.laser) {
                        proj.duration -= frameRatio; enemiesRef.current.forEach(e => { let dx = e.x - proj.x, dy = e.y - proj.y; let dot = dx * Math.cos(proj.angle) + dy * Math.sin(proj.angle); if (dot > 0 && dot < proj.length && Math.hypot(e.x - (proj.x + Math.cos(proj.angle)*dot), e.y - (proj.y + Math.sin(proj.angle)*dot)) < e.r + proj.width/2) { e.hp -= 0.35 * frameRatio; e.flashTime = 2; if (hasFrostAbility) e.freezeFactor = 0.5; } }); if (proj.duration <= 0) proj.dead = true;
                    } else {
                        proj.x += proj.vx * frameRatio; proj.y += proj.vy * frameRatio;
                        if (proj.isEnemy) {
                            if (Math.hypot(proj.x - p.x, proj.y - p.y) < proj.radius + p.radius) {
                                proj.dead = true; p.health = Math.max(0, p.health - 12); p.flashTime = 5; AudioEngine.playSFX('damage');
                                if (cfgScreenShake) metrics.screenShakeIntensity = 8;
                            }
                        } else {
                            for (let e of enemiesRef.current) { if (Math.hypot(proj.x - e.x, proj.y - e.y) < proj.radius + e.r) { proj.dead = true; const dmg = equippedAbility === 'ability_bullet_power' ? 1.05 : 1; e.hp -= dmg; e.flashTime = 3; if (hasFrostAbility) e.freezeFactor = 0.5; floatingTextsRef.current.push({ x: e.x, y: e.y - 10, text: dmg.toString(), color: '#00f0ff', alpha: 1, scale: 0.9 }); AudioEngine.playSFX('hit'); break; } }
                        }
                        if (Math.hypot(proj.x - p.x, proj.y - p.y) > 900) proj.dead = true;
                    }
                });

                gemsRef.current.forEach(g => {
                    const d = Math.hypot(g.x - p.x, g.y - p.y);
                    if (g.attracted || d < p.pickupRadius) {
                        g.attracted = true; g.speed += 0.4 * frameRatio; g.x += Math.cos(Math.atan2(p.y - g.y, p.x - g.x)) * g.speed * frameRatio; g.y += Math.sin(Math.atan2(p.y - g.y, p.x - g.x)) * g.speed * frameRatio;
                        if (d < p.radius + 4) {
                            g.dead = true; AudioEngine.playSFX('powerup'); metrics.totalPowerupsThisRun++;
                            if (g.type === 'heart') { p.health = Math.min(p.maxHealth, p.health + 24); floatingTextsRef.current.push({ x: p.x, y: p.y - 20, text: "+25 HP", color: '#ff0055', alpha: 1, scale: 1.1 }); setHud(prev => ({ ...prev, health: p.health })); }
                            else if (g.type === 'nuke') {
                                enemiesRef.current.forEach(e => { if (e.type !== 'boss') { e.hp = -10; } });
                                if (cfgScreenShake) metrics.screenShakeIntensity = 20;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 20, text: "NUKE!", color: '#ff0000', alpha: 1, scale: 1.5 });
                                AudioEngine.playSFX('explosion');
                            }
                            else if (g.type === 'upgrade') {
                                const upgradeKeys = Object.keys(upgradesRef.current);
                                const randomKey = upgradeKeys[Math.floor(Math.random() * upgradeKeys.length)];
                                upgradesRef.current[randomKey].lvl++;
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 20, text: "SKILL UP!", color: '#ffff00', alpha: 1, scale: 1.3 });
                            }
                            else if (g.type === 'arrows') {
                                for (let i = 0; i < 12; i++) {
                                    const angle = (Math.PI * 2 / 12) * i;
                                    projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7, radius: 4, damage: 25, isEnemy: false, dead: false });
                                }
                                floatingTextsRef.current.push({ x: p.x, y: p.y - 20, text: "ARROW NOVA!", color: '#ffaa00', alpha: 1, scale: 1.3 });
                                AudioEngine.playSFX('shoot');
                            }
                            else {
                                const computationalXPMult = hasLuckAbility ? 2 : 1;
                                const xpBoostMult = 1 + (upgradesRef.current.xpBoost.lvl * 0.5);
                                p.xp = Math.min(p.xpNeeded, p.xp + (g.val * computationalXPMult * xpBoostMult));
                                if (p.xp >= p.xpNeeded) { p.xp -= p.xpNeeded; p.level++; p.xpNeeded = Math.floor(p.xpNeeded * 1.45) + 8; setGameState('LEVEL_UP'); setCards(Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.id !== 'magnet' || u.lvl < 6).sort(() => Math.random() - 0.5).slice(0, 3)); }
                                setHud(prev => ({ ...prev, level: p.level, xp: p.xp, xpNeeded: p.xpNeeded }));
                            }
                        }
                    }
                });

                enemiesRef.current.forEach(e => {
                    if (e.hp <= 0) {
                        e.dead = true; if (e.hp !== -10) { metrics.killCounter++; metrics.currentCombo++; metrics.comboDecayTimer = 0; if (metrics.currentCombo > metrics.highestComboThisRun) metrics.highestComboThisRun = metrics.currentCombo; }
                        if (e.hp !== -10) {
                            let baseValueCollected = 0; if (e.type === 'drone') baseValueCollected = 5; else if (e.type === 'breacher') baseValueCollected = 10; else if (e.type === 'hound') baseValueCollected = 10; else if (e.type === 'sniper') baseValueCollected = 12; else if (e.type === 'goliath') baseValueCollected = 15; else if (e.type === 'boss') baseValueCollected = 100;
                            const comboCoinMultiplier = 1 + (metrics.currentCombo * 0.05);
                            const finalCalculatedCoins = Math.ceil(baseValueCollected * activeTrailMods.coin * comboCoinMultiplier); metrics.coinsEarnedThisRun += finalCalculatedCoins;
                            floatingTextsRef.current.push({ x: e.x, y: e.y - 20, text: `+${finalCalculatedCoins}`, color: '#ffaa00', alpha: 1, scale: 1.1 });
                        }
                        setHud(prev => ({ ...prev, kills: metrics.killCounter, coins: activeCoinWallet + metrics.coinsEarnedThisRun, combo: metrics.currentCombo }));
                        if (e.type === 'boss') { setBossHp({ current: 0, max: 250, active: false }); metrics.bossesKilled++; if (cfgScreenShake) metrics.screenShakeIntensity = 20; AudioEngine.playSFX('boss_death'); gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false }); for (let i=0; i<15; i++) gemsRef.current.push({ x: e.x+(Math.random()*80-40), y: e.y+(Math.random()*80-40), val: 6, speed: 1, attracted: false, dead: false }); } else if (e.hp !== -10) { AudioEngine.playSFX('death'); }
                        for (let i = 0; i < (e.type === 'boss' ? 50 : 10); i++) { particlesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(Math.random()*Math.PI*2)*3, vy: Math.sin(Math.random()*Math.PI*2)*3, r: Math.random()*2.5+1, alpha: 1, color: e.color }); }
                        if (e.type !== 'boss' && e.hp !== -10) {
                            if (e.type === 'goliath' || (e.type === 'hound' && Math.random() < 0.12)) gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false });
                            for (let i=0; i<(e.type==='goliath'?12:3); i++) gemsRef.current.push({ x: e.x+(Math.random()*14-7), y: e.y+(Math.random()*14-7), val: e.type==='goliath'?2:1, speed: 1, attracted: false, dead: false });
                            const randSpec = Math.random();
                            if (randSpec < 0.01) { gemsRef.current.push({ x: e.x, y: e.y, type: 'nuke', speed: 1, attracted: false, dead: false }); }
                            else if (randSpec < 0.03) { gemsRef.current.push({ x: e.x, y: e.y, type: 'upgrade', speed: 1, attracted: false, dead: false }); }
                            else if (randSpec < 0.07) { gemsRef.current.push({ x: e.x, y: e.y, type: 'arrows', speed: 1, attracted: false, dead: false }); }
                        }
                    }
                });

                enemiesRef.current = enemiesRef.current.filter(e => !e.dead); projectilesRef.current = projectilesRef.current.filter(p => !p.dead); gemsRef.current = gemsRef.current.filter(g => !g.dead);
                particlesRef.current.forEach(pt => { pt.x += pt.vx * frameRatio; pt.y += pt.vy * frameRatio; pt.alpha -= 0.025 * frameRatio; }); particlesRef.current = particlesRef.current.filter(pt => pt.alpha > 0);
                floatingTextsRef.current.forEach(ft => { ft.y -= 1.2 * frameRatio; ft.alpha -= 0.03 * frameRatio; }); floatingTextsRef.current = floatingTextsRef.current.filter(ft => ft.alpha > 0);

                setHud(prev => prev.health === p.health ? prev : ({ ...prev, health: p.health }));
                const activeBoss = enemiesRef.current.find(e => e.type === 'boss');
                if (activeBoss) {
                    setBossHp(prev => prev.current === activeBoss.hp ? prev : ({ ...prev, current: activeBoss.hp }));
                }
            }

            // --- CANVAS RENDERING (HYBRID HARDENED STRUCT DESIGN) ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scaleX = canvas.width / logicalWidth; const scaleY = canvas.height / logicalHeight;
            ctx.save();
            if (cfgScreenShake && gameMetrics.current.screenShakeIntensity > 0) { ctx.translate((Math.random() - 0.5) * gameMetrics.current.screenShakeIntensity, (Math.random() - 0.5) * gameMetrics.current.screenShakeIntensity); }
            ctx.scale(scaleX, scaleY); const cx = cameraRef.current.x, cy = cameraRef.current.y;


            // Map Grid Layout Systems
            ctx.save();
            const currentMapConfig = MAP_CONFIGS[mapStateRef.current.mapIndex];

            const bgGradient = ctx.createLinearGradient(0, 0, 0, logicalHeight);
            bgGradient.addColorStop(0, currentMapConfig.bgTop);
            bgGradient.addColorStop(1, currentMapConfig.bgBottom);
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);

            ctx.strokeStyle = cfgHighContrast ? '#22223b' : '#121226'; ctx.lineWidth = 1;
            for (let x = -(cx % 50); x < logicalWidth; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, logicalHeight); ctx.stroke(); }
            for (let y = -(cy % 50); y < logicalHeight; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(logicalWidth, y); ctx.stroke(); }
            ctx.restore();

            // Render Map Decorations (Specific to map theme)
            ctx.save();
            ctx.globalAlpha = 0.5;
            for (let i=0; i<15; i++) {
                let decX = ((i*150 - cx * 0.5) % 800 + 800) % 800;
                let decY = ((i*100 - cy * 0.5) % 600 + 600) % 600;

                if (currentMapConfig.name.includes("Neon City")) {
                    ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#ff0055';
                    ctx.fillRect(decX, decY, 15, 60); // Building/billboard
                } else if (currentMapConfig.name.includes("Desert") || currentMapConfig.name.includes("Volcano")) {
                    ctx.fillStyle = currentMapConfig.name.includes("Desert") ? '#ffaa00' : '#ff4400';
                    ctx.beginPath(); ctx.arc(decX, decY, 20, 0, Math.PI); ctx.fill(); // Rock/Dune
                } else if (currentMapConfig.name.includes("Frozen") || currentMapConfig.name.includes("Temple") || currentMapConfig.name.includes("Graveyard") || currentMapConfig.name.includes("Alien")) {
                    ctx.fillStyle = currentMapConfig.particleColor;
                    ctx.beginPath(); ctx.moveTo(decX, decY); ctx.lineTo(decX-10, decY+30); ctx.lineTo(decX+10, decY+30); ctx.fill(); // Tree/Crystal/Spire
                } else {
                    ctx.fillStyle = currentMapConfig.particleColor;
                    ctx.fillRect(decX, decY, 30, 30); // Generic crate/equipment
                }
            }
            ctx.restore();

            // Render Interactive Objects & NPCs
            interactiveObjectsRef.current.forEach(obj => {
                ctx.save();
                ctx.shadowBlur = cfgHighContrast ? 0 : 10;
                ctx.fillStyle = obj.type.includes('Chest') ? '#ffaa00' : (obj.type.includes('Fountain') || obj.type.includes('Medic') ? '#ff0055' : '#00f0ff');
                ctx.shadowColor = ctx.fillStyle;

                if (obj.type.includes('Barrel')) {
                    ctx.fillStyle = '#ff4400'; ctx.shadowColor = ctx.fillStyle;
                    ctx.fillRect(obj.x - obj.r - cx, obj.y - obj.r - cy, obj.r*2, obj.r*2);
                } else if (obj.type.includes('Pad') || obj.type.includes('Zone')) {
                    ctx.fillStyle = '#00ff66'; ctx.shadowColor = ctx.fillStyle;
                    ctx.beginPath(); ctx.moveTo(obj.x - cx, obj.y - obj.r - cy); ctx.lineTo(obj.x + obj.r - cx, obj.y + obj.r - cy); ctx.lineTo(obj.x - obj.r - cx, obj.y + obj.r - cy); ctx.fill();
                } else {
                    ctx.beginPath(); ctx.arc(obj.x - cx, obj.y - cy, obj.r, 0, Math.PI*2); ctx.fill();
                }

                ctx.fillStyle = '#000'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                const initial = obj.type.substring(0, 2).toUpperCase();
                ctx.fillText(initial, obj.x - cx, obj.y - cy);
                ctx.restore();
            });

            npcsRef.current.forEach(npc => {
                ctx.save();
                ctx.fillStyle = '#00ff66';
                ctx.shadowBlur = cfgHighContrast ? 0 : 15; ctx.shadowColor = ctx.fillStyle;
                ctx.beginPath(); ctx.arc(npc.x - cx, npc.y - cy, npc.r, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(npc.x - cx, npc.y - cy, npc.r - 4, 0, Math.PI*2); ctx.fill();

                ctx.fillStyle = '#000'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText("NPC", npc.x - cx, npc.y - cy);
                ctx.restore();
            });


            // Render Modules
            gemsRef.current.forEach(g => { ctx.save();
                if (g.type === 'nuke') { ctx.fillStyle = '#ff0000'; }
                else if (g.type === 'upgrade') { ctx.fillStyle = '#ffff00'; }
                else if (g.type === 'arrows') { ctx.fillStyle = '#ffaa00'; }
                else { ctx.fillStyle = g.type === 'heart' ? '#ff0055' : (g.val > 1 ? '#00ffff' : '#00ff66'); }
                ctx.shadowBlur = cfgHighContrast ? 0 : 8; ctx.shadowColor = ctx.fillStyle; ctx.beginPath();
                let radius = 3.5;
                if (g.type === 'heart') radius = 6;
                else if (g.type === 'nuke' || g.type === 'upgrade' || g.type === 'arrows') radius = 5;
                ctx.arc(g.x - cx, g.y - cy, radius, 0, Math.PI*2); ctx.fill(); ctx.restore();
            });
            projectilesRef.current.forEach(pItem => { ctx.save(); ctx.shadowBlur = cfgHighContrast ? 0 : 10; ctx.shadowColor = pItem.laser ? '#9900ff' : (pItem.isEnemy ? '#00ff66' : '#00f0ff'); if (pItem.laser) { ctx.strokeStyle = '#9900ff'; ctx.lineWidth = pItem.width * (pItem.duration / 20); ctx.beginPath(); ctx.moveTo(pItem.x - cx, pItem.y - cy); ctx.lineTo((pItem.x + Math.cos(pItem.angle)*pItem.length) - cx, (pItem.y + Math.sin(pItem.angle)*pItem.length) - cy); ctx.stroke(); } else { ctx.fillStyle = pItem.isEnemy ? '#00ff66' : '#00f0ff'; ctx.beginPath(); ctx.arc(pItem.x - cx, pItem.y - cy, pItem.radius, 0, Math.PI*2); ctx.fill(); } ctx.restore(); });
            enemiesRef.current.forEach(e => { ctx.save(); ctx.shadowBlur = cfgHighContrast ? 0 : 8; ctx.shadowColor = e.color; ctx.strokeStyle = e.color; ctx.fillStyle = e.flashTime > 0 ? '#ffffff' : (e.type==='breacher'&&e.state==='detonating'&&(Math.floor(performance.now()/50)%2===0)?'#ff0000':'#030307'); ctx.lineWidth = 2; ctx.beginPath(); if (e.shape === 'sq') { ctx.strokeRect(e.x - e.r - cx, e.y - e.r - cy, e.r*2, e.r*2); ctx.fillRect(e.x - e.r - cx, e.y - e.r - cy, e.r*2, e.r*2); } else if (e.shape === 'tri') { ctx.moveTo(e.x - cx, e.y - e.r - cy); ctx.lineTo(e.x + e.r - cx, e.y + e.r - cy); ctx.lineTo(e.x - e.r - cx, e.y + e.r - cy); ctx.closePath(); ctx.fill(); ctx.stroke(); } else if (e.shape === 'pent') { for (let i = 0; i < 5; i++) { let a = (Math.PI*2/5)*i - Math.PI/2; ctx.lineTo(e.x + Math.cos(a)*e.r - cx, e.y + Math.sin(a)*e.r - cy); } ctx.closePath(); ctx.fill(); ctx.stroke(); } else { for (let i=0; i<8; i++) { let a = (Math.PI*2/8)*i - Math.PI/2; ctx.lineTo(e.x + Math.cos(a)*e.r - cx, e.y + Math.sin(a)*e.r - cy); } ctx.closePath(); ctx.fill(); ctx.stroke(); } ctx.restore(); });
            if (cfgParticles) { particlesRef.current.forEach(pt => { ctx.save(); ctx.globalAlpha = pt.alpha; ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(pt.x - cx, pt.y - cy, pt.r, 0, Math.PI*2); ctx.fill(); ctx.restore(); }); }

            // --- HYBRID CHASSIS VECTOR/TEXT RENDERING CHANNEL ---
            const activeProfileConfig = MASTER_SHOP_CATALOG.shapes.find(s => s.id === equippedShape) || MASTER_SHOP_CATALOG.shapes[0];
            ctx.save();
            ctx.translate(p.x - cx, p.y - cy);
            ctx.rotate(Math.atan2(p.lastDir.y, p.lastDir.x));

            if (activeProfileConfig.shape === 'char') {
                // High Tier Anomalous Skins: Renders Explicit String Fonts (Emojis)
                ctx.font = '36px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(activeProfileConfig.emoji || '📐', 0, 0);
            } else {
                // Baseline Geometric Hulls: Renders Glowing Path Vectors
                ctx.shadowBlur = cfgHighContrast ? 0 : 14; ctx.shadowColor = activeProfileConfig.color; ctx.strokeStyle = activeProfileConfig.color; ctx.fillStyle = p.flashTime > 0 ? '#ffffff' : '#030307'; ctx.lineWidth = 3;
                ctx.beginPath();
                if (activeProfileConfig.shape === 'sq') {
                    ctx.rect(-12, -12, 24, 24);
                } else if (activeProfileConfig.shape === 'pent') {
                    for (let i = 0; i < 5; i++) { ctx.lineTo(15 * Math.cos((Math.PI*2/5)*i), 15 * Math.sin((Math.PI*2/5)*i)); }
                } else if (activeProfileConfig.shape === 'hex') {
                    for (let i = 0; i < 6; i++) { ctx.lineTo(15 * Math.cos((Math.PI*2/6)*i), 15 * Math.sin((Math.PI*2/6)*i)); }
                } else if (activeProfileConfig.shape === 'oct') {
                    for (let i = 0; i < 8; i++) { ctx.lineTo(16 * Math.cos((Math.PI*2/8)*i), 16 * Math.sin((Math.PI*2/8)*i)); }
                } else {
                    ctx.moveTo(16, 0); ctx.lineTo(-12, -13); ctx.lineTo(-6, 0); ctx.lineTo(-12, 13);
                }
                ctx.closePath(); ctx.fill(); ctx.stroke();
            }
            ctx.restore();

            if (upgradesRef.current.shield.lvl > 0) { ctx.save(); ctx.shadowBlur = cfgHighContrast ? 0 : 8; ctx.shadowColor = '#00ff66'; ctx.fillStyle = '#00ff66'; for (let i=0; i<Math.min(4, upgradesRef.current.shield.lvl); i++) { ctx.beginPath(); ctx.arc((p.x + Math.cos(p.shieldAngle + (i*(Math.PI*2/Math.min(4, upgradesRef.current.shield.lvl))))*65) - cx, (p.y + Math.sin(p.shieldAngle + (i*(Math.PI*2/Math.min(4, upgradesRef.current.shield.lvl))))*65) - cy, 5.5, 0, Math.PI*2); ctx.fill(); } ctx.restore(); }
            floatingTextsRef.current.forEach(ft => { ctx.save(); ctx.globalAlpha = ft.alpha; ctx.fillStyle = ft.color; ctx.font = `bold ${Math.floor(13 * (ft.scale ?? 1))}px Courier New`; ctx.textAlign = 'center'; ctx.fillText(ft.text, ft.x - cx, ft.y - cy); ctx.restore(); });


            if (mapStateRef.current.showBanner) {
                ctx.save();
                let fadeAlpha = 1.0 - Math.abs(mapStateRef.current.bannerTimer - 90) / 90;
                fadeAlpha = Math.max(0, Math.min(1, fadeAlpha)); // Clamp
                ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
                ctx.fillRect(0, 0, logicalWidth, logicalHeight);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, logicalHeight / 2 - 40, logicalWidth, 80);
                ctx.fillStyle = '#00f0ff';
                ctx.font = 'bold 32px Courier New';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const textAlpha = Math.min(1, mapStateRef.current.bannerTimer / 30);
                ctx.globalAlpha = textAlpha;
                const nextMapIndex = Math.min(MAP_CONFIGS.length - 1, mapStateRef.current.mapIndex + (mapStateRef.current.bannerTimer > 90 ? 1 : 0));
                ctx.fillText("SECTOR UPDATE: " + MAP_CONFIGS[nextMapIndex].name, logicalWidth / 2, logicalHeight / 2);
                ctx.restore();
            }


            if (cfgFpsCounter) { ctx.save(); ctx.fillStyle = '#00ff66'; ctx.font = '11px monospace'; ctx.fillText(`FPS: ${fpsRef.current.currentFps}`, 20, logicalHeight - 40); ctx.restore(); }
            ctx.restore();

            if (gameState === 'PLAY') cancelEngineId.current = requestAnimationFrame(runEngineStep);
        };
        cancelEngineId.current = requestAnimationFrame(runEngineStep);
        return () => { cancelAnimationFrame(cancelEngineId.current); AudioEngine.stopMusic(); window.removeEventListener('keydown', listenDown); window.removeEventListener('keyup', listenUp); window.removeEventListener('resize', resizeCanvasBufferToViewport); };
    }, [gameState, activeCoinWallet, equippedShape, equippedAbility, equippedTrail, cfgScreenShake, cfgParticles, cfgFpsCounter, cfgHighContrast]);

    // Touch and upgrade configuration map inputs
    const handleTouchMove = (e) => { if (gameState !== 'PLAY') return; const touch = e.touches[0]; const base = e.currentTarget.getBoundingClientRect(); const totalDistance = Math.hypot(touch.clientX - (base.left + base.width/2), touch.clientY - (base.top + base.height/2)); let fX = touch.clientX - (base.left + base.width/2); let fY = touch.clientY - (base.top + base.height/2); if (totalDistance > 40) { fX = (fX/totalDistance)*40; fY = (fY/totalDistance)*40; } if (knobRef.current) knobRef.current.style.transform = `translate(${fX}px, ${fY}px)`; touchVectorRef.current = { x: fX/40, y: fY/40 }; };
    const handleTouchEnd = () => { touchVectorRef.current = { x: 0, y: 0 }; if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)'; };
    const applyModifierCard = (id) => { if (isSelectionLocked.current) return; isSelectionLocked.current = true; AudioEngine.playSFX('powerup'); upgradesRef.current[id].lvl++; if (id === 'speed') playerRef.current.speedMult += 0.15; if (id === 'magnet') playerRef.current.pickupRadius = playerRef.current.basePickupRadius + (upgradesRef.current.magnet.lvl * 60); setGameState('PLAY'); setTimeout(() => { isSelectionLocked.current = false; }, 200); };

    // ==========================================
    // 🧱 HOISTED LAYOUT VIEW DECK SUB-ROUTINES
    // ==========================================
    function renderAuthFormStructure() {
        return React.createElement("form", { key: "auth-form", className: "auth-form-wrapper", onSubmit: handleAuthenticationAction },
            React.createElement("div", { style: { fontSize: '13px', color: '#ff0055', textAlign: 'center', fontWeight: 'bold', marginBottom: '4px' } }, isSignUp ? "// CONFIG NEW PROFILE USERNAME" : "// CHASSIS SECURITY ACCESS REQUIRED"),
            isSignUp && React.createElement("input", { type: "text", className: "auth-row-input", placeholder: "CHOOSE AGENT USERNAME (MAX 10)", maxLength: 10, required: true, value: username, onChange: (e) => setUsername(e.target.value.toUpperCase().replace(/\s+/g, '')) }),
            React.createElement("input", { type: "email", className: "auth-row-input", placeholder: "AGENT EMAIL ACCESS PORT", required: true, value: email, onChange: (e) => setEmail(e.target.value) }),
            React.createElement("input", { type: "password", className: "auth-row-input", placeholder: "CYBER KEY PASSWORD", required: true, value: password, onChange: (e) => setPassword(e.target.value) }),
            dbError && React.createElement("div", { style: { color: '#ff0055', fontSize: '11px', textAlign: 'center' } }, dbError),
            React.createElement("button", { type: "submit", className: "neon-btn", disabled: dbLoading }, dbLoading ? "PROCESSING MATRIX..." : (isSignUp ? "GENERATE PROFILE" : "ESTABLISH SESSION")),
            React.createElement("div", { className: "auth-toggle-link", onClick: () => { AudioEngine.playSFX('click'); setIsSignUp(!isSignUp); setDbError(null); } }, isSignUp ? "Already registered? Load existing session" : "New Agent? Create custom profile blueprint")
        );
    }

    function renderMapsDashboard() {
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-blue" }, "SECTOR MAP DIRECTORY"),
            React.createElement("div", { className: "quest-dashboard-wrapper", style: { overflowY: 'auto' } },
                MAP_CONFIGS.map((mapInfo, idx) => {
                    const isUnlocked = idx === 0 || (lifetimeStats.map_survival_times && lifetimeStats.map_survival_times[idx - 1] >= 1800);
                    return React.createElement("div", { key: idx, className: "progression-card-strip", style: { borderColor: isUnlocked ? mapInfo.particleColor : '#555', background: 'rgba(0,0,0,0.5)' } },
                        React.createElement("div", { className: "progression-meta-zone" },
                            React.createElement("span", { className: "progression-item-title", style: { color: isUnlocked ? mapInfo.particleColor : '#555', fontSize: '14px' } }, `>> ${mapInfo.name}`),
                            React.createElement("span", { className: "progression-item-desc", style: { fontSize: '12px', color: isUnlocked ? '#fff' : '#555' } }, isUnlocked ? mapInfo.theme : "LOCKED - SURVIVE 30M IN PREVIOUS SECTOR")
                        ),
                        isUnlocked ? React.createElement("button", { className: "neon-btn", style: { padding: '4px 10px', fontSize: '10px', borderColor: selectedMapIndex === idx ? '#00ff66' : mapInfo.particleColor, color: selectedMapIndex === idx ? '#00ff66' : mapInfo.particleColor }, onClick: () => { AudioEngine.playSFX('click'); setSelectedMapIndex(idx); setShowMaps(false); } }, selectedMapIndex === idx ? "SELECTED" : "SELECT") : null
                    );
                })
            ),
            React.createElement("button", { className: "neon-btn", style: { marginTop: '20px', borderColor: '#00f0ff', color: '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setShowMaps(false); } }, "RETURN TO TERMINAL")
        );
    }

    function renderAudioSettingsMenu() {
        return React.createElement("div", { key: "audio-panel", className: "audio-settings-panel" },
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "MASTER VOLUME CORE:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: mVolume, onChange: (e) => setMVol(Number(e.target.value)) })),
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "MUSIC SYNTH VOLUME:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: musVolume, onChange: (e) => setMusVol(Number(e.target.value)) })),
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "SFX MATRIX ENVELOPE:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: sfxVolume, onChange: (e) => setSfxVol(Number(e.target.value)) })),
            React.createElement("button", { className: "neon-btn", style: { marginTop: "6px", padding: "4px 10px", fontSize: "11px", borderColor: muteActive ? "#ff0055" : "#00f0ff", color: muteActive ? "#ff0055" : "#00f0ff" }, onClick: () => { AudioEngine.playSFX('click'); setMuteActive(!muteActive); } }, muteActive ? "MUTED // CLICK TO UNMUTE" : "MUTE ACOUSTIC CORES")
        );
    }

    function renderLeaderboardStructure() {
        return React.createElement("div", { key: "leaderboard-root", style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            React.createElement("h3", { style: { color: '#00f0ff', margin: '10px 0 5px 0' } }, "// TOP SIMULATION RECORDS"),
            dbError ? React.createElement("div", { style: { fontSize: '12px', color: '#ff0055', fontWeight: 'bold' } }, `>> ${dbError.toUpperCase()}`) :
            dbLoading && leaderboard.length === 0 ? React.createElement("div", { style: { fontSize: '12px', color: '#00f0ff' } }, "FETCHING REALTIME CLOUD CHANNELS...") :
            React.createElement("table", { className: "leaderboard-table" },
                React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "AGENT"), React.createElement("th", null, "ELIMINATIONS"), React.createElement("th", null, "DURATION"))),
                React.createElement("tbody", null, leaderboard.map((row, index) => React.createElement("tr", { key: index, style: { color: index === 0 ? '#00ff66' : '#fff' } }, React.createElement("td", null, row.player_name), React.createElement("td", null, row.kills), React.createElement("td", null, row.survival_time))))
            )
        );
    }

    function renderTerminalShopStructure() {
        const itemsList = MASTER_SHOP_CATALOG[activeShopTab] || [];
        return React.createElement("div", { key: "arcade-shop", style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' } },
            React.createElement("div", { className: "shop-toggle-container" },
                ['shapes', 'abilities', 'trails'].map(tab => React.createElement("button", { key: tab, className: "neon-btn", style: { padding: '4px 12px', fontSize: '11px', borderColor: activeShopTab === tab ? '#00ff66' : '#00f0ff', color: activeShopTab === tab ? '#00ff66' : '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setActiveShopTab(tab); } }, tab.toUpperCase()))
            ),
            React.createElement("div", { className: "shop-grid-container" },
                itemsList.map(item => {
                    const isOwned = unlockedInventory.includes(item.id); const isEquipped = equippedShape === item.id || equippedAbility === item.id || equippedTrail === item.id;
                    return React.createElement("div", { key: item.id, className: `shop-catalog-card ${isEquipped ? 'active-equipped' : ''}` },
                        React.createElement("div", { className: "item-title-text" }, item.name), React.createElement("div", { className: "item-bonus-desc" }, item.desc),
                        React.createElement("button", { className: `shop-action-btn ${isOwned ? 'equip-mode' : ''}`, disabled: dbLoading || (!isOwned && activeCoinWallet < item.cost), onClick: () => handleShopTransaction(item) }, isEquipped ? "EQUIPPED" : (isOwned ? "EQUIP" : `${item.cost} COINS`))
                    );
                })
            )
        );
    }

    function renderConfigurationDashboard() {
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-blue" }, "SYSTEM SETTINGS MATRIX"),
            renderAudioSettingsMenu(),
            React.createElement("div", { className: "audio-settings-panel", style: { borderStyle: 'solid' } },
                React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "SCREEN SHAKE ENGINE:"), React.createElement("button", { className: "neon-btn", style: { padding: '3px 10px', fontSize: '11px' }, onClick: () => { AudioEngine.playSFX('click'); setCfgScreenShake(!cfgScreenShake); saveSettingsToCloud(!cfgScreenShake, cfgParticles, cfgFpsCounter, cfgHighContrast); } }, cfgScreenShake ? "ENABLED" : "DISABLED")),
                React.createElement("div", { className: "volume-row", style: { marginTop: '8px' } }, React.createElement("span", null, "PARTICLE SIMULATIONS:"), React.createElement("button", { className: "neon-btn", style: { padding: '3px 10px', fontSize: '11px' }, onClick: () => { AudioEngine.playSFX('click'); setCfgParticles(!cfgParticles); saveSettingsToCloud(cfgScreenShake, !cfgParticles, cfgFpsCounter, cfgHighContrast); } }, cfgParticles ? "ENABLED" : "DISABLED")),
                React.createElement("div", { className: "volume-row", style: { marginTop: '8px' } }, React.createElement("span", null, "FPS DIAGNOSTICS LAYER:"), React.createElement("button", { className: "neon-btn", style: { padding: '3px 10px', fontSize: '11px' }, onClick: () => { AudioEngine.playSFX('click'); setCfgFpsCounter(!cfgFpsCounter); saveSettingsToCloud(cfgScreenShake, cfgParticles, !cfgFpsCounter, cfgHighContrast); } }, cfgFpsCounter ? "ON" : "OFF")),
                React.createElement("div", { className: "volume-row", style: { marginTop: '8px' } }, React.createElement("span", null, "ACCESSIBILITY CONTRAST:"), React.createElement("button", { className: "neon-btn", style: { padding: '3px 10px', fontSize: '11px' }, onClick: () => { AudioEngine.playSFX('click'); setCfgHighContrast(!cfgHighContrast); saveSettingsToCloud(cfgScreenShake, cfgParticles, cfgFpsCounter, !cfgHighContrast); } }, cfgHighContrast ? "HIGH CONTRAST" : "STANDARD CORES"))
            ),
            React.createElement("button", { className: "neon-btn", style: { borderColor: '#ff0055', color: '#ff0055', marginTop: '10px' }, disabled: dbLoading, onClick: handleResetProgressAction }, "RESET PROFILE PROGRESS"),
            React.createElement("button", { className: "neon-btn", style: { marginTop: '12px' }, onClick: () => { AudioEngine.playSFX('click'); setShowSettings(false); } }, "SAVE AND EXIT")
        );
    }

    function renderLifetimeStatisticsDashboard() {
        const calculateAverageTime = () => { if (!lifetimeStats.games_played) return "0s"; return `${Math.floor((lifetimeStats.total_survival_seconds ?? 0) / lifetimeStats.games_played)}s`; };
        const activeProfileConfig = MASTER_SHOP_CATALOG.shapes.find(s => s.id === equippedShape) || MASTER_SHOP_CATALOG.shapes[0];
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-gold" }, "LIFETIME TELEMETRY STATISTICS"),
            React.createElement("div", { className: "stats-display-grid" },
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "GAMES PLAYED:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.games_played ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "TOTAL ELIMINATIONS:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.total_kills ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "BOSSES DEFEATED:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.bosses_defeated ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "CONFIRMED DEATHS:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.deaths ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "TOTAL COINS MINED:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.total_coins_earned ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "MARKET COINS SPENT:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.coins_spent ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "HIGHEST SINGLE PURGE:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.highest_kill_count ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "MAX SURVIVAL CLOCK:"), React.createElement("span", { className: "stats-cell-value" }, `${lifetimeStats.longest_survival_time ?? 0}s`)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "AVERAGE SURVIVAL TIME:"), React.createElement("span", { className: "stats-cell-value" }, calculateAverageTime())),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "MAX RECORDED COMBO:"), React.createElement("span", { className: "stats-cell-value" }, `${lifetimeStats.highest_combo ?? 0}x`)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "POWER-UPS COLLECTED:"), React.createElement("span", { className: "stats-cell-value" }, lifetimeStats.total_powerups_collected ?? 0)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "EQUIPPED HULL MODEL:"), React.createElement("span", { className: "stats-cell-value" }, activeProfileConfig.name))
            ),
            React.createElement("button", { className: "neon-btn", onClick: () => { AudioEngine.playSFX('click'); setShowStats(false); } }, "BACK TO TERMINAL")
        );
    }

    function renderQuestsAndAchievementsDashboard() {
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-gold" }, "GRID QUEST SYSTEM NODES"),
            React.createElement("div", { className: "progression-section-header" }, "// ACTIVE DAILY OBJECTIVES (24H RESET)"),
            React.createElement("div", { className: "quest-dashboard-wrapper" },
                dailyQuests.map(q => {
                    const isComplete = q.progress >= q.target; const fillPct = Math.min(100, (q.progress / q.target) * 100);
                    return React.createElement("div", { key: q.id, className: `progression-card-strip ${q.claimed ? 'unlocked-status' : ''}` },
                        React.createElement("div", { className: "progression-meta-zone" },
                            React.createElement("span", { className: "progression-item-title" }, `${q.desc} (${q.progress}/${q.target})`),
                            React.createElement("div", { className: "quest-meter-container" }, React.createElement("div", { className: "quest-meter-fill", style: { width: `${fillPct}%` } }))
                        ),
                        q.claimed ? React.createElement("span", { className: "progression-reward-tag", style: { color: '#00ff66' } }, "COMPLETED") :
                        isComplete ? React.createElement("button", { className: "neon-btn", style: { padding: '4px 10px', fontSize: '10px', borderColor: '#00ff66', color: '#00ff66' }, onClick: () => handleClaimQuestReward(q.id) }, "CLAIM REWARD") :
                        React.createElement("span", { className: "progression-reward-tag" }, `+${q.reward} COINS`)
                    );
                })
            ),
            React.createElement("div", { className: "progression-section-header", style: { marginTop: '15px' } }, "// LIFETIME CHASSIS ACHIEVEMENTS"),
            React.createElement("div", { className: "quest-dashboard-wrapper" },
                MASTER_ACHIEVEMENT_REGISTRY.map(ach => {
                    const isUnlocked = completedAchievements.includes(ach.id);
                    return React.createElement("div", { key: ach.id, className: `progression-card-strip ${isUnlocked ? 'unlocked-status' : ''}` },
                        React.createElement("div", { className: "progression-meta-zone" }, React.createElement("span", { className: "progression-item-title" }, `[${ach.cat.toUpperCase()}] ${ach.name}`), React.createElement("span", { className: "progression-item-desc" }, ach.desc)),
                        React.createElement("span", { className: "progression-reward-tag", style: { color: isUnlocked ? '#00ff66' : '#ffaa00' } }, isUnlocked ? "UNLOCKED" : `+${ach.reward} COINS`)
                    );
                })
            ),
            React.createElement("button", { className: "neon-btn", style: { marginTop: '15px' }, onClick: () => { AudioEngine.playSFX('click'); setShowQuests(false); } }, "RETURN TO TERMINAL")
        );
    }

    function renderEnemiesDashboard() {
        const enemiesInfo = [
            { name: "Drone", desc: "Basic grid anomaly. Swarms target but lacks heavy armor.", color: "#ff0055" },
            { name: "Breacher", desc: "High-speed kamikaze unit. Detonates upon perimeter breach.", color: "#ffaa00" },
            { name: "Hound", desc: "Fast tracking logic unit. Evades standard vectors.", color: "#ff00aa" },
            { name: "Sniper", desc: "Long-range precision module. Fires projectiles from afar.", color: "#00ff66" },
            { name: "Goliath", desc: "Heavy armored logic node. Very slow but high integrity.", color: "#00f0ff" },
            { name: "Megamech Anchor", desc: "Sector gate boss. Features multi-phase tactical logic.", color: "#9900ff" }
        ];

        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-red" }, "HOSTILE INTEL DIRECTORY"),
            React.createElement("div", { className: "quest-dashboard-wrapper", style: { overflowY: 'auto' } },
                enemiesInfo.map((en, idx) =>
                    React.createElement("div", { key: idx, className: "progression-card-strip", style: { borderColor: en.color, background: 'rgba(0,0,0,0.5)' } },
                        React.createElement("div", { className: "progression-meta-zone" },
                            React.createElement("span", { className: "progression-item-title", style: { color: en.color, fontSize: '14px' } }, `>> ${en.name}`),
                            React.createElement("span", { className: "progression-item-desc", style: { fontSize: '12px' } }, en.desc)
                        )
                    )
                )
            ),
            React.createElement("button", { className: "neon-btn", style: { marginTop: '20px', borderColor: '#00f0ff', color: '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setShowEnemies(false); } }, "RETURN TO TERMINAL")
        );
    }

    function renderStartScreenView() {
        const unifiedGlobalFooterElement = React.createElement("div", { className: "cyber-footer" }, "NEON SURVIVAL PROTOCOL v1.3.1 // PROGRESSION NETWORK CORE // INTEL ARCH");
        if (showStartLeaderboard) { return React.createElement("div", { className: "screen-overlay" }, React.createElement("div", { className: "neon-title title-blue" }, "NEON SURVIVAL PROTOCOL"), renderLeaderboardStructure(), React.createElement("button", { className: "neon-btn", style: { marginTop: '20px' }, onClick: toggleStartLeaderboardMode }, "BACK TO UPLINK"), unifiedGlobalFooterElement); }
        if (user && showShop) { return React.createElement("div", { className: "screen-overlay" }, React.createElement("div", { className: "neon-title title-green" }, "GEAR CUSTOMIZATION SHOP"), React.createElement("div", { className: "summary-text", style: { color: '#00f0ff', fontWeight: 'bold' } }, `AVAILABLE COIN MATRIX: ${activeCoinWallet} COINS`), renderTerminalShopStructure(), React.createElement("button", { className: "neon-btn", style: { marginTop: '10px', borderColor: '#ff0055', color: '#ff0055' }, onClick: () => { AudioEngine.playSFX('click'); setShowShop(false); } }, "RETURN TO MAIN TERMINAL"), unifiedGlobalFooterElement); }
        if (user && showSettings) return renderConfigurationDashboard();
        if (user && showStats) return renderLifetimeStatisticsDashboard();
        if (user && showQuests) return renderQuestsAndAchievementsDashboard();
        if (user && showEnemies) return renderEnemiesDashboard();
        if (user && showMaps) return renderMapsDashboard();

        let dynamicControlZone = !user ? renderAuthFormStructure() : React.createElement("div", { key: "welcome-box", style: { textAlign: 'center', width: '100%' } },
            React.createElement("div", { className: "summary-text", style: { color: '#00ff66', fontWeight: 'bold' } }, `CONNECTED AGENT: [${username}]`),
            React.createElement("div", { className: "summary-text", style: { color: '#00f0ff', marginBottom: '15px' } }, `TOTAL WALLET BALANCE: ${activeCoinWallet} COINS`),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center' } },
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px' }, onClick: initializeGameSession }, "LAUNCH SIMULATION CORE"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ffaa00', color: '#ffaa00' }, onClick: () => { AudioEngine.playSFX('click'); setShowShop(true); } }, "OPEN UPGRADE STORE"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ff5500', color: '#ff5500' }, onClick: () => { AudioEngine.playSFX('click'); setShowQuests(true); } }, "MISSIONS & ACHIEVEMENTS"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ff00aa', color: '#ff00aa' }, onClick: () => { AudioEngine.playSFX('click'); setShowEnemies(true); } }, "HOSTILE INTEL DIRECTORY"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#00f0ff', color: '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setShowMaps(true); } }, "SECTOR MAP DIRECTORY"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#00ff66', color: '#00ff66' }, onClick: () => { AudioEngine.playSFX('click'); setShowStats(true); fetchLeaderboardScores(); } }, "LIFETIME DATA CORE"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#888', color: '#888' }, onClick: () => { AudioEngine.playSFX('click'); setShowSettings(true); } }, "HARDWARE SETTINGS"),
                React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ff0055', color: '#ff0055' }, onClick: handleSignOut }, "TERMINATE CONNECTION")
            )
        );
        return React.createElement("div", { className: "screen-overlay" }, React.createElement("div", { className: "neon-title title-blue" }, "NEON SURVIVAL PROTOCOL"), dynamicControlZone, renderAudioSettingsMenu(), React.createElement("button", { className: "neon-btn", style: { marginTop: '4px', fontSize: '13px', padding: '6px 14px', borderColor: '#ff0055', color: '#ff0055' }, onClick: toggleStartLeaderboardMode }, "VIEW GLOBAL LEADERBOARD"), unifiedGlobalFooterElement);
    }

    function renderInteractivePauseDashboard() {
        return React.createElement("div", { className: "screen-overlay", style: { background: 'rgba(3,3,7,0.85)', justifyContent: 'center', gap: '16px' } },
            React.createElement("div", { className: "neon-title title-blue" }, "SIMULATION INTERRUPTED"), React.createElement("div", { className: "summary-text", style: { color: '#aaa' } }, "CHASSIS ENERGY SYSTEMS PAUSED // PROTOCOL STALLED"),
            React.createElement("button", { className: "neon-btn", style: { width: '240px' }, onClick: () => { AudioEngine.playSFX('click'); setGameState('PLAY'); } }, "RESUME WORKER"),
            React.createElement("button", { className: "neon-btn", style: { width: '240px', borderColor: '#ffaa00', color: '#ffaa00' }, onClick: () => { AudioEngine.playSFX('click'); startSimulation(); } }, "RESTART OVERCLOCK"),
            React.createElement("button", { className: "neon-btn", style: { width: '240px', borderColor: '#ff0055', color: '#ff0055' }, onClick: () => { AudioEngine.playSFX('click'); setGameState('START_SCREEN'); } }, "ABORT TO MAIN MENU")
        );
    }

    function renderGameOverScreenView() {
        const m = gameMetrics.current; let rankPerformanceLetter = 'E';
        if (m.killCounter >= 20) rankPerformanceLetter = 'D'; if (m.killCounter >= 60) rankPerformanceLetter = 'C'; if (m.killCounter >= 150) rankPerformanceLetter = 'B'; if (m.killCounter >= 350) rankPerformanceLetter = 'A'; if (m.killCounter >= 600 && m.bossesKilled >= 2) rankPerformanceLetter = 'S';
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-red" }, "SIMULATION TERMINATED"),
            React.createElement("div", { className: "summary-text", style: { fontSize: '15px', color: '#ffaa00', fontWeight: 'bold' } }, `PERFORMANCE EVALUATION RANK: [${rankPerformanceLetter}]`),
            React.createElement("div", { className: "stats-display-grid" },
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "ELIMINATIONS:"), React.createElement("span", { className: "stats-cell-value" }, m.killCounter)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "DEPLOYMENT CLOCK:"), React.createElement("span", { className: "stats-cell-value" }, hud.time)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "BOSSES PURGED:"), React.createElement("span", { className: "stats-cell-value" }, m.bossesKilled)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "ACQUIRED OPERATION COINS:"), React.createElement("span", { className: "stats-cell-value", style: { color: '#00ff66' } }, `+${m.coinsEarnedThisRun}`)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "PEAK MULTIPLIER COMBO:"), React.createElement("span", { className: "stats-cell-value" }, `${m.highestComboThisRun}x`)),
                React.createElement("div", { className: "stats-grid-cell" }, React.createElement("span", { className: "stats-cell-label" }, "POWER-UPS COLLECTED:"), React.createElement("span", { className: "stats-cell-value" }, m.totalPowerupsThisRun))
            ),
            finalUpgradesManifest.length > 0 ? renderUpgradesManifestReport() : null,
            renderLeaderboardStructure(),
            React.createElement("div", { style: { marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' } },
                !scoreSubmitted ? React.createElement("button", { className: "neon-btn", disabled: dbLoading, onClick: submitScoreToDatabase }, dbLoading ? "SYNCING..." : "SYNC AGENT DATA") : null,
                React.createElement("button", { className: "neon-btn", onClick: startSimulation }, "REBOOT CHASSIS"),
                React.createElement("button", { className: "neon-btn", style: { borderColor: '#00f0ff', color: '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setGameState('START_SCREEN'); } }, "MAIN MENU")
            ),
            React.createElement("div", { className: "cyber-footer" }, "NEON SURVIVAL PROTOCOL v1.3.1 // PROGRESSION SUMMARY STATUS")
        );
    }

    function renderUpgradesManifestReport() {
        if (finalUpgradesManifest.length === 0) return null;
        return React.createElement("div", { key: "upgrades-report", style: { margin: '8px 0', width: '80%', maxWidth: '450px', background: 'rgba(255,255,255,0.03)', border: '1px dashed #333', padding: '10px', borderRadius: '4px' } },
            React.createElement("div", { style: { fontSize: '11px', color: '#888', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold' } }, ">> RETRIEVED CHASSIS INVENTORY LOADOUT:"),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
                finalUpgradesManifest.map(u => React.createElement("div", { key: u.id, style: { display: 'flex', fontSize: '12px', width: '100%' } }, React.createElement("span", { style: { color: '#00f0ff', flex: 1, textAlign: 'left' } }, u.name), React.createElement("span", { style: { color: '#00ff66', fontWeight: 'bold' } }, "LVL ", u.lvl)))
            )
        );
    }

    // ==========================================
    // 🧬 DOM VIEW MATRIX COMPOSITION RETURN
    // ==========================================
    return React.createElement("div", { id: "game-container" },
        React.createElement("canvas", { ref: canvasRef }),
        gameState === 'PLAY' ? React.createElement("div", { className: "mobile-input-layer", onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd }, React.createElement("div", { className: "joystick-base" }, React.createElement("div", { ref: knobRef, className: "joystick-knob" }))) : null,
        gameState === 'PLAY' ? React.createElement("div", { className: "hud-overlay" },
            React.createElement("div", { className: "top-hud-container" },
                React.createElement("div", { className: "stats-panel time-left" }, "TIME: ", hud.time),
                React.createElement("button", { className: "hud-interactive-trigger", onClick: () => { AudioEngine.playSFX('click'); setGameState('PAUSED'); } }, "PAUSE MATRIX"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end" } },
                    React.createElement("div", { className: "stats-panel kill-count" }, "COINS: ", hud.coins),
                    hud.combo > 1 ? React.createElement("div", { className: "combo-banner-readout" }, `${hud.combo}x COMBO!`) : null
                )
            ),
            React.createElement("div", { className: "xp-container" }, React.createElement("div", { className: "xp-bar", style: { width: `${Math.min(100, (hud.xp / hud.xpNeeded) * 100)}%` } })),
            React.createElement("div", { className: "hp-container" }, React.createElement("div", { className: "hp-bar", style: { width: `${Math.max(0, Math.min(100, (hud.health / (hud.maxHealth || 100)) * 100))}%` } })),
            bossHp.active ? React.createElement("div", { className: "boss-container" }, React.createElement("div", { className: "boss-bar", style: { width: `${Math.max(0, Math.min(100, (bossHp.current / bossHp.max) * 100))}%` } })) : null
        ) : null,
        gameState === 'START_SCREEN' ? renderStartScreenView() : null,
        gameState === 'PAUSED' ? renderInteractivePauseDashboard() : null,
        gameState === 'LEVEL_UP' ? React.createElement("div", { className: "screen-overlay" }, React.createElement("div", { className: "neon-title title-blue" }, "SYSTEM UPGRADE // CHOOSE CONFIG"), React.createElement("div", { className: "upgrades-grid" }, cards.map(c => React.createElement("div", { key: c.id, className: "upgrade-card", onClick: () => applyModifierCard(c.id) }, React.createElement("div", { className: "card-name" }, c.name, " [LVL ", c.lvl + 1, "]"), React.createElement("div", { className: "card-desc" }, c.desc))))) : null,
        gameState === 'GAME_OVER' ? renderGameOverScreenView() : null
    );
}

// Initialization Mount Handler
window.addEventListener('DOMContentLoaded', () => { const rootElement = document.getElementById('root'); if (rootElement) { ReactDOM.createRoot(rootElement).render(React.createElement(CyberpunkSurvival)); } });

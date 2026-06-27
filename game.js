// --- CRITICAL CONFIGURATION PARAMS ---
const SUPABASE_URL = 'https://xmbjhlyrswvlwfknktey.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYmpobHlyc3d2bHdma25rdGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzc3OTQsImV4cCI6MjA5Nzk1Mzc5NH0.6FEB8ZqvlUdYeZb9DPu5bVfeAHbJVvZHhtIBCFlS9gY';

const cyberbase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { useEffect, useRef, useState } = React;

// ==========================================
// 🛒 REBALANCED ECONOMY MATRIX
// ==========================================
const MASTER_SHOP_CATALOG = {
    shapes: [
        { id: 'shape_default', name: 'VECTOR BLUE', cost: 0, type: 'shapes', color: '#00f0ff', shape: 'tri', desc: 'Standard configuration.' },
        { id: 'shape_neon', name: 'NEON MATRIX', cost: 450, type: 'shapes', color: '#00ff66', shape: 'sq', desc: 'Grid variant layout.' },
        { id: 'shape_fire', name: 'HELLHOUND', cost: 1200, type: 'shapes', color: '#ff3300', shape: 'tri', desc: 'Volcanic core frame.' },
        { id: 'shape_ice', name: 'FROSTBITE', cost: 2000, type: 'shapes', color: '#00aaff', shape: 'pent', desc: 'Glacial shield geometry.' },
        { id: 'shape_gold', name: 'GOLD MIDAS', cost: 6000, type: 'shapes', color: '#ffaa00', shape: 'oct', desc: 'Elite metallic chassis.' }
    ],
    abilities: [
        { id: 'ability_default', name: 'STOCK DRIVER', cost: 0, type: 'abilities', desc: 'Standard projectile tracking.' },
        { id: 'ability_fire', name: 'BLAZE CORE', cost: 1500, type: 'abilities', desc: 'Increases bullet velocity by 50%.' },
        { id: 'ability_ice', name: 'CRYOPROBE', cost: 250, type: 'abilities', desc: 'Halves movement speed of hit hostiles.' },
        { id: 'ability_luck', name: 'DATA FORTUNE', cost: 4000, type: 'abilities', desc: 'Yields double XP drops from gems.' }
    ],
    trails: [
        { id: 'trail_default', name: 'STEALTH FLOW', cost: 0, type: 'trails', desc: 'Standard clean thruster lines.' },
        { id: 'trail_speed', name: 'VOLT SPARK', cost: 1000, type: 'trails', desc: 'Engine boost: +20% flat velocity.' },
        { id: 'trail_coin', name: 'MIDAS GLOW', cost: 3500, type: 'trails', desc: 'Economy boost: +50% Coin generation.' }
    ]
};

// ==========================================
// 🔊 CHIP-TUNE SYNTHESIZER AUDIO CORE
// ==========================================
const AudioEngine = {
    ctx: null, masterVol: 0.5, musicVol: 0.4, sfxVol: 0.5, isMuted: false, musicNode: null,

    init() {
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
            case 'death':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now); osc.frequency.linearRampToValueAtTime(80, now + 0.15);
                gain.gain.setValueAtTime(currentSFXVolume * 0.25, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.15); osc.start(now); osc.stop(now + 0.15); break;
            case 'explosion':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now); osc.frequency.linearRampToValueAtTime(30, now + 0.4);
                gain.gain.setValueAtTime(currentSFXVolume * 0.6, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.4); osc.start(now); osc.stop(now + 0.4); break;
            case 'damage':
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(180, now); osc.frequency.linearRampToValueAtTime(60, now + 0.25);
                gain.gain.setValueAtTime(currentSFXVolume * 0.4, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.25); osc.start(now); osc.stop(now + 0.25); break;
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
            case 'highscore':
                osc.type = 'sine'; osc.frequency.setValueAtTime(587, now); osc.frequency.exponentialRampToValueAtTime(1174, now + 0.4);
                gain.gain.setValueAtTime(currentSFXVolume * 0.5, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.4); osc.start(now); osc.stop(now + 0.4); break;
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
        if (state === 'BOSS') notes = [98, 98, 87, 87, 73, 73, 110, 110];
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
// 🕹️ MAIN SIMULATION ENGINE CORE
// ==========================================
function CyberpunkSurvival() {
    const canvasRef = useRef(null);
    const knobRef = useRef(null);

    // React Interface States
    const [gameState, setGameState] = useState('START_SCREEN');
    const [hud, setHud] = useState({ health: 100, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00", coins: 0 });
    const [bossHp, setBossHp] = useState({ current: 0, max: 250, active: false });
    const [cards, setCards] = useState([]);

    // AUTHENTICATION AND ECOSYSTEM RUNTIME STATE
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    
    // ECONOMY MODIFIER RUNTIME STATES
    const [activeCoinWallet, setActiveCoinWallet] = useState(0);
    const [sessionCoinsAccumulated, setSessionCoinsAccumulated] = useState(0);
    const [unlockedInventory, setUnlockedInventory] = useState(['shape_default', 'ability_default', 'trail_default']);
    const [equippedShape, setEquippedShape] = useState('shape_default');
    const [equippedAbility, setEquippedAbility] = useState('ability_default');
    const [equippedTrail, setEquippedTrail] = useState('trail_default');
    const [activeShopTab, setActiveShopTab] = useState('shapes');
    const [showShop, setShowShop] = useState(false); 

    // Cloud Database States
    const [leaderboard, setLeaderboard] = useState([]);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbError, setDbError] = useState(null);
    const [showStartLeaderboard, setShowStartLeaderboard] = useState(false);
    const [finalUpgradesManifest, setFinalUpgradesManifest] = useState([]);

    // Audio Variable States
    const [mVolume, setMVol] = useState(50);
    const [musVolume, setMusVol] = useState(40);
    const [sfxVolume, setSfxVol] = useState(50);
    const [muteActive, setMuteActive] = useState(false);
    
    const isSelectionLocked = useRef(false);

    // Internal Game Core Physics Matrices
    let logicalWidth = 800;
    let logicalHeight = 600;
    const playerRef = useRef({ x: 400, y: 300, radius: 14, baseSpeed: 3.5, speedMult: 1, health: 100, level: 1, xp: 0, xpNeeded: 12, fireCooldown: 0, baseFireRate: 35, laserCooldown: 180, shieldAngle: 0, basePickupRadius: 80, pickupRadius: 80, lastDir: { x: 1, y: 0 } });
    const enemiesRef = useRef([]);
    const projectilesRef = useRef([]);
    const gemsRef = useRef([]);
    const particlesRef = useRef([]);
    const keysRef = useRef({});
    const cameraRef = useRef({ x: 0, y: 0 });
    const touchVectorRef = useRef({ x: 0, y: 0 });
    
    const gameMetrics = useRef({ accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0, coinsEarnedThisRun: 0 });
    const lastTimestamp = useRef(0);
    const cancelEngineId = useRef(null);
    const bossSpawnedForCurrentMilestone = useRef(false);

    const upgradesRef = useRef({
        attackSpeed: { id: "attackSpeed", name: "COOLDOWN OVERCLOCK", desc: "Boosts firing speed. Lvl 4+ unlocks 3-way split-streams.", lvl: 0 },
        shield: { id: "shield", name: "PLASMA ORBITAL", desc: "Rotating energy shielding orbs. Lvl 5+ hyper-accelerates rotation.", lvl: 0 },
        laser: { id: "laser", name: "PIERCING LASER RAY", desc: "Fires piercing beam. Higher levels expand width and uptime.", lvl: 0 },
        magnet: { id: "magnet", name: "MAGNETIC FIELD LINK", desc: "Expands collection vacuum perimeter by 60px per stage (Max Lvl 6).", lvl: 0 },
        speed: { id: "speed", name: "BOOT OVERDRIVE", desc: "Increases baseline system locomotion propulsion speed by 15%.", lvl: 0 }
    });

    useEffect(() => {
        AudioEngine.masterVol = mVolume / 100;
        AudioEngine.musicVol = musVolume / 100;
        AudioEngine.sfxVol = sfxVolume / 100;
        AudioEngine.isMuted = muteActive;
        AudioEngine.setMusicTheme(gameState === 'PLAY' && bossHp.active ? 'BOSS' : gameState);
    }, [mVolume, musVolume, sfxVolume, muteActive, gameState, bossHp.active]);

    useEffect(() => {
        cyberbase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
                loadProfileCloudData(session.user.id);
            }
        });
    }, []);

    const handleAuthenticationAction = async (e) => {
        e.preventDefault(); setDbLoading(true); setDbError(null); AudioEngine.playSFX('click');
        try {
            if (isSignUp) {
                const { data: authData, error: authErr } = await cyberbase.auth.signUp({ email, password });
                if (authErr) throw authErr;
                if (authData.user) {
                    const { error: profErr } = await cyberbase.from('profiles').insert([{ 
                        id: authData.user.id, username: username.toUpperCase().trim(), coins: 0,
                        inventory: ['shape_default', 'ability_default', 'trail_default'],
                        equipped_shape: 'shape_default', equipped_ability: 'ability_default', equipped_trail: 'trail_default'
                    }]);
                    if (profErr) throw profErr;
                    setUser(authData.user); setActiveCoinWallet(0);
                    setUnlockedInventory(['shape_default', 'ability_default', 'trail_default']);
                }
            } else {
                const { data: authData, error: authErr } = await cyberbase.auth.signInWithPassword({ email, password });
                if (authErr) throw authErr;
                setUser(authData.user); await loadProfileCloudData(authData.user.id);
            }
        } catch (err) { setDbError(err.message); } finally { setDbLoading(false); }
    };

    const loadProfileCloudData = async (uid) => {
        try {
            const { data, error = null } = await cyberbase.from('profiles').select('username, coins, inventory, equipped_shape, equipped_ability, equipped_trail').eq('id', uid).single();
            if (error) throw error;
            if (data) {
                setUsername(data.username); setActiveCoinWallet(data.coins);
                if (data.inventory) setUnlockedInventory(data.inventory);
                if (data.equipped_shape) setEquippedShape(data.equipped_shape);
                if (data.equipped_ability) setEquippedAbility(data.equipped_ability);
                if (data.equipped_trail) setEquippedTrail(data.equipped_trail);
            }
        } catch (err) { console.error("Profile matching sync exception:", err.message); }
    };

    const handleSignOut = async () => {
        AudioEngine.playSFX('click'); await cyberbase.auth.signOut(); setUser(null); setPassword(''); setActiveCoinWallet(0);
    };

    const handleShopTransaction = async (item) => {
        if (!user) return;
        AudioEngine.playSFX('click');
        const isOwned = unlockedInventory.includes(item.id);

        if (isOwned) {
            let updatePayload = {};
            if (item.type === 'shapes') { setEquippedShape(item.id); updatePayload.equipped_shape = item.id; }
            if (item.type === 'abilities') { setEquippedAbility(item.id); updatePayload.equipped_ability = item.id; }
            if (item.type === 'trails') { setEquippedTrail(item.id); updatePayload.equipped_trail = item.id; }

            await cyberbase.from('profiles').update(updatePayload).eq('id', user.id);
        } else {
            if (activeCoinWallet < item.cost) { alert("INSUFFICIENT FUNDS IN COIN CORE MATRIX."); return; }
            const directWalletResult = activeCoinWallet - item.cost;
            const updatedInventoryList = [...unlockedInventory, item.id];

            setDbLoading(true);
            const { error } = await cyberbase.from('profiles').update({
                coins: directWalletResult,
                inventory: updatedInventoryList
            }).eq('id', user.id);

            if (!error) {
                setActiveCoinWallet(directWalletResult);
                setUnlockedInventory(updatedInventoryList);
            } else {
                alert("Matrix sync disruption. Purchase aborted.");
            }
            setDbLoading(false);
        }
    };

    const initializeGameSession = () => { if (!user) return; AudioEngine.playSFX('start'); startSimulation(); };

    const startSimulation = () => {
        const p = playerRef.current;
        p.x = 400; p.y = 300; p.health = 100; p.level = 1; p.xp = 0; p.xpNeeded = 12; p.speedMult = 1; p.laserCooldown = 180; p.pickupRadius = p.basePickupRadius;
        enemiesRef.current = []; projectilesRef.current = []; gemsRef.current = []; particlesRef.current = [];
        gameMetrics.current = { accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0, coinsEarnedThisRun: 0 };
        touchVectorRef.current = { x: 0, y: 0 }; bossSpawnedForCurrentMilestone.current = false; lastTimestamp.current = performance.now();
        setScoreSubmitted(false); setShowStartLeaderboard(false); setFinalUpgradesManifest([]); setSessionCoinsAccumulated(0); isSelectionLocked.current = false;
        Object.keys(upgradesRef.current).forEach(k => upgradesRef.current[k].lvl = 0);
        setBossHp({ current: 0, max: 250, active: false });
        setHud({ health: 100, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00", coins: activeCoinWallet });
        setGameState('PLAY');
    };

    const fetchLeaderboardScores = async () => {
        setDbLoading(true); setDbError(null);
        try {
            const { data, error } = await cyberbase.from('leaderboard').select('player_name, kills, survival_time').order('kills', { ascending: false }).limit(5);
            if (error) throw error; setLeaderboard(data || []);
        } catch (err) { setDbError("Leaderboard unavailable"); } finally { setDbLoading(false); }
    };

    const submitScoreToDatabase = async () => {
        if (!user || scoreSubmitted) return;
        setDbLoading(true);
        try {
            const isTopScore = leaderboard.length === 0 || gameMetrics.current.killCounter > leaderboard[0].kills;
            const { error: boardErr } = await cyberbase.from('leaderboard').insert([{ player_name: username, kills: gameMetrics.current.killCounter, survival_time: hud.time }]);
            if (boardErr) throw boardErr;

            const finalCoinTotalVal = activeCoinWallet + gameMetrics.current.coinsEarnedThisRun;
            const { error: economyErr } = await cyberbase.from('profiles').update({ coins: finalCoinTotalVal }).eq('id', user.id);
            if (economyErr) throw economyErr;
            
            setActiveCoinWallet(finalCoinTotalVal); setScoreSubmitted(true);
            if (isTopScore) AudioEngine.playSFX('highscore');
            await fetchLeaderboardScores();
        } catch (err) { setDbError("Sync failed - Score locked locally"); } finally { setDbLoading(false); }
    };

    const toggleStartLeaderboardMode = () => { AudioEngine.playSFX('click'); if (!showStartLeaderboard) fetchLeaderboardScores(); setShowStartLeaderboard(!showStartLeaderboard); };
    const compileFinalUpgradesReport = () => { setFinalUpgradesManifest(Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.lvl > 0)); };

    useEffect(() => {
        if (gameState === 'GAME_OVER') {
            AudioEngine.playSFX('gameover'); fetchLeaderboardScores(); compileFinalUpgradesReport();
            setSessionCoinsAccumulated(gameMetrics.current.coinsEarnedThisRun);
        }
    }, [gameState]);

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

            const p = playerRef.current;
            
            if (p.health <= 0) {
                setGameState('GAME_OVER');
                return; 
            }

            const bossActive = enemiesRef.current.some(e => e.type === 'boss');

            if (gameState === 'PLAY') {
                const metrics = gameMetrics.current;
                
                const hasVoltTrail = equippedTrail === 'trail_speed';
                const hasMidasTrail = equippedTrail === 'trail_coin';
                const hasBlazeAbility = equippedAbility === 'ability_fire';
                const hasFrostAbility = equippedAbility === 'ability_ice';
                const hasLuckAbility = equippedAbility === 'ability_luck';

                p.speedMult = hasVoltTrail ? 1.20 : 1.0;

                metrics.accumTime += dt;
                if (metrics.accumTime >= 1000) {
                    metrics.accumTime -= 1000; metrics.clockSeconds++;
                    if (metrics.clockSeconds % 60 === 0) {
                        metrics.coinsEarnedThisRun += Math.ceil(50 * (hasMidasTrail ? 1.5 : 1.0));
                    }
                    const min = Math.floor(metrics.clockSeconds / 60).toString().padStart(2, '0');
                    const sec = (metrics.clockSeconds % 60).toString().padStart(2, '0');
                    setHud(prev => ({ ...prev, time: `${min}:${sec}`, coins: activeCoinWallet + metrics.coinsEarnedThisRun }));
                }

                let mx = 0, my = 0;
                if (keysRef.current['w'] || keysRef.current['arrowup']) my = -1;
                if (keysRef.current['s'] || keysRef.current['arrowdown']) my = 1;
                if (keysRef.current['a'] || keysRef.current['arrowleft']) mx = -1;
                if (keysRef.current['d'] || keysRef.current['arrowright']) mx = 1;

                if (mx !== 0 || my !== 0) {
                    const len = Math.hypot(mx, my); const nX = mx / len; const nY = my / len;
                    p.x += nX * (p.baseSpeed * p.speedMult) * frameRatio; p.y += nY * (p.baseSpeed * p.speedMult) * frameRatio;
                    p.lastDir = { x: nX, y: nY };
                    if (Math.random() < 0.4) {
                        particlesRef.current.push({ x: p.x, y: p.y, vx: -nX * 2, vy: -nY * 2, r: 2.5, alpha: 0.8, color: hasVoltTrail ? '#ffff00' : (hasMidasTrail ? '#ffaa00' : '#00f0ff') });
                    }
                } else if (touchVectorRef.current.x !== 0 || touchVectorRef.current.y !== 0) {
                    const tx = touchVectorRef.current.x; const ty = touchVectorRef.current.y;
                    p.x += tx * (p.baseSpeed * p.speedMult) * frameRatio; p.y += ty * (p.baseSpeed * p.speedMult) * frameRatio;
                    const touchLen = Math.hypot(tx, ty);
                    if (touchLen > 0.1) {
                        p.lastDir = { x: tx / touchLen, y: ty / touchLen };
                        if (Math.random() < 0.4) {
                            particlesRef.current.push({ x: p.x, y: p.y, vx: -(tx / touchLen) * 2, vy: -(ty / touchLen) * 2, r: 2.5, alpha: 0.8, color: hasVoltTrail ? '#ffff00' : (hasMidasTrail ? '#ffaa00' : '#00f0ff') });
                        }
                    }
                }

                cameraRef.current.x = p.x - logicalWidth / 2; cameraRef.current.y = p.y - logicalHeight / 2;

                if (p.fireCooldown > 0) p.fireCooldown -= frameRatio;
                if (p.fireCooldown <= 0 && enemiesRef.current.length > 0) {
                    let target = null, minDist = Infinity;
                    enemiesRef.current.forEach(e => { const d = Math.hypot(e.x - p.x, e.y - p.y); if (d < minDist) { minDist = d; target = e; } });
                    if (target && minDist < 500) {
                        const angle = Math.atan2(target.y - p.y, target.x - p.x);
                        const projectileVelocitySpeed = hasBlazeAbility ? 14 : 9;
                        const attackLvl = upgradesRef.current.attackSpeed.lvl;
                        AudioEngine.playSFX('shoot');

                        if (attackLvl >= 4) {
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * projectileVelocitySpeed, vy: Math.sin(angle) * projectileVelocitySpeed, radius: 5, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle - 0.25) * projectileVelocitySpeed, vy: Math.sin(angle - 0.25) * projectileVelocitySpeed, radius: 4, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle + 0.25) * projectileVelocitySpeed, vy: Math.sin(angle + 0.25) * projectileVelocitySpeed, radius: 4, laser: false, dead: false });
                        } else {
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * projectileVelocitySpeed, vy: Math.sin(angle) * projectileVelocitySpeed, radius: 5, laser: false, dead: false });
                        }
                        p.fireCooldown = Math.max(5, p.baseFireRate * (1 - Math.min(0.75, attackLvl * 0.20)));
                    }
                }

                if (upgradesRef.current.laser.lvl > 0) {
                    p.laserCooldown -= frameRatio;
                    if (p.laserCooldown <= 0) {
                        const angle = Math.atan2(p.lastDir.y, p.lastDir.x); const laserLvl = upgradesRef.current.laser.lvl;
                        projectilesRef.current.push({ x: p.x, y: p.y, angle: angle, width: laserLvl >= 4 ? 54 : 34, length: 1200, duration: laserLvl >= 4 ? 25 : 15, laser: true, dead: false });
                        p.laserCooldown = Math.max(70, 190 - laserLvl * 25);
                    }
                }

                if (upgradesRef.current.shield.lvl > 0) { p.shieldAngle += (upgradesRef.current.shield.lvl >= 5 ? 0.09 : 0.04) * frameRatio; }

                const difficultyMod = 1 + metrics.bossesKilled * 0.5; const currentSec = metrics.clockSeconds;
                if (!metrics.tickTracker) metrics.tickTracker = 0; metrics.tickTracker += frameRatio;

                let spawnThreshold = currentSec > 120 ? 22 : (currentSec > 60 ? 35 : 48);
                if (metrics.tickTracker >= spawnThreshold && !bossActive) {
                    metrics.tickTracker = 0; const angle = Math.random() * Math.PI * 2;
                    const sx = p.x + Math.cos(angle) * 540; const sy = p.y + Math.sin(angle) * 540;
                    let pool = ['drone', 'drone']; if (currentSec >= 30) pool.push('breacher', 'breacher'); if (currentSec >= 65) pool.push('hound'); if (currentSec >= 110) pool.push('goliath');
                    const chosen = pool[Math.floor(Math.random() * pool.length)];
                    let enemyConfig = { x: sx, y: sy, type: chosen, dead: false, state: 'chase', timer: 0, freezeFactor: 1.0 };
                    if (chosen === 'drone') { enemyConfig.hp = Math.floor(1 * difficultyMod); enemyConfig.speed = 1.6; enemyConfig.r = 11; enemyConfig.color = '#ff0055'; enemyConfig.shape = 'sq'; }
                    if (chosen === 'breacher') { enemyConfig.hp = Math.floor(2 * difficultyMod); enemyConfig.speed = 3.2; enemyConfig.r = 10; enemyConfig.color = '#ffaa00'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'hound') { enemyConfig.hp = Math.floor(3 * difficultyMod); enemyConfig.speed = 2.4; enemyConfig.r = 12; enemyConfig.color = '#ff00aa'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'goliath') { enemyConfig.hp = Math.floor(28 * difficultyMod); enemyConfig.speed = 0.7; enemyConfig.r = 24; enemyConfig.color = '#00f0ff'; enemyConfig.shape = 'oct'; }
                    enemyConfig.maxHp = enemyConfig.hp; enemiesRef.current.push(enemyConfig);
                }

                if (Math.floor(currentSec / 180) > metrics.bossesKilled) {
                    if (!bossSpawnedForCurrentMilestone.current && !bossActive) {
                        const bMaxHp = Math.floor(250 * (1 + metrics.bossesKilled * 0.75));
                        enemiesRef.current.push({ x: p.x, y: p.y - 400, type: 'boss', hp: bMaxHp, maxHp: bMaxHp, speed: 0.8, r: 42, color: '#9900ff', shape: 'oct', dead: false, bossActionTimer: 120, state: 'normal', dashVx: 0, dashVy: 0, freezeFactor: 1.0 });
                        bossSpawnedForCurrentMilestone.current = true; AudioEngine.playSFX('boss_spawn'); setBossHp({ current: bMaxHp, max: bMaxHp, active: true });
                    }
                } else { bossSpawnedForCurrentMilestone.current = false; }

                enemiesRef.current.forEach(e => {
                    const distToPlayer = Math.hypot(p.y - e.y, p.x - e.x);
                    const trueCalculatedSpeed = e.speed * e.freezeFactor * frameRatio;

                    if (e.type === 'boss') {
                        e.bossActionTimer -= frameRatio;
                        if (e.state === 'normal') {
                            const angle = Math.atan2(p.y - e.y, p.x - e.x); e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed;
                            if (e.bossActionTimer <= 0) {
                                e.bossActionTimer = 140 + Math.random() * 60; const rollAction = Math.random();
                                if (rollAction < 0.35) { e.state = 'charge_dash'; e.timer = 30; }
                                else if (rollAction < 0.70 && distToPlayer < 250) { e.state = 'slash_shock'; e.timer = 15; }
                                else {
                                    for (let i = 0; i < 4; i++) { enemiesRef.current.push({ x: e.x + Math.cos((Math.PI*2/4)*i)*60, y: e.y + Math.sin((Math.PI*2/4)*i)*60, type: 'drone', hp: Math.floor(1*difficultyMod), maxHp: Math.floor(1*difficultyMod), speed: 2.5, r: 9, color: '#a347ff', shape: 'sq', dead: false, freezeFactor: 1.0 }); }
                                }
                            }
                        } else if (e.state === 'charge_dash') {
                            e.timer -= frameRatio; if (e.timer <= 0) { const angle = Math.atan2(p.y - e.y, p.x - e.x); e.dashVx = Math.cos(angle) * 11; e.dashVy = Math.sin(angle) * 11; e.state = 'dashing'; e.timer = 22; }
                        } else if (e.state === 'dashing') {
                            e.x += e.dashVx * e.freezeFactor * frameRatio; e.y += e.dashVy * e.freezeFactor * frameRatio; e.timer -= frameRatio;
                            if (e.timer <= 0) e.state = 'normal';
                        } else if (e.state === 'slash_shock') {
                            e.timer -= frameRatio;
                            if (e.timer <= 0) {
                                if (distToPlayer < 140) { 
                                    p.health = Math.max(0, p.health - 35); AudioEngine.playSFX('damage'); setHud(prev => ({ ...prev, health: p.health })); 
                                }
                                e.state = 'normal';
                            }
                        }
                    } else {
                        const angle = Math.atan2(p.y - e.y, p.x - e.x);
                        if (e.type === 'breacher') {
                            if (e.state === 'chase') {
                                e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed; if (distToPlayer < 40) { e.state = 'detonating'; e.timer = 18; }
                            } else if (e.state === 'detonating') {
                                e.timer -= frameRatio; e.x += Math.cos(angle) * 0.5 * trueCalculatedSpeed; e.y += Math.sin(angle) * 0.5 * trueCalculatedSpeed;
                                if (e.timer <= 0) {
                                    e.hp = -10; AudioEngine.playSFX('explosion');
                                    if (distToPlayer < 75) { 
                                        p.health = Math.max(0, p.health - 22); AudioEngine.playSFX('damage'); setHud(prev => ({ ...prev, health: p.health })); 
                                    }
                                }
                            }
                        } else { e.x += Math.cos(angle) * trueCalculatedSpeed; e.y += Math.sin(angle) * trueCalculatedSpeed; }
                    }

                    if (distToPlayer < e.r + p.radius) {
                        p.health = Math.max(0, p.health - (e.type === 'boss' ? (e.state === 'dashing' ? 2.5 : 1.4) : (e.type === 'goliath' ? 0.8 : 0.35)) * frameRatio);
                        if (Math.random() < 0.08) AudioEngine.playSFX('damage'); setHud(prev => ({ ...prev, health: p.health })); 
                    }

                    if (upgradesRef.current.shield.lvl > 0) {
                        const shields = Math.min(4, upgradesRef.current.shield.lvl);
                        for (let i = 0; i < shields; i++) {
                            const sa = p.shieldAngle + (i * (Math.PI * 2 / shields));
                            if (Math.hypot(e.x - (p.x + Math.cos(sa)*65), e.y - (p.y + Math.sin(sa)*65)) < e.r + 6) {
                                e.hp -= (0.12 + (upgradesRef.current.shield.lvl * 0.04)) * frameRatio;
                                if (hasFrostAbility) e.freezeFactor = 0.5;
                            }
                        }
                    }
                });

                projectilesRef.current.forEach(proj => {
                    if (proj.laser) {
                        proj.duration -= frameRatio;
                        enemiesRef.current.forEach(e => {
                            let dx = e.x - proj.x, dy = e.y - proj.y; let dot = dx * Math.cos(proj.angle) + dy * Math.sin(proj.angle);
                            if (dot > 0 && dot < proj.length && Math.hypot(e.x - (proj.x + Math.cos(proj.angle)*dot), e.y - (proj.y + Math.sin(proj.angle)*dot)) < e.r + proj.width/2) {
                                e.hp -= 0.25 * frameRatio; if (hasFrostAbility) e.freezeFactor = 0.5;
                            }
                        });
                        if (proj.duration <= 0) proj.dead = true;
                    } else {
                        proj.x += proj.vx * frameRatio; proj.y += proj.vy * frameRatio;
                        for (let e of enemiesRef.current) {
                            if (Math.hypot(proj.x - e.x, proj.y - e.y) < proj.radius + e.r) {
                                proj.dead = true; e.hp -= 1; if (hasFrostAbility) e.freezeFactor = 0.5;
                                AudioEngine.playSFX('hit'); break;
                            }
                        }
                        if (Math.hypot(proj.x - p.x, proj.y - p.y) > 900) proj.dead = true;
                    }
                });

                gemsRef.current.forEach(g => {
                    const d = Math.hypot(g.x - p.x, g.y - p.y);
                    if (g.attracted || d < p.pickupRadius) {
                        g.attracted = true; g.speed += 0.4 * frameRatio;
                        g.x += Math.cos(Math.atan2(p.y - g.y, p.x - g.x)) * g.speed * frameRatio;
                        g.y += Math.sin(Math.atan2(p.y - g.y, p.x - g.x)) * g.speed * frameRatio;
                        if (d < p.radius + 4) {
                            g.dead = true; AudioEngine.playSFX('powerup');
                            if (g.type === 'heart') { p.health = Math.min(100, p.health + 25); setHud(prev => ({ ...prev, health: p.health })); }
                            else {
                                const computationalXPMult = hasLuckAbility ? 2 : 1;
                                p.xp = Math.min(p.xpNeeded, p.xp + (g.val * computationalXPMult));
                                if (p.xp >= p.xpNeeded) {
                                    p.xp -= p.xpNeeded; p.level++; p.xpNeeded = Math.floor(p.xpNeeded * 1.45) + 8; setGameState('LEVEL_UP');
                                    setCards(Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.id !== 'magnet' || u.lvl < 6).sort(() => Math.random() - 0.5).slice(0, 3));
                                }
                                setHud(prev => ({ ...prev, level: p.level, xp: p.xp, xpNeeded: p.xpNeeded }));
                            }
                        }
                    }
                });

                enemiesRef.current.forEach(e => {
                    if (e.hp <= 0) {
                        e.dead = true; if (e.hp !== -10) metrics.killCounter++;
                        
                        if (e.hp !== -10) {
                            let baseValueCollected = 0;
                            if (e.type === 'drone') baseValueCollected = 5;
                            else if (e.type === 'breacher') baseValueCollected = 10;
                            else if (e.type === 'hound') baseValueCollected = 10;
                            else if (e.type === 'goliath') baseValueCollected = 15;
                            else if (e.type === 'boss') baseValueCollected = 100;
                            
                            metrics.coinsEarnedThisRun += Math.ceil(baseValueCollected * (hasMidasTrail ? 1.5 : 1.0));
                        }

                        setHud(prev => ({ ...prev, kills: metrics.killCounter, coins: activeCoinWallet + metrics.coinsEarnedThisRun }));
                        if (e.type === 'boss') { setBossHp({ current: 0, max: 250, active: false }); gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false }); for (let i=0; i<15; i++) gemsRef.current.push({ x: e.x+(Math.random()*80-40), y: e.y+(Math.random()*80-40), val: 6, speed: 1, attracted: false, dead: false }); }
                        else {
                            if (e.type === 'goliath' || (e.type === 'hound' && Math.random() < 0.12)) gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false });
                            for (let i=0; i<(e.type==='goliath'?6:1); i++) gemsRef.current.push({ x: e.x+(Math.random()*14-7), y: e.y+(Math.random()*14-7), val: e.type==='goliath'?2:1, speed: 1, attracted: false, dead: false });
                        }
                    }
                });

                enemiesRef.current = enemiesRef.current.filter(e => !e.dead); projectilesRef.current = projectilesRef.current.filter(p => !p.dead); gemsRef.current = gemsRef.current.filter(g => !g.dead);
                particlesRef.current.forEach(pt => { pt.x += pt.vx * frameRatio; pt.y += pt.vy * frameRatio; pt.alpha -= 0.025 * frameRatio; }); particlesRef.current = particlesRef.current.filter(pt => pt.alpha > 0);
            }

            // --- CANVAS RENDERING ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scaleX = canvas.width / logicalWidth; const scaleY = canvas.height / logicalHeight;
            ctx.save(); ctx.scale(scaleX, scaleY);
            const cx = cameraRef.current.x, cy = cameraRef.current.y;

            ctx.save(); ctx.strokeStyle = '#121226'; ctx.lineWidth = 1;
            for (let x = -(cx % 50); x < logicalWidth; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, logicalHeight); ctx.stroke(); }
            for (let y = -(cy % 50); y < logicalHeight; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(logicalWidth, y); ctx.stroke(); }
            ctx.restore();

            gemsRef.current.forEach(g => { ctx.save(); ctx.fillStyle = g.type === 'heart' ? '#ff0055' : (g.val > 1 ? '#00ffff' : '#00ff66'); ctx.shadowBlur = 8; ctx.shadowColor = ctx.fillStyle; ctx.beginPath(); ctx.arc(g.x - cx, g.y - cy, g.type==='heart'?6:3.5, 0, Math.PI*2); ctx.fill(); ctx.restore(); });
            projectilesRef.current.forEach(p => { ctx.save(); ctx.shadowBlur = 10; ctx.shadowColor = p.laser ? '#9900ff' : '#00f0ff'; if (p.laser) { ctx.strokeStyle = '#9900ff'; ctx.lineWidth = p.width * (p.duration / 20); ctx.beginPath(); ctx.moveTo(p.x - cx, p.y - cy); ctx.lineTo((p.x + Math.cos(p.angle)*p.length) - cx, (p.y + Math.sin(p.angle)*p.length) - cy); ctx.stroke(); } else { ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(p.x - cx, p.y - cy, p.radius, 0, Math.PI*2); ctx.fill(); } ctx.restore(); });
            enemiesRef.current.forEach(e => { ctx.save(); ctx.shadowBlur = 8; ctx.shadowColor = e.color; ctx.strokeStyle = e.color; ctx.fillStyle = e.type==='breacher'&&e.state==='detonating'&&(Math.floor(performance.now()/50)%2===0)?'#ff0000':'#030307'; ctx.lineWidth = 2; ctx.beginPath(); if (e.shape === 'sq') { ctx.strokeRect(e.x - e.r - cx, e.y - e.r - cy, e.r*2, e.r*2); ctx.fillRect(e.x - e.r - cx, e.y - e.r - cy, e.r*2, e.r*2); } else if (e.shape === 'tri') { ctx.moveTo(e.x - cx, e.y - e.r - cy); ctx.lineTo(e.x + e.r - cx, e.y + e.r - cy); ctx.lineTo(e.x - e.r - cx, e.y + e.r - cy); ctx.closePath(); ctx.fill(); ctx.stroke(); } else { for (let i=0; i<8; i++) { let a = (Math.PI*2/8)*i - Math.PI/2; ctx.lineTo(e.x + Math.cos(a)*e.r - cx, e.y + Math.sin(a)*e.r - cy); } ctx.closePath(); ctx.fill(); ctx.stroke(); } ctx.restore(); });
            particlesRef.current.forEach(pt => { ctx.save(); ctx.globalAlpha = pt.alpha; ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(pt.x - cx, pt.y - cy, pt.r, 0, Math.PI*2); ctx.fill(); ctx.restore(); });

            const pNode = playerRef.current;
            const activeProfileConfig = MASTER_SHOP_CATALOG.shapes.find(s => s.id === equippedShape) || MASTER_SHOP_CATALOG.shapes[0];
            
            ctx.save();
            ctx.shadowBlur = 14; ctx.shadowColor = activeProfileConfig.color;
            ctx.strokeStyle = activeProfileConfig.color; ctx.fillStyle = '#030307'; ctx.lineWidth = 3;
            ctx.translate(pNode.x - cx, pNode.y - cy); ctx.rotate(Math.atan2(pNode.lastDir.y, pNode.lastDir.x));
            
            ctx.beginPath();
            if (activeProfileConfig.shape === 'sq') {
                ctx.rect(-12, -12, 24, 24);
            } else if (activeProfileConfig.shape === 'pent') {
                for (let i = 0; i < 5; i++) { ctx.lineTo(15 * Math.cos((Math.PI*2/5)*i), 15 * Math.sin((Math.PI*2/5)*i)); }
            } else if (activeProfileConfig.shape === 'oct') {
                for (let i = 0; i < 8; i++) { ctx.lineTo(16 * Math.cos((Math.PI*2/8)*i), 16 * Math.sin((Math.PI*2/8)*i)); }
            } else {
                ctx.moveTo(16, 0); ctx.lineTo(-12, -13); ctx.lineTo(-6, 0); ctx.lineTo(-12, 13);
            }
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();

            if (upgradesRef.current.shield.lvl > 0) { ctx.save(); ctx.shadowBlur = 8; ctx.shadowColor = '#00ff66'; ctx.fillStyle = '#00ff66'; for (let i=0; i<Math.min(4, upgradesRef.current.shield.lvl); i++) { ctx.beginPath(); ctx.arc((pNode.x + Math.cos(pNode.shieldAngle + (i*(Math.PI*2/Math.min(4, upgradesRef.current.shield.lvl))))*65) - cx, (pNode.y + Math.sin(pNode.shieldAngle + (i*(Math.PI*2/Math.min(4, upgradesRef.current.shield.lvl))))*65) - cy, 5.5, 0, Math.PI*2); ctx.fill(); } ctx.restore(); }
            ctx.restore(); cancelEngineId.current = requestAnimationFrame(runEngineStep);
        };
        cancelEngineId.current = requestAnimationFrame(runEngineStep);
        return () => { cancelAnimationFrame(cancelEngineId.current); AudioEngine.stopMusic(); window.removeEventListener('keydown', listenDown); window.removeEventListener('keyup', listenUp); window.removeEventListener('resize', resizeCanvasBufferToViewport); };
    }, [gameState, activeCoinWallet, equippedShape, equippedAbility, equippedTrail]);

    // Touch Event Mapping Handlers
    const handleTouchMove = (e) => { if (gameState !== 'PLAY') return; const touch = e.touches[0]; const base = e.currentTarget.getBoundingClientRect(); const totalDistance = Math.hypot(touch.clientX - (base.left + base.width/2), touch.clientY - (base.top + base.height/2)); let fX = touch.clientX - (base.left + base.width/2); let fY = touch.clientY - (base.top + base.height/2); if (totalDistance > 40) { fX = (fX/totalDistance)*40; fY = (fY/totalDistance)*40; } if (knobRef.current) knobRef.current.style.transform = `translate(${fX}px, ${fY}px)`; touchVectorRef.current = { x: fX/40, y: fY/40 }; };
    const handleTouchEnd = () => { touchVectorRef.current = { x: 0, y: 0 }; if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)'; };
    const applyModifierCard = (id) => { if (isSelectionLocked.current) return; isSelectionLocked.current = true; AudioEngine.playSFX('powerup'); upgradesRef.current[id].lvl++; if (id === 'speed') playerRef.current.speedMult += 0.15; if (id === 'magnet') playerRef.current.pickupRadius = playerRef.current.basePickupRadius + (upgradesRef.current.magnet.lvl * 60); setGameState('PLAY'); setTimeout(() => { isSelectionLocked.current = false; }, 200); };

    // SCREEN COMPONENT RENDERING ROUTINES
    const renderAudioSettingsMenu = () => {
        return React.createElement("div", { key: "audio-panel", className: "audio-settings-panel" },
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "MASTER HARDWARE VOL:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: mVolume, onChange: (e) => setMVol(Number(e.target.value)) })),
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "AMBIENT RHYTHM VOL:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: musVolume, onChange: (e) => setMusVol(Number(e.target.value)) })),
            React.createElement("div", { className: "volume-row" }, React.createElement("span", null, "FX MATRIX ENVELOPE:"), React.createElement("input", { type: "range", className: "volume-slider", min: "0", max: "100", value: sfxVolume, onChange: (e) => setSfxVol(Number(e.target.value)) })),
            React.createElement("button", { className: "neon-btn", style: { marginTop: "5px", padding: "4px 10px", fontSize: "11px", borderColor: muteActive ? "#ff0055" : "#00f0ff", color: muteActive ? "#ff0055" : "#00f0ff" }, onClick: () => { AudioEngine.playSFX('click'); setMuteActive(!muteActive); } }, muteActive ? "MUTED // REACTIVATE" : "MUTE ACOUSTIC NODES")
        );
    };

    const renderLeaderboardStructure = () => {
        return React.createElement("div", { key: "leaderboard-root", style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            React.createElement("h3", { style: { color: '#00f0ff', margin: '10px 0 5px 0' } }, "// TOP SIMULATION RECORDS"),
            dbError ? React.createElement("div", { style: { fontSize: '12px', color: '#ff0055', fontWeight: 'bold' } }, `>> ${dbError.toUpperCase()}`) :
            dbLoading && leaderboard.length === 0 ? React.createElement("div", { style: { fontSize: '12px', color: '#00f0ff' } }, "FETCHING REALTIME CLOUD CHANNELS...") :
            React.createElement("table", { className: "leaderboard-table" },
                React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "AGENT"), React.createElement("th", null, "ELIMINATIONS"), React.createElement("th", null, "DURATION"))),
                React.createElement("tbody", null, leaderboard.map((row, index) => React.createElement("tr", { key: index, style: { color: index === 0 ? '#00ff66' : '#fff' } }, React.createElement("td", null, row.player_name), React.createElement("td", null, row.kills), React.createElement("td", null, row.survival_time))))
            )
        );
    };

    const renderTerminalShopStructure = () => {
        const itemsList = MASTER_SHOP_CATALOG[activeShopTab] || [];
        return React.createElement("div", { key: "arcade-shop", style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' } },
            React.createElement("div", { className: "shop-toggle-container" },
                ['shapes', 'abilities', 'trails'].map(tab => React.createElement("button", {
                    key: tab, className: "neon-btn",
                    style: { padding: '4px 12px', fontSize: '11px', borderColor: activeShopTab === tab ? '#00ff66' : '#00f0ff', color: activeShopTab === tab ? '#00ff66' : '#00f0ff' },
                    onClick: () => { AudioEngine.playSFX('click'); setActiveShopTab(tab); }
                }, tab.toUpperCase()))
            ),
            React.createElement("div", { className: "shop-grid-container" },
                itemsList.map(item => {
                    const isOwned = unlockedInventory.includes(item.id);
                    const isEquipped = equippedShape === item.id || equippedAbility === item.id || equippedTrail === item.id;
                    return React.createElement("div", { key: item.id, className: `shop-catalog-card ${isEquipped ? 'active-equipped' : ''}` },
                        React.createElement("div", { className: "item-title-text" }, item.name),
                        React.createElement("div", { className: "item-bonus-desc" }, item.desc),
                        React.createElement("button", {
                            className: `shop-action-btn ${isOwned ? 'equip-mode' : ''}`,
                            disabled: dbLoading || (!isOwned && activeCoinWallet < item.cost),
                            onClick: () => handleShopTransaction(item)
                        }, isEquipped ? "EQUIPPED" : (isOwned ? "EQUIP" : `${item.cost} COINS`))
                    );
                })
            )
        );
    };

    const renderAuthFormStructure = () => {
        return React.createElement("form", { key: "auth-form", className: "auth-form-wrapper", onSubmit: handleAuthenticationAction },
            React.createElement("div", { style: { fontSize: '13px', color: '#ff0055', textAlign: 'center', fontWeight: 'bold', marginBottom: '4px' } }, isSignUp ? "// CONFIG NEW PROFILE USERNAME" : "// CHASSIS SECURITY ACCESS REQUIRED"),
            isSignUp && React.createElement("input", { type: "text", className: "auth-row-input", placeholder: "CHOOSE AGENT USERNAME (MAX 10)", maxLength: 10, required: true, value: username, onChange: (e) => setUsername(e.target.value.toUpperCase().replace(/\s+/g, '')) }),
            React.createElement("input", { type: "email", className: "auth-row-input", placeholder: "AGENT EMAIL ACCESS PORT", required: true, value: email, onChange: (e) => setEmail(e.target.value) }),
            React.createElement("input", { type: "password", className: "auth-row-input", placeholder: "CYBER KEY PASSWORD", required: true, value: password, onChange: (e) => setPassword(e.target.value) }),
            dbError && React.createElement("div", { style: { color: '#ff0055', fontSize: '11px', textAlign: 'center' } }, dbError),
            React.createElement("button", { type: "submit", className: "neon-btn", disabled: dbLoading }, dbLoading ? "PROCESSING MATRIX..." : (isSignUp ? "GENERATE PROFILE" : "ESTABLISH SESSION")),
            React.createElement("div", { className: "auth-toggle-link", onClick: () => { AudioEngine.playSFX('click'); setIsSignUp(!isSignUp); setDbError(null); } }, isSignUp ? "Already registered? Load existing session" : "New Agent? Create custom profile blueprint")
        );
    };

    // 🕹️ REWRITE: INTEGRATED FIXED DYNAMIC FOOTER ELEMENT TARGETS
    const renderStartScreenView = () => {
        const unifiedGlobalFooterElement = React.createElement("div", { className: "cyber-footer" }, "NEON SURVIVAL PROTOCOL v1.2.5 // SECURE ARCHITECTURE NETWORK // ENGINE SEASON 2026");

        if (showStartLeaderboard) {
            return React.createElement("div", { className: "screen-overlay" },
                React.createElement("div", { className: "neon-title title-blue" }, "NEON SURVIVAL PROTOCOL"),
                renderLeaderboardStructure(),
                React.createElement("button", { className: "neon-btn", style: { marginTop: '20px' }, onClick: toggleStartLeaderboardMode }, "BACK TO UPLINK"),
                unifiedGlobalFooterElement
            );
        }

        if (user && showShop) {
            return React.createElement("div", { className: "screen-overlay" },
                React.createElement("div", { className: "neon-title title-green" }, "GEAR CUSTOMIZATION SHOP"),
                React.createElement("div", { className: "summary-text", style: { color: '#00f0ff', fontWeight: 'bold' } }, `AVAILABLE COIN MATRIX: ${activeCoinWallet} COINS`),
                renderTerminalShopStructure(),
                React.createElement("button", { className: "neon-btn", style: { marginTop: '10px', borderColor: '#ff0055', color: '#ff0055' }, onClick: () => { AudioEngine.playSFX('click'); setShowShop(false); } }, "RETURN TO MAIN TERMINAL"),
                unifiedGlobalFooterElement
            );
        }

        let dynamicControlZone;
        if (!user) {
            dynamicControlZone = renderAuthFormStructure();
        } else {
            dynamicControlZone = React.createElement("div", { key: "welcome-box", style: { textAlign: 'center', width: '100%' } },
                React.createElement("div", { className: "summary-text", style: { color: '#00ff66', fontWeight: 'bold' } }, `CONNECTED AGENT: [${username}]`),
                React.createElement("div", { className: "summary-text", style: { color: '#00f0ff', marginBottom: '15px' } }, `TOTAL WALLET BALANCE: ${activeCoinWallet} COINS`),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px' }, onClick: initializeGameSession }, "LAUNCH SIMULATION CORE"),
                    React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ffaa00', color: '#ffaa00' }, onClick: () => { AudioEngine.playSFX('click'); setShowShop(true); } }, "OPEN UPGRADE STORE"),
                    React.createElement("button", { className: "neon-btn", style: { width: '80%', maxWidth: '280px', borderColor: '#ff0055', color: '#ff0055' }, onClick: handleSignOut }, "TERMINATE CONNECTION")
                )
            );
        }

        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-blue" }, "NEON SURVIVAL PROTOCOL"),
            dynamicControlZone,
            renderAudioSettingsMenu(),
            React.createElement("button", { className: "neon-btn", style: { marginTop: '4px', fontSize: '13px', padding: '6px 14px', borderColor: '#ff0055', color: '#ff0055' }, onClick: toggleStartLeaderboardMode }, "VIEW GLOBAL LEADERBOARD"),
            unifiedGlobalFooterElement
        );
    };

    const renderGameOverScreenView = () => {
        return React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-red" }, "SIMULATION TERMINATED"),
            React.createElement("div", { className: "summary-text" }, `AGENT [${username}] CHASSIS DESTROYED.`),
            React.createElement("div", { className: "summary-text", style: { color: '#00ff66', fontWeight: 'bold' } }, `ACQUIRED IN OPERATION: +${sessionCoinsAccumulated} COINS`),
            renderLeaderboardStructure(),
            React.createElement("div", { style: { marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' } },
                !scoreSubmitted ? React.createElement("button", { className: "neon-btn", disabled: dbLoading, onClick: submitScoreToDatabase }, dbLoading ? "SYNCING..." : "SYNC AGENT DATA") : null,
                React.createElement("button", { className: "neon-btn", onClick: startSimulation }, "REBOOT CHASSIS"),
                React.createElement("button", { className: "neon-btn", style: { borderColor: '#00f0ff', color: '#00f0ff' }, onClick: () => { AudioEngine.playSFX('click'); setGameState('START_SCREEN'); } }, "MAIN MENU")
            ),
            React.createElement("div", { className: "cyber-footer" }, "NEON SURVIVAL PROTOCOL v1.2.5 // SECURE ARCHITECTURE NETWORK // ENGINE SEASON 2026")
        );
    };

    return React.createElement("div", { id: "game-container" },
        React.createElement("canvas", { ref: canvasRef }),
        gameState === 'PLAY' ? React.createElement("div", { className: "mobile-input-layer", onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd }, React.createElement("div", { className: "joystick-base" }, React.createElement("div", { ref: knobRef, className: "joystick-knob" }))) : null,
        gameState === 'PLAY' ? React.createElement("div", { className: "hud-overlay" },
            React.createElement("div", { className: "xp-container" }, React.createElement("div", { className: "xp-bar", style: { width: `${Math.min(100, (hud.xp / hud.xpNeeded) * 100)}%` } })),
            React.createElement("div", { className: "stats-panel time-left" }, "TIME: ", hud.time),
            React.createElement("div", { className: "stats-panel kill-count" }, "COINS: ", hud.coins),
            React.createElement("div", { className: "hp-container" }, React.createElement("div", { className: "hp-bar", style: { width: `${Math.max(0, Math.min(100, hud.health))}%` } })),
            bossHp.active ? React.createElement("div", { className: "boss-container" }, React.createElement("div", { className: "boss-bar", style: { width: `${Math.max(0, Math.min(100, (bossHp.current / bossHp.max) * 100))}%` } })) : null
        ) : null,
        gameState === 'START_SCREEN' ? renderStartScreenView() : null,
        gameState === 'LEVEL_UP' ? React.createElement("div", { className: "screen-overlay" }, React.createElement("div", { className: "neon-title title-blue" }, "SYSTEM UPGRADE // CHOOSE CONFIG"), React.createElement("div", { className: "upgrades-grid" }, cards.map(c => React.createElement("div", { key: c.id, className: "upgrade-card", onClick: () => applyModifierCard(c.id) }, React.createElement("div", { className: "card-name" }, c.name, " [LVL ", c.lvl + 1, "]"), React.createElement("div", { className: "card-desc" }, c.desc))))) : null,
        gameState === 'GAME_OVER' ? renderGameOverScreenView() : null
    );
}

// Fixed Safe Initialization Mount Handler
window.addEventListener('DOMContentLoaded', () => { const rootElement = document.getElementById('root'); if (rootElement) { ReactDOM.createRoot(rootElement).render(React.createElement(CyberpunkSurvival)); } });

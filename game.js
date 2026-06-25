// --- CRITICAL CONFIGURATION PARAMS ---
const SUPABASE_URL = 'https://xmbjhlyrswvlwfknktey.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYmpobHlyc3d2bHdma25rdGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzc3OTQsImV4cCI6MjA5Nzk1Mzc5NH0.6FEB8ZqvlUdYeZb9DPu5bVfeAHbJVvZHhtIBCFlS9gY';

// Separated instance reference completely to guarantee absolute scope shielding
const cyberbase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { useEffect, useRef, useState } = React;

function CyberpunkSurvival() {
    const canvasRef = useRef(null);
    const knobRef = useRef(null);

    // React Menu Engine Interfaces States
    const [gameState, setGameState] = useState('START_SCREEN'); 
    const [hud, setHud] = useState({ health: 100, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00" });
    const [bossHp, setBossHp] = useState({ current: 0, max: 250, active: false });
    const [cards, setCards] = useState([]);

    // Cloud Database & Synchronization States
    const [playerName, setPlayerName] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbError, setDbError] = useState(null);
    const [showStartLeaderboard, setShowStartLeaderboard] = useState(false); 
    const [finalUpgradesManifest, setFinalUpgradesManifest] = useState([]);
    
    // Prevent selections from registering twice due to mobile click latency
    const isSelectionLocked = useRef(false);


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
    
    // Delta-Time Synchronization Engine Parameters
    const gameMetrics = useRef({ accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0 }); 
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

    const initializeGameSession = () => {
        const cleanedName = playerName.trim().toUpperCase().replace(/\s+/g, '');
        if (!cleanedName || cleanedName.length > 10) return;
        setPlayerName(cleanedName);
        startSimulation();
    };

    const startSimulation = () => {
        const p = playerRef.current;
        p.x = 400; p.y = 300; p.health = 100; p.level = 1; p.xp = 0; p.xpNeeded = 12; p.speedMult = 1; p.laserCooldown = 180; p.pickupRadius = p.basePickupRadius;
        enemiesRef.current = []; projectilesRef.current = []; gemsRef.current = []; particlesRef.current = [];
        gameMetrics.current = { accumTime: 0, clockSeconds: 0, killCounter: 0, bossesKilled: 0 };
        touchVectorRef.current = { x: 0, y: 0 };
        bossSpawnedForCurrentMilestone.current = false;
        lastTimestamp.current = performance.now();
        setScoreSubmitted(false);
        setShowStartLeaderboard(false);
        setFinalUpgradesManifest([]);
        isSelectionLocked.current = false;
        Object.keys(upgradesRef.current).forEach(k => upgradesRef.current[k].lvl = 0);
        setBossHp({ current: 0, max: 250, active: false });
        setHud({ health: 100, level: 1, xp: 0, xpNeeded: 12, kills: 0, time: "00:00" });
        setGameState('PLAY');
    };

    // Database Isolation Infrastructure
    const fetchLeaderboardScores = async () => {
        setDbLoading(true);
        setDbError(null);
        try {
            const { data, error } = await cyberbase
                .from('leaderboard')
                .select('player_name, kills, survival_time')
                .order('kills', { ascending: false })
                .limit(5);
            
            if (error) throw error;
            setLeaderboard(data || []);
        } catch (err) {
            console.error("Database connection failure:", err.message);
            setDbError("Leaderboard unavailable");
        } finally {
            setDbLoading(false);
        }
    };

    const submitScoreToDatabase = async () => {
        const validatedName = playerName.trim();
        if (!validatedName || scoreSubmitted) return;
        setDbLoading(true);
        try {
            const { error } = await cyberbase
                .from('leaderboard')
                .insert([
                    { player_name: validatedName, kills: gameMetrics.current.killCounter, survival_time: hud.time }
                ]);
            
            if (error) throw error;
            setScoreSubmitted(true);
            await fetchLeaderboardScores(); 
        } catch (err) {
            console.error("Database submission crash saved locally:", err.message);
            setDbError("Sync failed - Score locked locally");
        } finally {
            setDbLoading(false);
        }
    };

    const toggleStartLeaderboardMode = () => {
        if (!showStartLeaderboard) fetchLeaderboardScores();
        setShowStartLeaderboard(!showStartLeaderboard);
    };

    const compileFinalUpgradesReport = () => {
        const report = Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.lvl > 0);
        setFinalUpgradesManifest(report);
    };

    useEffect(() => {
        if (gameState === 'GAME_OVER') {
            fetchLeaderboardScores();
            compileFinalUpgradesReport();
        }
    }, [gameState]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const handleKey = (e, status) => { keysRef.current[e.key.toLowerCase()] = status; };
        const listenDown = (e) => handleKey(e, true);
        const listenUp = (e) => handleKey(e, false);

        window.addEventListener('keydown', listenDown);
        window.addEventListener('keyup', listenUp);

        // Locate and replace this exact function inside game_2.js:
        const resizeCanvasBufferToViewport = () => {
            const container = canvas.parentElement;
            if (!container) return;
            
            // Forces the canvas to snap perfectly to its physical layout box bounds
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            
            // DYNAMICALLY RE-ANCHOR THE CAMERA BOUNDARIES
            // This stops components and enemies from overflowing past the bottom border!
            logicalWidth = container.clientWidth;
            logicalHeight = container.clientHeight;
        };
        window.addEventListener('resize', resizeCanvasBufferToViewport);
        resizeCanvasBufferToViewport();

        // High Performance Frame Processing Core Execution Loop
        const runEngineStep = (timestamp) => {
            if (!lastTimestamp.current) lastTimestamp.current = timestamp;
            let dt = timestamp - lastTimestamp.current;
            lastTimestamp.current = timestamp;

            if (dt > 100) dt = 16.66; 
            const frameRatio = dt / 16.666;

            const bossActive = enemiesRef.current.some(e => e.type === 'boss');

            if (gameState === 'PLAY') {
                const p = playerRef.current;
                const metrics = gameMetrics.current;
                
                metrics.accumTime += dt;
                if (metrics.accumTime >= 1000) {
                    metrics.accumTime -= 1000;
                    metrics.clockSeconds++;
                    const min = Math.floor(metrics.clockSeconds / 60).toString().padStart(2, '0');
                    const sec = (metrics.clockSeconds % 60).toString().padStart(2, '0');
                    setHud(prev => ({ ...prev, time: `${min}:${sec}` }));
                }

                // Compile Movement Vector Velocities
                let mx = 0, my = 0;
                if (keysRef.current['w'] || keysRef.current['arrowup']) my = -1;
                if (keysRef.current['s'] || keysRef.current['arrowdown']) my = 1;
                if (keysRef.current['a'] || keysRef.current['arrowleft']) mx = -1;
                if (keysRef.current['d'] || keysRef.current['arrowright']) mx = 1;

                if (mx !== 0 || my !== 0) {
                    const len = Math.hypot(mx, my);
                    const normalizeX = mx / len;
                    const normalizeY = my / len;
                    p.x += normalizeX * (p.baseSpeed * p.speedMult) * frameRatio;
                    p.y += normalizeY * (p.baseSpeed * p.speedMult) * frameRatio;
                    p.lastDir = { x: normalizeX, y: normalizeY };
                } else if (touchVectorRef.current.x !== 0 || touchVectorRef.current.y !== 0) {
                    const tx = touchVectorRef.current.x;
                    const ty = touchVectorRef.current.y;
                    p.x += tx * (p.baseSpeed * p.speedMult) * frameRatio;
                    p.y += ty * (p.baseSpeed * p.speedMult) * frameRatio;
                    const touchLen = Math.hypot(tx, ty);
                    if (touchLen > 0.1) p.lastDir = { x: tx / touchLen, y: ty / touchLen };
                }

                cameraRef.current.x = p.x - logicalWidth / 2;
                cameraRef.current.y = p.y - logicalHeight / 2;

                // Firing System Update Engine Block
                if (p.fireCooldown > 0) p.fireCooldown -= frameRatio;
                if (p.fireCooldown <= 0 && enemiesRef.current.length > 0) {
                    let target = null, minDist = Infinity;
                    enemiesRef.current.forEach(e => {
                        const d = Math.hypot(e.x - p.x, e.y - p.y);
                        if (d < minDist) { minDist = d; target = e; }
                    });
                    if (target && minDist < 500) {
                        const angle = Math.atan2(target.y - p.y, target.x - p.x);
                        const bulletSpeed = 9;
                        const attackLvl = upgradesRef.current.attackSpeed.lvl;

                        if (attackLvl >= 4) {
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * bulletSpeed, vy: Math.sin(angle) * bulletSpeed, radius: 5, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle - 0.25) * bulletSpeed, vy: Math.sin(angle - 0.25) * bulletSpeed, radius: 4, laser: false, dead: false });
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle + 0.25) * bulletSpeed, vy: Math.sin(angle + 0.25) * bulletSpeed, radius: 4, laser: false, dead: false });
                        } else {
                            projectilesRef.current.push({ x: p.x, y: p.y, vx: Math.cos(angle) * bulletSpeed, vy: Math.sin(angle) * bulletSpeed, radius: 5, laser: false, dead: false });
                        }
                        const nextCooldown = p.baseFireRate * (1 - Math.min(0.75, attackLvl * 0.20));
                        p.fireCooldown = Math.max(5, nextCooldown);
                    }
                }

                if (upgradesRef.current.laser.lvl > 0) {
                    p.laserCooldown -= frameRatio;
                    if (p.laserCooldown <= 0) {
                        const angle = Math.atan2(p.lastDir.y, p.lastDir.x);
                        const laserLvl = upgradesRef.current.laser.lvl;
                        const lWidth = laserLvl >= 4 ? 54 : 34;
                        const lDuration = laserLvl >= 4 ? 25 : 15;
                        projectilesRef.current.push({ x: p.x, y: p.y, angle: angle, width: lWidth, length: 1200, duration: lDuration, laser: true, dead: false });
                        p.laserCooldown = Math.max(70, 190 - laserLvl * 25);
                    }
                }

                if (upgradesRef.current.shield.lvl > 0) {
                    const spinVelocity = upgradesRef.current.shield.lvl >= 5 ? 0.09 : 0.04;
                    p.shieldAngle += spinVelocity * frameRatio;
                }

                const difficultyMod = 1 + metrics.bossesKilled * 0.5;
                const currentSec = metrics.clockSeconds;
                
                if (!metrics.tickTracker) metrics.tickTracker = 0;
                metrics.tickTracker += frameRatio;

                let spawnThreshold = currentSec > 120 ? 22 : (currentSec > 60 ? 35 : 48);
                if (metrics.tickTracker >= spawnThreshold && !bossActive) {
                    metrics.tickTracker = 0;
                    const angle = Math.random() * Math.PI * 2;
                    const sx = p.x + Math.cos(angle) * 540; const sy = p.y + Math.sin(angle) * 540;
                    
                    let pool = ['drone', 'drone'];
                    if (currentSec >= 30) pool.push('breacher', 'breacher');
                    if (currentSec >= 65) pool.push('hound');
                    if (currentSec >= 110) pool.push('goliath');
                    const chosen = pool[Math.floor(Math.random() * pool.length)];

                    let enemyConfig = { x: sx, y: sy, type: chosen, dead: false, state: 'chase', timer: 0 };
                    if (chosen === 'drone') { enemyConfig.hp = Math.floor(1 * difficultyMod); enemyConfig.speed = 1.6; enemyConfig.r = 11; enemyConfig.color = '#ff0055'; enemyConfig.shape = 'sq'; }
                    if (chosen === 'breacher') { enemyConfig.hp = Math.floor(2 * difficultyMod); enemyConfig.speed = 3.2; enemyConfig.r = 10; enemyConfig.color = '#ffaa00'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'hound') { enemyConfig.hp = Math.floor(3 * difficultyMod); enemyConfig.speed = 2.4; enemyConfig.r = 12; enemyConfig.color = '#ff00aa'; enemyConfig.shape = 'tri'; }
                    if (chosen === 'goliath') { enemyConfig.hp = Math.floor(28 * difficultyMod); enemyConfig.speed = 0.7; enemyConfig.r = 24; enemyConfig.color = '#00f0ff'; enemyConfig.shape = 'oct'; }
                    
                    enemyConfig.maxHp = enemyConfig.hp;
                    enemiesRef.current.push(enemyConfig);
                }

                const expectedBossesSpawned = Math.floor(currentSec / 180);
                if (expectedBossesSpawned > metrics.bossesKilled) {
                    if (!bossSpawnedForCurrentMilestone.current && !bossActive) {
                        const bx = p.x; const by = p.y - 400;
                        const bMaxHp = Math.floor(250 * (1 + metrics.bossesKilled * 0.75)); 
                        const bossNode = { x: bx, y: by, type: 'boss', hp: bMaxHp, maxHp: bMaxHp, speed: 0.8, r: 42, color: '#9900ff', shape: 'oct', dead: false, bossActionTimer: 120, state: 'normal', dashVx: 0, dashVy: 0 };
                        enemiesRef.current.push(bossNode);
                        bossSpawnedForCurrentMilestone.current = true;
                        setBossHp({ current: bMaxHp, max: bMaxHp, active: true });
                    }
                } else {
                    bossSpawnedForCurrentMilestone.current = false;
                }

                // AI Motion Mechanics
                enemiesRef.current.forEach(e => {
                    const distToPlayer = Math.hypot(p.y - e.y, p.x - e.x);

                    if (e.type === 'boss') {
                        e.bossActionTimer -= frameRatio;
                        if (e.state === 'normal') {
                            const angle = Math.atan2(p.y - e.y, p.x - e.x);
                            e.x += Math.cos(angle) * e.speed * frameRatio; 
                            e.y += Math.sin(angle) * e.speed * frameRatio;

                            if (e.bossActionTimer <= 0) {
                                e.bossActionTimer = 140 + Math.random() * 60;
                                const rollAction = Math.random();

                                if (rollAction < 0.35) {
                                    e.state = 'charge_dash'; e.timer = 30; 
                                } else if (rollAction < 0.70 && distToPlayer < 250) {
                                    e.state = 'slash_shock'; e.timer = 15;
                                } else {
                                    for (let i = 0; i < 4; i++) {
                                        const spawnAngle = (Math.PI * 2 / 4) * i;
                                        const mHp = Math.floor(1 * difficultyMod);
                                        enemiesRef.current.push({ x: e.x + Math.cos(spawnAngle) * 60, y: e.y + Math.sin(spawnAngle) * 60, type: 'drone', hp: mHp, maxHp: mHp, speed: 2.5, r: 9, color: '#a347ff', shape: 'sq', dead: false });
                                    }
                                    for (let i = 0; i < 20; i++) {
                                        const pa = Math.random() * Math.PI * 2, ps = Math.random() * 4 + 1;
                                        particlesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(pa) * ps, vy: Math.sin(pa) * ps, r: 3, alpha: 1, color: '#9900ff' });
                                    }
                                }
                            }
                        } else if (e.state === 'charge_dash') {
                            e.timer -= frameRatio;
                            if (e.timer <= 0) {
                                const angle = Math.atan2(p.y - e.y, p.x - e.x);
                                e.dashVx = Math.cos(angle) * 11; e.dashVy = Math.sin(angle) * 11;
                                e.state = 'dashing'; e.timer = 22; 
                            }
                        } else if (e.state === 'dashing') {
                            e.x += e.dashVx * frameRatio; e.y += e.dashVy * frameRatio;
                            e.timer -= frameRatio;
                            particlesRef.current.push({ x: e.x, y: e.y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, r: 4, alpha: 1, color: '#ff00aa' });
                            if (e.timer <= 0) e.state = 'normal';
                        } else if (e.state === 'slash_shock') {
                            e.timer -= frameRatio;
                            if (e.timer <= 0) {
                                if (distToPlayer < 140) {
                                    p.health = Math.max(0, p.health - 35);
                                    setHud(prev => ({ ...prev, health: p.health }));
                                    if (p.health <= 0) setGameState('GAME_OVER');
                                }
                                for (let r = 0; r < 360; r += 15) {
                                    const rad = (Math.PI / 180) * r;
                                    particlesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(rad) * 6, vy: Math.sin(rad) * 6, r: 3, alpha: 1, color: '#ff0033' });
                                }
                                e.state = 'normal';
                            }
                        }
                    } else {
                        const angle = Math.atan2(p.y - e.y, p.x - e.x);
                        if (e.type === 'breacher') {
                            if (e.state === 'chase') {
                                e.x += Math.cos(angle) * e.speed * frameRatio; 
                                e.y += Math.sin(angle) * e.speed * frameRatio;
                                if (distToPlayer < 40) { e.state = 'detonating'; e.timer = 18; }
                            } else if (e.state === 'detonating') {
                                e.timer -= frameRatio;
                                e.x += Math.cos(angle) * 0.5 * frameRatio; 
                                e.y += Math.sin(angle) * 0.5 * frameRatio;
                                if (e.timer <= 0) {
                                    e.hp = -10; 
                                    if (distToPlayer < 75) {
                                        p.health = Math.max(0, p.health - 22);
                                        setHud(prev => ({ ...prev, health: p.health }));
                                        if (p.health <= 0) setGameState('GAME_OVER');
                                    }
                                    for (let k = 0; k < 12; k++) {
                                        const pAngle = (Math.PI * 2 / 12) * k;
                                        particlesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(pAngle) * 5, vy: Math.sin(pAngle) * 5, r: 4, alpha: 1, color: '#ff7700' });
                                    }
                                }
                            }
                        } else {
                            e.x += Math.cos(angle) * e.speed * frameRatio; 
                            e.y += Math.sin(angle) * e.speed * frameRatio;
                        }
                    }

                    if (distToPlayer < e.r + p.radius) {
                        let damageAmt = 0.35;
                        if (e.type === 'boss') damageAmt = e.state === 'dashing' ? 2.5 : 1.4;
                        if (e.type === 'goliath') damageAmt = 0.8;
                        if (e.type === 'breacher' && e.state === 'chase') damageAmt = 0.5;

                        p.health = Math.max(0, Math.min(100, p.health - damageAmt * frameRatio));
                        setHud(prev => ({ ...prev, health: p.health }));
                        if (p.health <= 0) setGameState('GAME_OVER');
                    }

                    if (upgradesRef.current.shield.lvl > 0) {
                        const shields = Math.min(4, upgradesRef.current.shield.lvl);
                        for (let i = 0; i < shields; i++) {
                            const sa = p.shieldAngle + (i * (Math.PI * 2 / shields));
                            const ox = p.x + Math.cos(sa) * 65; const oy = p.y + Math.sin(sa) * 65;
                            if (Math.hypot(e.x - ox, e.y - oy) < e.r + 6) { 
                                e.hp -= (0.12 + (upgradesRef.current.shield.lvl * 0.04)) * frameRatio; 
                            }
                        }
                    }
                });

                projectilesRef.current.forEach(proj => {
                    if (proj.laser) {
                        proj.duration -= frameRatio;
                        enemiesRef.current.forEach(e => {
                            let dx = e.x - proj.x, dy = e.y - proj.y;
                            let dot = dx * Math.cos(proj.angle) + dy * Math.sin(proj.angle);
                            if (dot > 0 && dot < proj.length) {
                                let cx = proj.x + Math.cos(proj.angle) * dot;
                                let cy = proj.y + Math.sin(proj.angle) * dot;
                                if (Math.hypot(e.x - cx, e.y - cy) < e.r + proj.width / 2) e.hp -= 0.25 * frameRatio;
                            }
                        });
                        if (proj.duration <= 0) proj.dead = true;
                    } else {
                        proj.x += proj.vx * frameRatio; proj.y += proj.vy * frameRatio;
                        for (let e of enemiesRef.current) {
                            if (Math.hypot(proj.x - e.x, proj.y - e.y) < proj.radius + e.r) { 
                                proj.dead = true; e.hp -= 1; break; 
                            }
                        }
                        if (Math.hypot(proj.x - p.x, proj.y - p.y) > 900) proj.dead = true;
                    }
                });

                gemsRef.current.forEach(g => {
                    const d = Math.hypot(g.x - p.x, g.y - p.y);
                    if (g.attracted || d < p.pickupRadius) {
                        g.attracted = true; g.speed += 0.4 * frameRatio;
                        const angle = Math.atan2(p.y - g.y, p.x - g.x);
                        g.x += Math.cos(angle) * g.speed * frameRatio; 
                        g.y += Math.sin(angle) * g.speed * frameRatio;
                        
                        if (d < p.radius + 4) {
                            g.dead = true;
                            if (g.type === 'heart') {
                                p.health = Math.max(0, Math.min(100, p.health + 25));
                                setHud(prev => ({ ...prev, health: p.health }));
                            } else {
                                p.xp = Math.min(p.xpNeeded, p.xp + g.val);
                                if (p.xp >= p.xpNeeded) {
                                    p.xp -= p.xpNeeded; p.level++; p.xpNeeded = Math.floor(p.xpNeeded * 1.45) + 8;
                                    setGameState('LEVEL_UP');
                                    const options = Object.keys(upgradesRef.current).map(k => upgradesRef.current[k]).filter(u => u.id !== 'magnet' || u.lvl < 6).sort(() => Math.random() - 0.5).slice(0, 3);
                                    setCards(options);
                                }
                                setHud(prev => ({ ...prev, level: p.level, xp: p.xp, xpNeeded: p.xpNeeded }));
                            }
                        }
                    }
                });

                enemiesRef.current.forEach(e => {
                    if (e.hp <= 0) {
                        e.dead = true; 
                        if (e.hp !== -10) metrics.killCounter++; 
                        setHud(prev => ({ ...prev, kills: metrics.killCounter }));
                        
                        for (let i = 0; i < (e.type === 'boss' ? 50 : 10); i++) {
                            const pa = Math.random() * Math.PI * 2, ps = Math.random() * (e.type === 'boss' ? 6 : 3) + 1;
                            particlesRef.current.push({ x: e.x, y: e.y, vx: Math.cos(pa) * ps, vy: Math.sin(pa) * ps, r: Math.random() * 2.5 + 1, alpha: 1, color: e.color });
                        }

                        if (e.type === 'boss') { 
                            metrics.bossesKilled++;
                            setBossHp({ current: 0, max: 250, active: false });
                            gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false });
                            for (let i = 0; i < 15; i++) {
                                gemsRef.current.push({ x: e.x + (Math.random() * 80 - 40), y: e.y + (Math.random() * 80 - 40), val: 6, speed: 1, attracted: false, dead: false });
                            }
                        } else {
                            if (e.type === 'goliath' || (e.type === 'hound' && Math.random() < 0.12)) {
                                gemsRef.current.push({ x: e.x, y: e.y, type: 'heart', speed: 1, attracted: false, dead: false });
                            }
                            const yields = e.type === 'goliath' ? 6 : (e.type === 'hound' ? 2 : 1);
                            for (let i = 0; i < yields; i++) {
                                gemsRef.current.push({ x: e.x + (Math.random() * 14 - 7), y: e.y + (Math.random() * 14 - 7), val: e.type === 'goliath' ? 2 : 1, speed: 1, attracted: false, dead: false });
                            }
                        }
                    }
                });

                if (bossActive) {
                    const bNode = enemiesRef.current.find(e => e.type === 'boss');
                    if (bNode) setBossHp(prev => ({ ...prev, current: Math.max(0, Math.min(bNode.maxHp, bNode.hp)) }));
                }

                enemiesRef.current = enemiesRef.current.filter(e => !e.dead);
                projectilesRef.current = projectilesRef.current.filter(p => !p.dead);
                gemsRef.current = gemsRef.current.filter(g => !g.dead);
                
                particlesRef.current.forEach(pt => { pt.x += pt.vx * frameRatio; pt.y += pt.vy * frameRatio; pt.alpha -= 0.025 * frameRatio; });
                particlesRef.current = particlesRef.current.filter(pt => pt.alpha > 0);
            }

            // --- CANVAS RENDERING ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const scaleX = canvas.width / logicalWidth;
            const scaleY = canvas.height / logicalHeight;
            
            ctx.save();
            ctx.scale(scaleX, scaleY); 

            const cx = cameraRef.current.x, cy = cameraRef.current.y;

            ctx.save(); ctx.strokeStyle = '#121226'; ctx.lineWidth = 1;
            let size = 50, startX = -(cx % size), startY = -(cy % size);
            for (let x = startX; x < logicalWidth; x += size) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, logicalHeight); ctx.stroke(); }
            for (let y = startY; y < logicalHeight; y += size) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(logicalWidth, y); ctx.stroke(); }
            ctx.restore();

            enemiesRef.current.forEach(e => {
                if (e.type === 'boss' && e.state === 'charge_dash') {
                    ctx.save(); ctx.strokeStyle = 'rgba(255, 0, 85, 0.4)'; ctx.lineWidth = 40; ctx.setLineDash([10, 10]);
                    const targetAngle = Math.atan2(playerRef.current.y - e.y, playerRef.current.x - e.x);
                    ctx.beginPath(); ctx.moveTo(e.x - cx, e.y - cy);
                    ctx.lineTo((e.x + Math.cos(targetAngle) * 800) - cx, (e.y + Math.sin(targetAngle) * 800) - cy); ctx.stroke(); ctx.restore();
                }
            });

            gemsRef.current.forEach(g => {
                ctx.save(); 
                if (g.type === 'heart') {
                    ctx.fillStyle = '#ff0055'; ctx.shadowBlur = 12; ctx.shadowColor = '#ff0055';
                    ctx.beginPath(); ctx.arc(g.x - cx, g.y - cy, 6, 0, Math.PI * 2); ctx.fill();
                } else {
                    ctx.fillStyle = g.val > 1 ? '#00ffff' : '#00ff66'; ctx.shadowBlur = 8; ctx.shadowColor = ctx.fillStyle;
                    ctx.beginPath(); ctx.arc(g.x - cx, g.y - cy, g.val > 1 ? 5 : 3.5, 0, Math.PI * 2); ctx.fill();
                }
                ctx.restore();
            });

            projectilesRef.current.forEach(p => {
                ctx.save(); ctx.shadowBlur = 10; ctx.shadowColor = p.laser ? '#9900ff' : '#00f0ff';
                if (p.laser) {
                    ctx.strokeStyle = '#9900ff'; ctx.lineWidth = p.width * (p.duration / 20);
                    ctx.beginPath(); ctx.moveTo(p.x - cx, p.y - cy); ctx.lineTo((p.x + Math.cos(p.angle) * p.length) - cx, (p.y + Math.sin(p.angle) * p.length) - cy); ctx.stroke();
                } else {
                    ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(p.x - cx, p.y - cy, p.radius, 0, Math.PI * 2); ctx.fill();
                }
                ctx.restore();
            });

            enemiesRef.current.forEach(e => {
                ctx.save(); ctx.shadowBlur = e.type === 'boss' ? 15 : 8; ctx.shadowColor = e.color; ctx.strokeStyle = e.color; ctx.lineWidth = 2;
                
                const frameCheck = Math.floor(performance.now() / 50);
                if (e.type === 'breacher' && e.state === 'detonating') {
                    ctx.fillStyle = frameCheck % 2 === 0 ? '#ff0000' : '#030307';
                } else {
                    ctx.fillStyle = '#030307';
                }

                ctx.beginPath();
                if (e.shape === 'sq') { ctx.strokeRect(e.x - e.r - cx, e.y - e.r - cy, e.r * 2, e.r * 2); ctx.fillRect(e.x - e.r - cx, e.y - e.r - cy, e.r * 2, e.r * 2); }
                else if (e.shape === 'tri') { ctx.moveTo(e.x - cx, e.y - e.r - cy); ctx.lineTo(e.x + e.r - cx, e.y + e.r - cy); ctx.lineTo(e.x - e.r - cx, e.y + e.r - cy); ctx.closePath(); ctx.fill(); ctx.stroke(); }
                else {
                    let sides = e.shape === 'pent' ? 5 : 8;
                    for (let i = 0; i < sides; i++) {
                        let a = (Math.PI * 2 / sides) * i - Math.PI / 2;
                        let px = e.x + Math.cos(a) * e.r - cx, py = e.y + Math.sin(a) * e.r - cy;
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                }
                ctx.restore();
            });

            particlesRef.current.forEach(pt => {
                ctx.save(); ctx.globalAlpha = pt.alpha; ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(pt.x - cx, pt.y - cy, pt.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
            });

            const pNode = playerRef.current;
            ctx.save(); ctx.shadowBlur = 12; ctx.shadowColor = '#00f0ff'; ctx.strokeStyle = '#00f0ff'; ctx.fillStyle = '#030307'; ctx.lineWidth = 3;
            ctx.translate(pNode.x - cx, pNode.y - cy); ctx.rotate(Math.atan2(pNode.lastDir.y, pNode.lastDir.x));
            ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-12, -13); ctx.lineTo(-6, 0); ctx.lineTo(-12, 13); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();

            if (upgradesRef.current.shield.lvl > 0) {
                ctx.save(); ctx.shadowBlur = 8; ctx.shadowColor = '#00ff66'; ctx.fillStyle = '#00ff66';
                const shields = Math.min(4, upgradesRef.current.shield.lvl);
                for (let i = 0; i < shields; i++) {
                    const sa = pNode.shieldAngle + (i * (Math.PI * 2 / shields));
                    ctx.beginPath(); ctx.arc((pNode.x + Math.cos(sa) * 65) - cx, (pNode.y + Math.sin(sa) * 65) - cy, 5.5, 0, Math.PI * 2); ctx.fill();
                }
                ctx.restore();
            }

            ctx.restore(); 
            
            cancelEngineId.current = requestAnimationFrame(runEngineStep);
        };

        cancelEngineId.current = requestAnimationFrame(runEngineStep);

        return () => {
            if (cancelEngineId.current) cancelAnimationFrame(cancelEngineId.current);
            window.removeEventListener('keydown', listenDown);
            window.removeEventListener('keyup', listenUp);
            window.removeEventListener('resize', resizeCanvasBufferToViewport);
        };
    }, [gameState]);

    const handleTouchMove = (e) => {
        if (gameState !== 'PLAY') return;
        const touch = e.touches[0]; const base = e.currentTarget.getBoundingClientRect();
        const centerX = base.left + base.width / 2; const centerY = base.top + base.height / 2;
        const deltaX = touch.clientX - centerX; const deltaY = touch.clientY - centerY;
        const totalDistance = Math.hypot(deltaX, deltaY);
        const maxBoundary = 40; let finalX = deltaX; let finalY = deltaY;

        if (totalDistance > maxBoundary) {
            finalX = (deltaX / totalDistance) * maxBoundary; finalY = (deltaY / totalDistance) * maxBoundary;
        }
        if (knobRef.current) knobRef.current.style.transform = `translate(${finalX}px, ${finalY}px)`;
        touchVectorRef.current = { x: finalX / maxBoundary, y: finalY / maxBoundary };
    };

    const handleTouchEnd = () => {
        touchVectorRef.current = { x: 0, y: 0 };
        if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)';
    };

    const applyModifierCard = (id) => {
        if (isSelectionLocked.current) return;
        isSelectionLocked.current = true; 

        const up = upgradesRef.current[id]; up.lvl++;
        if (id === 'speed') playerRef.current.speedMult += 0.15;
        if (id === 'magnet') {
            playerRef.current.pickupRadius = playerRef.current.basePickupRadius + (upgradesRef.current.magnet.lvl * 60);
        }
        
        setGameState('PLAY');
        setTimeout(() => { isSelectionLocked.current = false; }, 200);
    };

    const renderLeaderboardStructure = () => {
        return React.createElement("div", { style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            React.createElement("h3", { style: { color: '#00f0ff', margin: '10px 0 5px 0' } }, "// TOP SIMULATION RECORDS"),
            
            dbError ? React.createElement("div", { style: { fontSize: '12px', color: '#ff0055', fontWeight: 'bold' } }, `>> ${dbError.toUpperCase()}`) :
            dbLoading && leaderboard.length === 0 ? React.createElement("div", { style: { fontSize: '12px', color: '#00f0ff', animation: 'pulse 1s infinite' } }, "FETCHING REALTIME CLOUD CHANNELS...") :
            React.createElement("table", { className: "leaderboard-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "AGENT"),
                        React.createElement("th", null, "ELIMINATIONS"),
                        React.createElement("th", null, "DURATION")
                    )
                ),
                React.createElement("tbody", null,
                    leaderboard.map((row, index) => React.createElement("tr", { key: index, style: { color: index === 0 ? '#00ff66' : '#fff' } },
                        React.createElement("td", null, row.player_name),
                        React.createElement("td", null, row.kills),
                        React.createElement("td", null, row.survival_time)
                    ))
                )
            )
        );
    };

    const renderUpgradesManifestReport = () => {
        if (finalUpgradesManifest.length === 0) return null;
        return React.createElement("div", { style: { margin: '8px 0', width: '80%', maxWidth: '450px', background: 'rgba(255,255,255,0.03)', border: '1px dashed #333', padding: '10px', borderRadius: '4px' } },
            React.createElement("div", { style: { fontSize: '11px', color: '#888', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold' } }, ">> RETRIEVED CHASSIS INVENTORY LOADOUT:"),
            React.createElement("div", { style: { display: 'flex', fontSize: '12px', width: '100%' } },
                finalUpgradesManifest.map(u => React.createElement("div", { key: u.id, style: { display: 'flex', fontSize: '12px', width: '100%' } },
                    React.createElement("span", { style: { color: '#00f0ff', flex: 1, textAlign: 'left' } }, u.name),
                    React.createElement("span", { style: { color: '#00ff66', fontWeight: 'bold' } }, "LVL ", u.lvl)
                ))
            )
        );
    };

    const renderArcadeThreatIntelList = () => {
        const threats = [
            { name: "CYBER DRONE", desc: "Basic grid swarm unit. Low HP, predictable linear paths.", color: "#ff0055" },
            { name: "BREACHER BOMB", desc: "Suicide vector. Accelerates sharply and explodes on contact.", color: "#ffaa00" },
            { name: "REAPER HOUND", desc: "Agile flank hunter. Moves fast, moderate health pools.", color: "#ff00aa" },
            { name: "GOLIATH TANK", desc: "Heavy mech vanguard. Extremely high HP blocks, drops extra items.", color: "#00f0ff" },
            { name: "MEGAMECH ANCHOR", desc: "MIGHEST THREAT BOSS. Dashes, circular slashes, summons swarms.", color: "#9900ff" }
        ];

        return React.createElement("div", { style: { width: '85%', maxWidth: '480px', background: 'rgba(0, 240, 255, 0.02)', border: '1px solid #1a3a4a', borderRadius: '6px', padding: '12px', margin: '15px 0', textAlign: 'left' } },
            React.createElement("div", { style: { fontSize: '12px', color: '#00f0ff', fontWeight: 'bold', borderBottom: '1px solid #00f0ff', paddingBottom: '4px', marginBottom: '8px', letterSpacing: '1px' } }, "// DETECTED SECTOR HOSTILES INTEL:"),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
                threats.map((t, idx) => React.createElement("div", { key: idx, style: { fontSize: '11px', display: 'flex', gap: '8px', alignItems: 'start' } },
                    React.createElement("span", { style: { color: t.color, fontWeight: 'bold', minWidth: '110px', display: 'inline-block' } }, `[${t.name}]`),
                    React.createElement("span", { style: { color: '#aaa', lineHeight: '1.3' } }, t.desc)
                ))
            )
        );
    };

    return React.createElement("div", { id: "game-container" },
        React.createElement("canvas", { ref: canvasRef }),
        
        React.createElement("div", { className: "mobile-input-layer", onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd },
            React.createElement("div", { className: "joystick-base" },
                React.createElement("div", { ref: knobRef, className: "joystick-knob" })
            )
        ),

        gameState === 'PLAY' && React.createElement("div", { className: "hud-overlay" },
            React.createElement("div", { className: "xp-container" },
                React.createElement("div", { className: "xp-bar", style: { width: `${Math.min(100, (hud.xp / hud.xpNeeded) * 100)}%` } })
            ),
            React.createElement("div", { className: "stats-panel time-left" }, "TIME: ", hud.time),
            React.createElement("div", { className: "stats-panel kill-count" }, "KILLS: ", hud.kills),
            React.createElement("div", { className: "hp-container" },
                React.createElement("div", { className: "hp-bar", style: { width: `${Math.max(0, Math.min(100, hud.health))}%` } })
            ),
            bossHp.active && React.createElement("div", { className: "boss-container" },
                React.createElement("div", { className: "boss-bar", style: { width: `${Math.max(0, Math.min(100, (bossHp.current / bossHp.max) * 100))}%` } })
            )
        ),

        gameState === 'START_SCREEN' && React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "game-logo-wrapper" },
                React.createElement("div", { className: "neon-logo-text" }, "N//S//P")
            ),

            React.createElement("div", { className: "neon-title title-blue" }, "NEON SURVIVAL PROTOCOL"),
            
            !showStartLeaderboard ? [
                React.createElement("div", { key: "welcome-txt", className: "summary-text", style: { marginBottom: '5px' } }, "ESTABLISHING CHASSIS UPLINK SIMULATION... AUTHORIZE IDENTITY:"),
                renderArcadeThreatIntelList(), 
                React.createElement("div", { key: "input-box", className: "leaderboard-input-box", style: { margin: '5px 0' } },
                    React.createElement("input", { 
                        type: "text", 
                        className: "cyber-input", 
                        placeholder: "AGENT ID", 
                        maxLength: 10,
                        value: playerName,
                        onChange: (e) => setPlayerName(e.target.value.toUpperCase().replace(/\s+/g, ''))
                    }),
                    React.createElement("button", { 
                        className: "neon-btn", 
                        disabled: !playerName.trim() || dbLoading,
                        style: { opacity: playerName.trim() ? 1 : 0.5 }, 
                        onClick: initializeGameSession 
                    }, "LAUNCH CORE")
                ),
                React.createElement("button", { key: "global-lookup-btn", className: "neon-btn", style: { marginTop: '10px', fontSize: '13px', padding: '6px 14px', borderColor: '#ff0055', color: '#ff0055', boxShadow: '0 0 10px rgba(255,0,85,0.2)' }, onClick: toggleStartLeaderboardMode }, "VIEW GLOBAL LEADERBOARD")
            ] : [
                React.createElement("div", { key: "leaderboard-embed", style: { width: '100%' } }, renderLeaderboardStructure()),
                React.createElement("button", { key: "back-uplink-btn", className: "neon-btn", style: { marginTop: '20px' }, onClick: toggleStartLeaderboardMode }, "BACK TO UPLINK")
            ]
        ),

        gameState === 'LEVEL_UP' && React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-blue" }, "SYSTEM UPGRADE // CHOOSE CONFIG"),
            React.createElement("div", { className: "upgrades-grid" },
                cards.map(c => React.createElement("div", { key: c.id, className: "upgrade-card", onClick: () => applyModifierCard(c.id) },
                    React.createElement("div", { className: "card-name" }, c.name, " [LVL ", c.lvl + 1, "]"),
                    React.createElement("div", { className: "card-desc" }, c.desc)
                ))
            )
        ),

        gameState === 'GAME_OVER' && React.createElement("div", { className: "screen-overlay" },
            React.createElement("div", { className: "neon-title title-red" }, "SIMULATION TERMINATED"),
            React.createElement("div", { className: "summary-text" }, "AGENT [", playerName, "] CHASSIS DESTROYED.", React.createElement("br"), "FINAL PURGE STATISTICS: ", hud.kills, " TARGETS | CLOCK: ", hud.time),
            renderUpgradesManifestReport(), 
            renderLeaderboardStructure(),
            React.createElement("div", { style: { marginTop: '15px', display: 'flex', gap: '15px' } },
                !scoreSubmitted && React.createElement("button", { className: "neon-btn", disabled: dbLoading, onClick: submitScoreToDatabase }, dbLoading ? "SYNCING..." : "SYNC AGENT DATA"),
                React.createElement("button", { className: "neon-btn", onClick: startSimulation }, "REBOOT CHASSIS")
            )
        )
    );
}

// Fixed Safe Initialization Mount Handler
window.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(CyberpunkSurvival));
    } else {
        console.error("Critical Failure: React container node not found.");
    }
});
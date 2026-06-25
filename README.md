# N//S//P — Neon Survival Protocol

A fast-paced cyberpunk survival arena game built with **React**, **HTML5 Canvas**, and **Supabase**. Fight increasingly dangerous enemy waves, level up through upgrade selections, survive boss encounters, and compete on a global online leaderboard. 

---

## 🎮 Overview

**Neon Survival Protocol (N//S//P)** is a browser-based roguelite survival shooter where players:

* Survive endless enemy waves
* Collect XP shards and level up
* Choose powerful upgrades during runs
* Defeat large-scale boss encounters
* Heal using heart pickups
* Submit scores to an online leaderboard
* Play on both desktop and mobile devices

The game features a neon cyberpunk aesthetic with real-time particle effects, dynamic enemy AI, boss mechanics, and cloud score synchronization.  

---

## ✨ Features

### Combat System

* Automatic target acquisition and firing
* Multi-shot weapon upgrades
* Piercing laser attacks
* Rotating orbital shields
* Progressive difficulty scaling
* Boss battles every 3 minutes

### Upgrade System

Choose one of three randomized upgrades whenever you level up:

| Upgrade             | Effect                                                |
| ------------------- | ----------------------------------------------------- |
| Cooldown Overclock  | Increases firing speed and unlocks split-shot streams |
| Plasma Orbital      | Adds rotating shield orbs                             |
| Piercing Laser Ray  | Fires powerful piercing lasers                        |
| Magnetic Field Link | Expands XP pickup radius                              |
| Boot Overdrive      | Increases movement speed                              |



### Enemy Types

| Enemy           | Description                            |
| --------------- | -------------------------------------- |
| Cyber Drone     | Basic swarm unit                       |
| Breacher Bomb   | Suicide enemy with explosion attack    |
| Reaper Hound    | Fast aggressive hunter                 |
| Goliath Tank    | Heavy armored enemy                    |
| Megamech Anchor | Boss enemy with multiple attack phases |



### Boss Mechanics

Bosses can:

* Perform high-speed dash attacks
* Execute shockwave slashes
* Summon additional enemies
* Scale health and difficulty after each defeat



### Online Leaderboard

* Cloud-synced scores using Supabase
* Stores player name, kills, and survival time
* Displays top global players
* Automatic score submission support

 

### Mobile Support

* Virtual joystick controls
* Responsive canvas scaling
* Touch-optimized interface
* Viewport-fit support

 

---

## 🛠 Tech Stack

### Frontend

* React 18
* ReactDOM 18
* HTML5 Canvas
* Vanilla JavaScript

### Backend

* Supabase Database
* Real-time leaderboard storage

### Styling

* Pure CSS
* Responsive layouts
* Neon cyberpunk theme
* Mobile joystick interface

 

---

## 📁 Project Structure

```text
project/
│
├── index.html      # Application entry point
├── style.css       # UI styling and responsive layouts
├── game.js         # Game engine and React components
└── README.md
```

---

## 🚀 Running Locally

### 1. Clone the project

```bash
git clone https://github.com/yourusername/neon-survival-protocol.git
cd neon-survival-protocol
```

### 2. Configure Supabase

Inside `game.js` update:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

The game uses a `leaderboard` table containing:

```sql
create table leaderboard (
  id bigint generated always as identity primary key,
  player_name text,
  kills integer,
  survival_time text
);
```

### 3. Launch

Open:

```text
index.html
```

or serve using:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

---

## 🎯 Controls

### Desktop

| Key   | Action     |
| ----- | ---------- |
| W / ↑ | Move Up    |
| S / ↓ | Move Down  |
| A / ← | Move Left  |
| D / → | Move Right |

### Mobile

* Drag the virtual joystick
* Weapons fire automatically

 

---

## 📊 Gameplay Loop

1. Enter your Agent ID
2. Launch simulation
3. Eliminate enemies
4. Collect XP shards
5. Level up
6. Choose upgrades
7. Defeat bosses
8. Survive as long as possible
9. Submit score to global leaderboard

 

---

## 🎨 UI Elements

* XP Progress Bar
* Health Bar
* Boss Health Bar
* Kill Counter
* Survival Timer
* Upgrade Selection Screen
* Game Over Statistics Screen
* Global Leaderboard

  

---

## 🔥 Highlights

* Infinite survival gameplay
* Procedural enemy scaling
* Boss progression system
* Upgrade-based build customization
* Online competitive leaderboard
* Fully responsive design
* Cyberpunk neon visual effects
* Canvas-based high-performance rendering

---

## License

MIT License

---

### Developed as a browser-based cyberpunk survival arcade experience inspired by modern roguelite survivor games.

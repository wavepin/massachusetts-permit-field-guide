"use client";

import { useEffect, useMemo, useState } from "react";

type Question = {
  q: string;
  a: string[];
  correct: number;
  why: string;
  topic: string;
};

const questions: Question[] = [
  { q: "How many questions are on the Massachusetts Class D learner's permit exam?", a: ["20", "25", "30", "40"], correct: 1, why: "The Class D permit exam has 25 multiple-choice questions and a 25-minute limit.", topic: "Exam" },
  { q: "How many correct answers are required to pass?", a: ["15", "18", "20", "21"], correct: 1, why: "You need 18 of 25 correct (72%). Aim for 22+ in practice so you have a safety margin.", topic: "Exam" },
  { q: "Unless otherwise posted, what is the speed limit in a school zone?", a: ["15 mph", "20 mph", "25 mph", "30 mph"], correct: 1, why: "The statutory school-zone speed is 20 mph. Watch for posted hours or flashing lights.", topic: "Speed" },
  { q: "Unless otherwise posted, what speed is not reasonable in a thickly settled or business district?", a: ["Over 20 mph", "Over 25 mph everywhere", "Over 30 mph", "Over 40 mph"], correct: 2, why: "The default is 30 mph, although some communities establish 25 mph thickly settled limits and post signs at entrances.", topic: "Speed" },
  { q: "What is Massachusetts' fundamental speed law?", a: ["Always drive exactly the posted speed", "Never drive faster than is reasonable and proper for conditions", "Match the fastest traffic", "Drive 5 mph below every limit"], correct: 1, why: "A posted limit is for ideal conditions. Rain, snow, traffic, visibility, pedestrians, or road hazards can require a lower speed.", topic: "Speed" },
  { q: "At a four-way stop, two vehicles arrive at the same time. Who goes first?", a: ["The vehicle on the left", "The larger vehicle", "The vehicle on the right", "The vehicle going straight"], correct: 2, why: "First stopped, first to go. If arrival is simultaneous, yield to the vehicle on your right.", topic: "Right-of-way" },
  { q: "At an uncontrolled intersection, you must generally yield to a vehicle…", a: ["Approaching from your right", "Approaching from your left", "That is smaller than yours", "That flashes its headlights"], correct: 0, why: "Slow down, look both ways, and yield to a vehicle already in the intersection or approaching from your right.", topic: "Right-of-way" },
  { q: "When turning left, you must yield to…", a: ["Only oncoming cars", "Only pedestrians", "Oncoming traffic, vehicles already in the intersection, pedestrians, and bicyclists in your path", "Nobody if you signaled"], correct: 2, why: "A turn signal communicates intent; it never creates right-of-way.", topic: "Right-of-way" },
  { q: "What should you do for a blind pedestrian crossing with a white cane or guide dog?", a: ["Honk once", "Slow and wave them across", "Stop completely and remain stopped until they safely cross", "Drive around them carefully"], correct: 2, why: "The White Cane Law requires a complete stop. Do not honk, wave, or pass another stopped vehicle.", topic: "Pedestrians" },
  { q: "A school bus has red lights flashing and its stop sign extended. You are approaching from the opposite direction. You must…", a: ["Slow to 15 mph", "Stop, unless a physical barrier divides the highway", "Stop only if children are visible", "Proceed if you are two lanes away"], correct: 1, why: "Traffic in both directions must stop. The exception is the opposite side of a divided highway with a physical barrier.", topic: "Sharing" },
  { q: "When may you turn right at a steady red light?", a: ["Without stopping if clear", "After a complete stop and yielding, unless prohibited by a sign", "Never in Massachusetts", "Only from a one-way street"], correct: 1, why: "Stop first, yield to pedestrians/bicycles/vehicles, and check for a NO TURN ON RED sign.", topic: "Signals" },
  { q: "When may you turn left on red in Massachusetts?", a: ["Never", "From any street onto a one-way street", "From a one-way street onto another one-way street after stopping and yielding", "Whenever no car is coming"], correct: 2, why: "Left-on-red is allowed only one-way to one-way, after a complete stop and yielding, unless a sign prohibits it.", topic: "Signals" },
  { q: "A flashing red traffic signal means…", a: ["Yield", "Stop, then proceed when safe", "Slow only", "The signal is about to turn green"], correct: 1, why: "Treat flashing red exactly like a STOP sign.", topic: "Signals" },
  { q: "A flashing yellow signal means…", a: ["Stop completely", "Speed up before red", "Proceed with caution", "Yield only to vehicles on the right"], correct: 2, why: "Flashing yellow is a warning: slow as needed, stay alert, and proceed carefully.", topic: "Signals" },
  { q: "If a traffic signal is completely blacked out, you should…", a: ["Treat it as a four-way stop", "Follow the car ahead", "Treat it as a green light", "Wait for police"], correct: 0, why: "Proceed cautiously as though there is a stop sign in every direction.", topic: "Signals" },
  { q: "A steady yellow light means…", a: ["Speed up", "Stop if it is safe to do so", "Cross traffic must stop", "You always have 3 seconds left"], correct: 1, why: "Yellow warns the signal is changing to red. Stop if you can do so safely; never enter from a stopped position.", topic: "Signals" },
  { q: "The minimum following distance in good conditions and moderate traffic is…", a: ["1 second", "2 seconds", "3 seconds", "5 seconds"], correct: 2, why: "Use at least the three-second rule. Add time for darkness, rain, snow, poor visibility, or heavy traffic.", topic: "Space" },
  { q: "How much following distance should you keep behind a motorcycle?", a: ["At least 2 seconds", "At least 3 seconds", "At least 4 seconds", "At least 10 seconds"], correct: 2, why: "The manual specifies at least four seconds behind a motorcycle.", topic: "Space" },
  { q: "Before making a turn on an ordinary road, signal at least…", a: ["50 feet", "100 feet", "200 feet", "500 feet"], correct: 1, why: "Signal at least 100 feet before a turn; on a highway, signal at least 500 feet.", topic: "Turns" },
  { q: "A U-turn is prohibited where you or other drivers cannot see at least…", a: ["100 feet", "200 feet", "400 feet", "500 feet"], correct: 3, why: "Do not U-turn near a hillcrest, curve, or anywhere visibility is less than 500 feet.", topic: "Turns" },
  { q: "A broken yellow center line means…", a: ["Passing is allowed when safe", "Passing is never allowed", "Traffic moves one way", "The shoulder begins"], correct: 0, why: "Yellow separates opposing traffic. A broken yellow line permits crossing to pass when safe and legal.", topic: "Markings" },
  { q: "White lane lines separate…", a: ["Traffic moving in opposite directions", "Traffic moving in the same direction", "Parking from travel lanes only", "School zones"], correct: 1, why: "White separates same-direction lanes; yellow separates opposing directions.", topic: "Markings" },
  { q: "When passing a bicyclist, a Massachusetts driver must leave at least…", a: ["2 feet", "3 feet", "4 feet", "6 feet"], correct: 2, why: "Use an adjacent lane if available and leave at least four feet. Wait if the lane is too narrow.", topic: "Bicycles" },
  { q: "At a bicycle box, a driver stopped at a red light must…", a: ["Stop inside the box", "Stop behind the box even if it is empty", "Use it as a right-turn lane", "Stop only if a cyclist is present"], correct: 1, why: "Bicycle boxes reserve visible space for bicyclists. Motor vehicles stop behind them, occupied or not.", topic: "Bicycles" },
  { q: "When entering a rotary, you must yield to…", a: ["Vehicles entering behind you", "Vehicles already in the rotary and pedestrians", "Vehicles on your right only", "Nobody if you are going straight"], correct: 1, why: "Rotary traffic moves counterclockwise. Yield before entering; signal right when exiting and never stop inside unless necessary.", topic: "Rotaries" },
  { q: "If you miss your rotary exit, you should…", a: ["Stop and wait", "Back up", "Go around again and reposition safely", "Cut across the inner lane"], correct: 2, why: "Do not stop or make a sudden lane change. Continue around and try again.", topic: "Rotaries" },
  { q: "A driver under 18 may use a mobile electronic device while driving…", a: ["Hands-free only", "For navigation only", "Only to report an emergency", "At red lights"], correct: 2, why: "Under-18 drivers may not use any mobile electronic device for any reason except reporting an emergency.", topic: "JOL" },
  { q: "For drivers 18 or older, handheld phone use is allowed…", a: ["At red lights", "When traffic is stopped", "Only when stationary and not in a public travel lane", "For calls under one minute"], correct: 2, why: "A red light or stop sign is still driving. Pull into a safe place outside the public travel lane.", topic: "Safety" },
  { q: "Massachusetts' adult per se BAC limit is…", a: ["0.02", "0.05", "0.08", "0.10"], correct: 2, why: "All drivers fail a chemical test at 0.08 or higher. Impairment can occur below that level.", topic: "Alcohol" },
  { q: "A driver under 21 can face administrative sanctions at a BAC as low as…", a: ["0.01", "0.02", "0.05", "0.08"], correct: 1, why: "Massachusetts has zero tolerance for under-21 drivers: sanctions begin at 0.02 BAC.", topic: "Alcohol" },
  { q: "What sobers a person up faster?", a: ["Coffee", "A cold shower", "Exercise", "Only time"], correct: 3, why: "Nothing speeds alcohol removal. Coffee, showers, food, and exercise may change how you feel, not your BAC.", topic: "Alcohol" },
  { q: "Which drinks contain roughly the same amount of alcohol?", a: ["12 oz beer, 5 oz wine, 1.5 oz 80-proof liquor", "12 oz beer, 12 oz wine, 1 oz liquor", "They can never be compared", "Only beer and wine"], correct: 0, why: "Each standard serving contains about one-half ounce of alcohol.", topic: "Alcohol" },
  { q: "An open alcoholic beverage may be in a vehicle…", a: ["If a passenger holds it", "If it is in the back seat", "Never in the passenger area", "If the driver is over 21"], correct: 2, why: "You may not drink while driving or have an open alcoholic drink inside the vehicle, even if someone else is holding it.", topic: "Alcohol" },
  { q: "Children must use an approved child restraint until they are…", a: ["At least 6 or 48 inches", "At least 8 or 57 inches", "At least 10", "At least 12"], correct: 1, why: "The law requires a child restraint until at least age 8 or at least 57 inches tall; then a properly worn seat belt.", topic: "Safety" },
  { q: "How close may you park to a fire hydrant?", a: ["Not within 5 feet", "Not within 10 feet", "Not within 15 feet", "Not within 20 feet"], correct: 1, why: "Do not park within 10 feet of a hydrant or fire lane.", topic: "Parking" },
  { q: "How close may you park to an intersection?", a: ["Not within 10 feet", "Not within 15 feet", "Not within 20 feet", "Not within 25 feet"], correct: 2, why: "Massachusetts prohibits parking within 20 feet of an intersection.", topic: "Parking" },
  { q: "When parking uphill against a curb, turn your front wheels…", a: ["Toward the curb", "Away from the curb, toward the travel lane", "Straight ahead", "Either way"], correct: 1, why: "Uphill with curb: wheels out. Downhill with curb: wheels in. No curb: wheels toward the road edge.", topic: "Parking" },
  { q: "A parked vehicle in a business or residential district must generally be within…", a: ["6 inches of the curb", "12 inches of the curb", "18 inches of the curb", "24 inches of the curb"], correct: 1, why: "Unless angled parking is allowed, park no more than 12 inches from the curb.", topic: "Parking" },
  { q: "The Move Over Law requires you to…", a: ["Stop behind every emergency vehicle", "Move to a non-adjacent lane when safe, or slow to a reasonable safe speed", "Always move left", "Sound your horn"], correct: 1, why: "Create an empty lane beside a stationary flashing emergency, highway, or recovery vehicle when possible; otherwise slow and proceed cautiously.", topic: "Sharing" },
  { q: "If you cannot see a truck driver's mirrors, you are…", a: ["Safely drafting", "In the truck's blind spot and following too closely", "Far enough back", "Allowed to pass on the shoulder"], correct: 1, why: "If you cannot see the mirrors, the driver probably cannot see you. Increase space.", topic: "Sharing" },
  { q: "When an emergency vehicle approaches using lights and siren, you should generally…", a: ["Stop immediately in your lane", "Drive to the right and stop until it passes", "Speed up to clear the road", "Turn left at the next street"], correct: 1, why: "Pull as close as practical to the right edge, clear of intersections, and stop until the vehicle passes.", topic: "Sharing" },
  { q: "Massachusetts requires headlights…", a: ["Only after full darkness", "From 30 minutes after sunset to 30 minutes before sunrise and when visibility requires wipers", "Only on highways", "Whenever driving under 40 mph"], correct: 1, why: "Use headlights from one-half hour after sunset to one-half hour before sunrise, and whenever weather requires windshield wipers or visibility is poor.", topic: "Safety" },
  { q: "A pentagon-shaped sign identifies…", a: ["A railroad crossing", "A school zone or school crossing", "A no-passing zone", "A yield"], correct: 1, why: "Pentagon = school. Octagon = stop; triangle = yield; circle = railroad warning; pennant = no passing.", topic: "Signs" },
  { q: "Orange traffic signs warn of…", a: ["Motorist services", "Recreation", "Construction or maintenance", "Regulations"], correct: 2, why: "Orange is work-zone/construction warning. Slow down and expect workers, lane shifts, or equipment.", topic: "Signs" },
  { q: "When being passed, you should…", a: ["Speed up", "Move left", "Slow down and stay right", "Flash your high beams"], correct: 2, why: "Help the other vehicle complete the pass safely. Never race a passing vehicle.", topic: "Passing" },
  { q: "Passing on the right is permitted when…", a: ["Using the shoulder", "The vehicle ahead is turning left and the roadway is wide and clear", "You are in a school zone", "The center line is solid yellow"], correct: 1, why: "It may also be allowed on one-way or multi-lane same-direction roads. Never use a shoulder, breakdown lane, or sidewalk to pass.", topic: "Passing" },
  { q: "A learner's permit holder must be accompanied by a licensed driver who is…", a: ["At least 18", "At least 21 with at least one year of driving experience, seated beside the permit holder", "Any licensed relative", "At least 25"], correct: 1, why: "The supervising driver must be at least 21, licensed, have at least one year of experience, and occupy the seat beside you.", topic: "JOL" },
  { q: "A permit holder under 18 may drive between midnight and 5 a.m.…", a: ["If going to work", "With any adult", "Only with a licensed parent or legal guardian with at least one year of experience", "Never"], correct: 2, why: "The under-18 permit restriction is midnight–5 a.m., with the specific parent/legal-guardian exception.", topic: "JOL" },
  { q: "During the first six months of a JOL, a driver may carry a passenger under 18…", a: ["Anytime", "Only if the passenger is immediate family, or a qualified supervising adult is present", "Only in daylight", "Only in the back seat"], correct: 1, why: "The first-six-month passenger restriction exempts immediate family and trips with a qualified adult supervisor.", topic: "JOL" },
];

const chapters = [
  { id: "exam", n: "01", title: "Know the exam", sub: "Format, strategy, test-day setup" },
  { id: "rules", n: "02", title: "Rules that win points", sub: "Right-of-way, signals, speed, space" },
  { id: "signs", n: "03", title: "Signs & markings", sub: "Shape first, then color and message" },
  { id: "share", n: "04", title: "Share the road", sub: "People, bikes, buses, trucks, emergencies" },
  { id: "jol", n: "05", title: "JOL & alcohol", sub: "The Massachusetts-heavy material" },
  { id: "numbers", n: "06", title: "Numbers to memorize", sub: "One compact cram sheet" },
  { id: "quiz", n: "07", title: "Practice exam", sub: "25 questions · 25 minutes" },
];

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [active, setActive] = useState("exam");
  const [query, setQuery] = useState("");
  const [exam, setExam] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("ma-permit-progress");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!exam.length || submitted || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [exam.length, submitted, seconds]);

  useEffect(() => {
    if (exam.length && seconds === 0) setSubmitted(true);
  }, [seconds, exam.length]);

  const score = exam.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    const term = query.toLowerCase();
    return questions.filter((q) => (q.q + q.why + q.topic).toLowerCase().includes(term)).slice(0, 8);
  }, [query]);

  function startExam() {
    setExam(shuffle(questions).slice(0, 25));
    setAnswers({});
    setSubmitted(false);
    setSeconds(25 * 60);
    setActive("quiz");
    setTimeout(() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" }), 20);
  }

  function toggleTask(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem("ma-permit-progress", JSON.stringify(next));
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Massachusetts Permit Field Guide home">
          <span className="brand-mark">MA</span>
          <span>PERMIT<br /><b>FIELD GUIDE</b></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#plan">4-day plan</a><a href="#study">Study guide</a><a href="#quiz">Practice</a>
        </nav>
        <button className="red-button" onClick={startExam}>Start mock exam <span>→</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">CLASS D · MASSACHUSETTS · VERIFIED JULY 2026</p>
          <h1>Pass in <em>4 days.</em><br />Drive for life.</h1>
          <p className="dek">A focused, Massachusetts-specific permit course built from the official RMV manual. Learn the rules, lock in the numbers, then prove it under real test conditions.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#plan">Begin day 1 <span>↓</span></a>
            <button className="text-button" onClick={() => window.print()}>Print cram sheet</button>
          </div>
        </div>
        <div className="scoreboard" aria-label="Exam format">
          <div className="score-label">YOUR TARGET</div>
          <div className="score-ring"><b>22</b><span>/ 25</span></div>
          <p>18 passes. <strong>22 means ready.</strong></p>
          <div className="stat-row"><span><b>25</b> questions</span><span><b>25</b> minutes</span><span><b>72%</b> to pass</span></div>
          <p className="mini">One minute per question. No manual, notes, phone, headphones, or hat during the exam (limited exceptions apply).</p>
        </div>
      </section>

      <section className="priority-strip">
        <span>FOCUS ORDER</span><b>1</b> Road rules & signs <i>→</i><b>2</b> Alcohol & suspensions <i>→</i><b>3</b> JOL <i>→</i><b>4</b> Bikes, pedestrians & sharing
      </section>

      <section className="plan-section" id="plan">
        <div className="section-heading"><p className="eyebrow">YOUR RUNWAY</p><h2>Four days. No wasted motion.</h2><p>Check items off as you go. Your progress stays on this device.</p></div>
        <div className="day-grid">
          {[
            ["DAY 1", "Build the map", "90–120 min", ["Read chapters 01–03 below", "Memorize sign shapes and colors", "Take one untimed practice exam"]],
            ["DAY 2", "High-yield law", "90–120 min", ["Read chapters 04–05", "Drill JOL, alcohol, and right-of-way", "Review every missed answer"]],
            ["DAY 3", "Pressure test", "75–100 min", ["Take two timed exams", "Re-read weak topics only", "Write the number ladder from memory"]],
            ["DAY 4", "Calm confidence", "45–60 min", ["Score 22+ twice in a row", "Read the cram sheet once", "Stop studying early; sleep 8 hours"]],
          ].map((d, di) => <article className="day-card" key={d[0] as string}>
            <div className="day-top"><span>{d[0] as string}</span><small>{d[2] as string}</small></div><h3>{d[1] as string}</h3>
            <ul>{(d[3] as string[]).map((task, ti) => { const id = `${di}-${ti}`; return <li key={id}><button className={checked[id] ? "check done" : "check"} onClick={() => toggleTask(id)} aria-label={`Mark ${task} complete`}>{checked[id] ? "✓" : ""}</button><span>{task}</span></li>; })}</ul>
          </article>)}
        </div>
        <div className="readiness"><div><b>{Object.values(checked).filter(Boolean).length}</b><span>/ 12 plan items complete</span></div><div className="progress"><i style={{ width: `${Object.values(checked).filter(Boolean).length / 12 * 100}%` }} /></div><strong>{Object.values(checked).filter(Boolean).length >= 10 ? "Nearly test-ready" : "Keep moving"}</strong></div>
      </section>

      <section className="study-shell" id="study">
        <aside className="chapter-nav">
          <p className="eyebrow">FIELD MANUAL</p>
          {chapters.map((c) => <a key={c.id} href={`#${c.id}`} className={active === c.id ? "active" : ""} onClick={() => setActive(c.id)}><span>{c.n}</span><div><b>{c.title}</b><small>{c.sub}</small></div></a>)}
          <div className="search-box"><label htmlFor="rule-search">Find a rule</label><input id="rule-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘hydrant’ or ‘yellow’" />{searchResults.length > 0 && <div className="search-results">{searchResults.map((r) => <button key={r.q} onClick={() => setQuery(r.q)}><b>{r.topic}</b>{r.q}<small>{r.why}</small></button>)}</div>}</div>
        </aside>

        <div className="chapters">
          <section className="chapter" id="exam"><ChapterHead n="01" title="Know the exam before it knows you" tag="START HERE" />
            <div className="callout"><b>THE CONTRACT</b><p>25 multiple-choice questions · 25 minutes · 18 correct to pass. Questions cover rules of the road, signs, alcohol and drugs, suspensions, JOL violations, and sharing the road with pedestrians, bicyclists, and visually impaired people.</p></div>
            <div className="two-col"><div><h3>Best-answer method</h3><ol className="steps"><li><b>Read the final line first.</b> Know what is actually being asked.</li><li><b>Spot absolutes.</b> “Always,” “never,” and “only” are often traps unless they state a clear law.</li><li><b>Choose safety over pride.</b> Right-of-way is given, never taken.</li><li><b>Flag, then move.</b> Don’t burn three minutes on one point.</li><li><b>Change an answer only with a reason.</b> New evidence, not nerves.</li></ol></div><div className="paper-note"><b>TEST-DAY CHECK</b><p>Arrive rested. Bring required original documents. Wear corrective lenses if needed. At the testing station: no reference material, electronics, or headphones unless using the audio exam.</p><p>If testing online, use the official RMV path only. The exam is available in many languages; anyone may choose the 25-minute audio exam. Disability accommodations must be arranged with the RMV.</p></div></div>
            <div className="tip"><b>Pass line ≠ ready line.</b><span>Do not schedule confidence around 18/25. Your green light is <strong>22+ twice in a row</strong> on randomized timed exams.</span></div>
          </section>

          <section className="chapter" id="rules"><ChapterHead n="02" title="The rules that win the most points" tag="HIGH YIELD" />
            <h3>The right-of-way hierarchy</h3>
            <div className="rule-stack"><Rule k="1" title="People first" text="Yield to pedestrians in the road or crosswalk. Stop completely for a blind pedestrian with a white cane or guide dog; remain stopped until they cross." /><Rule k="2" title="Traffic already there" text="Yield to vehicles already in an intersection or rotary. Never enter an intersection you cannot clear." /><Rule k="3" title="First stopped, first moving" text="At a four-way stop, go in arrival order. Same time? Yield to the driver on your right." /><Rule k="4" title="Turning traffic yields" text="Left turns yield to oncoming traffic, people, and bikes. Driveways and private or unpaved roads yield to the public road." /></div>
            <h3>Signals: say exactly what the light says</h3>
            <div className="signal-grid"><Signal color="red" name="Steady red" text="Full stop. Right on red after yielding unless signed otherwise. Left on red only one-way → one-way." /><Signal color="flash-red" name="Flashing red" text="Same as a STOP sign." /><Signal color="yellow" name="Steady yellow" text="Stop if safe; the signal is changing to red." /><Signal color="flash-yellow" name="Flashing yellow" text="Warning. Proceed cautiously." /><Signal color="green" name="Steady green" text="Go only if clear. Yield before left turns. Never block the box." /><Signal color="dark" name="Blackout" text="Treat every approach as a stop sign." /></div>
            <h3>Speed, space & turns</h3>
            <div className="fact-grid"><Fact big="20" unit="mph" text="school zone" /><Fact big="30" unit="mph" text="thickly settled/business default*" /><Fact big="40" unit="mph" text="outside that district" /><Fact big="50" unit="mph" text="highway outside that district" /><Fact big="3" unit="sec" text="minimum following gap" /><Fact big="4" unit="sec" text="behind a motorcycle" /></div>
            <p className="fineprint">*Some municipalities post a 25 mph thickly settled limit. Posted signs always control. The fundamental speed law always requires a reasonable and proper speed for actual conditions.</p>
            <div className="two-col cards"><div><b>TURN SIGNAL</b><p><strong>100 feet</strong> before a turn on ordinary roads; <strong>500 feet</strong> on a highway. Signal before braking when practical. Check mirrors and the blind spot on the turning side.</p></div><div><b>U-TURN VISIBILITY</b><p>Legal only when safe and not prohibited. Never near a hillcrest, curve, or anywhere drivers cannot see <strong>500 feet</strong>.</p></div></div>
          </section>

          <section className="chapter" id="signs"><ChapterHead n="03" title="Read signs from the silhouette" tag="VISUAL MEMORY" />
            <p className="lead">On a dark or snow-covered road, shape survives before words do. Memorize the shape, then attach the message.</p>
            <div className="shape-grid"><Shape cls="octagon" label="STOP" note="8 sides = one message" /><Shape cls="triangle" label="YIELD" note="point down" /><Shape cls="diamond" label="WARNING" note="hazard or change" /><Shape cls="pentagon" label="SCHOOL" note="zone or crossing" /><Shape cls="circle" label="RAILROAD" note="advance warning" /><Shape cls="pennant" label="NO PASSING" note="left-side sign" /></div>
            <div className="color-key"><div><i className="c-red" /><b>RED</b><span>stop / prohibition</span></div><div><i className="c-yellow" /><b>YELLOW</b><span>general warning</span></div><div><i className="c-orange" /><b>ORANGE</b><span>construction</span></div><div><i className="c-lime" /><b>FLUORESCENT YELLOW-GREEN</b><span>school / bike / pedestrian</span></div><div><i className="c-white" /><b>BLACK + WHITE</b><span>regulation</span></div><div><i className="c-green" /><b>GREEN</b><span>direction</span></div><div><i className="c-blue" /><b>BLUE</b><span>motorist service</span></div><div><i className="c-brown" /><b>BROWN</b><span>recreation / historic</span></div></div>
            <div className="markings"><div><span className="line yellow broken" /><b>Broken yellow</b><p>Opposing traffic; passing may be allowed when safe.</p></div><div><span className="line yellow solid" /><b>Solid yellow</b><p>Do not cross from your side to pass.</p></div><div><span className="line white broken" /><b>Broken white</b><p>Same direction; lane changes allowed when safe.</p></div><div><span className="line white solid" /><b>Solid white</b><p>Lane change discouraged or restricted; stay in lane.</p></div></div>
            <div className="mnemonic"><b>Memory hook</b><span><strong>Yellow argues</strong> (traffic faces opposite ways). <strong>White works together</strong> (traffic moves the same way).</span></div>
          </section>

          <section className="chapter" id="share"><ChapterHead n="04" title="The road is a shared system" tag="MASS. FAVORITE" />
            <div className="scenario-grid"><article><span>PEDESTRIANS</span><h3>Crosswalk means protect</h3><p>Yield to anyone entering or using a crosswalk in your path. Never pass a vehicle stopped or slowing for a person. Yield when turning into a driveway or lot.</p></article><article><span>BICYCLES</span><h3>Four feet, no squeeze</h3><p>Leave at least <strong>4 feet</strong> when passing and use an adjacent lane if available. Check behind before opening a door. Stop behind bike boxes—even empty ones.</p></article><article><span>SCHOOL BUS</span><h3>Red means both sides stop</h3><p>Stop for flashing red lights and the extended sign. Remain stopped until signals stop. Only exception: opposite side of a divided highway with a physical barrier.</p></article><article><span>TRUCKS</span><h3>If you can’t see mirrors…</h3><p>…the driver likely cannot see you. Avoid every blind spot, never cut into the truck’s stopping cushion, and never pass a turning truck on the right.</p></article><article><span>EMERGENCY</span><h3>Right, clear, stop</h3><p>For an approaching emergency vehicle, move right and stop clear of intersections. For a stationary flashing vehicle, move over a lane when safe or slow substantially.</p></article><article><span>ROTARY</span><h3>Yield in, signal out</h3><p>Traffic moves counterclockwise. Yield to traffic already inside and to people. Use the right signal to exit. Missed exit? Go around again—never stop.</p></article></div>
            <div className="callout dark"><b>DUTCH REACH</b><p>Before opening a street-side door: rear-view mirror → side mirror → open with your far hand. Your body turns, helping you see an approaching bicyclist.</p></div>
          </section>

          <section className="chapter" id="jol"><ChapterHead n="05" title="JOL, permits, alcohol & consequences" tag="MEMORIZE" />
            <div className="split-title"><h3>If you are under 18</h3><span>These details are heavily testable</span></div>
            <div className="timeline"><div><b>16</b><span>Minimum age for a Class D permit</span></div><i /><div><b>6 mo.</b><span>Permit in good standing + clean record before road test</span></div><i /><div><b>16½</b><span>Earliest JOL eligibility</span></div></div>
            <div className="restriction-table"><div><b>PERMIT SUPERVISOR</b><p>Licensed driver age <strong>21+</strong>, at least <strong>1 year</strong> of driving experience, seated beside you.</p></div><div><b>PERMIT NIGHT RULE</b><p>Under 18: no driving <strong>12:00 a.m.–5:00 a.m.</strong> unless with a qualified licensed parent or legal guardian.</p></div><div><b>JOL PASSENGERS</b><p>First <strong>6 months</strong>: no passenger under 18 except immediate family, unless a qualified adult supervisor is present.</p></div><div><b>JOL NIGHT RULE</b><p>No driving <strong>12:30 a.m.–5:00 a.m.</strong> unless with a parent or legal guardian. Note the 30-minute difference from the permit rule.</p></div><div><b>MOBILE DEVICE</b><p>Under 18: no use for any reason while driving except reporting an emergency—even hands-free and navigation.</p></div><div><b>TRAINING</b><p>30 classroom + 12 behind-wheel + 6 observation + 40 supervised hours (30 with an approved skills program).</p></div></div>
            <h3>Alcohol: know the line and the lie</h3>
            <div className="bac"><div><span>Adult per se limit</span><b>0.08</b></div><div className="accent"><span>Under-21 sanctions</span><b>0.02</b></div><p><strong>The lie:</strong> coffee, food, cold showers, or exercise sober you up. <strong>The fact:</strong> only time lowers BAC. Alcohol affects judgment, vision, coordination, and reaction before you “feel drunk.”</p></div>
            <div className="drink-row"><span><b>12 oz</b> beer</span><i>=</i><span><b>5 oz</b> wine</span><i>=</i><span><b>1.5 oz</b> 80-proof liquor</span></div>
            <div className="warning"><b>IMPLIED CONSENT</b><p>Driving in Massachusetts means agreeing to chemical testing in qualifying OUI cases. A failed test or refusal brings immediate license consequences. An open alcoholic drink is prohibited inside the vehicle even when a passenger holds it.</p></div>
            <p className="fineprint">Penalty charts change and vary by age, prior offenses, and conduct. For the exam, know that JOL violations, speeding, drag racing, mobile-device use, OUI, test refusal, and leaving a crash can bring mandatory suspensions, retraining, retesting, fees, and—depending on the offense—criminal penalties.</p>
          </section>

          <section className="chapter" id="numbers"><ChapterHead n="06" title="The number ladder" tag="CRAM SHEET" />
            <p className="lead">Cover the right column and say each meaning aloud. Then reverse it: read the meaning and recall the number.</p>
            <div className="number-list">{[
              ["18 / 25", "correct answers needed to pass"], ["25 min", "total permit exam time"], ["20 mph", "school-zone speed"], ["30 / 40 / 50", "default district / outside district / highway speeds"], ["3 sec", "minimum following distance in good conditions"], ["4 sec", "minimum behind a motorcycle; 4 feet passing a bicycle"], ["100 / 500 ft", "signal before ordinary-road / highway turn"], ["500 ft", "visibility needed for a U-turn"], ["10 / 20 in feet", "no parking from hydrant / intersection"], ["12 in", "maximum curb distance when parked"], ["0.08 / 0.02", "adult BAC per se / under-21 sanction threshold"], ["8 or 57 in", "child restraint until age 8 or height 57 inches"], ["21 + 1", "permit supervisor age 21+, with 1 year experience"], ["12–5 / 12:30–5", "under-18 permit / JOL night restrictions"],
            ].map((x) => <div key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</div>
            <div className="parking-memory"><h3>Hill parking</h3><div><b>UP + CURB</b><span>Wheels <strong>out</strong> toward travel lane</span></div><div><b>DOWN + CURB</b><span>Wheels <strong>in</strong> toward curb</span></div><div><b>NO CURB</b><span>Wheels <strong>in</strong> toward road edge</span></div><p>Mnemonic: <strong>“Up, up, and away.”</strong> Uphill + curb = wheels away.</p></div>
          </section>

          <section className="chapter quiz-chapter" id="quiz"><ChapterHead n="07" title="Practice under real conditions" tag="25 MINUTES" />
            {!exam.length ? <div className="quiz-intro"><div className="score-ring small"><b>25</b><span>questions</span></div><h3>Randomized mock permit exam</h3><p>One question per minute. Choose the best answer, flag uncertainty mentally, and keep moving. Explanations appear after submission.</p><button className="primary-button" onClick={startExam}>Start the timer <span>→</span></button></div> : <>
              <div className="exam-bar"><div><b>{submitted ? `${score}/25` : `${Object.keys(answers).length}/25`}</b><span>{submitted ? (score >= 18 ? "PASS" : "REVIEW") : "ANSWERED"}</span></div><div className={seconds < 300 ? "timer urgent" : "timer"}>{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</div><button onClick={() => setSubmitted(true)} disabled={submitted}>Submit exam</button></div>
              {submitted && <div className={score >= 22 ? "result ready" : score >= 18 ? "result pass" : "result retry"}><b>{score >= 22 ? "READY RANGE" : score >= 18 ? "PASS — BUILD MARGIN" : "NOT YET"}</b><h3>{score} correct · {Math.round(score / 25 * 100)}%</h3><p>{score >= 22 ? "Strong work. Repeat once more; two 22+ scores in a row is your green light." : "Review every explanation below, revisit weak chapters, then take a fresh randomized exam."}</p><button onClick={startExam}>New randomized exam</button></div>}
              <div className="question-list">{exam.map((q, i) => <article className={submitted ? (answers[i] === q.correct ? "question correct" : "question incorrect") : "question"} key={`${q.q}-${i}`}><div className="q-head"><span>{String(i + 1).padStart(2, "0")}</span><small>{q.topic}</small></div><h3>{q.q}</h3><div className="answers">{q.a.map((a, ai) => <button key={a} disabled={submitted} className={answers[i] === ai ? "selected" : ""} onClick={() => setAnswers({ ...answers, [i]: ai })}><i>{String.fromCharCode(65 + ai)}</i>{a}{submitted && ai === q.correct && <b>✓</b>}</button>)}</div>{submitted && <div className="explanation"><b>{answers[i] === q.correct ? "Correct." : `Correct answer: ${q.a[q.correct]}`}</b> {q.why}</div>}</article>)}</div>
              <div className="exam-end"><button className="primary-button" onClick={submitted ? startExam : () => setSubmitted(true)}>{submitted ? "Take another exam" : "Submit exam"}</button></div>
            </>}
          </section>

          <section className="sources"><p className="eyebrow">AUTHORITATIVE SOURCES</p><h2>Keep one foot on the official record.</h2><p>This guide is a focused learning aid, not a replacement for legal advice. Rules can change. The links below are the final authority and were checked July 17, 2026.</p><div><a href="https://www.mass.gov/lists/drivers-manuals" target="_blank" rel="noreferrer"><b>Official Driver’s Manual</b><span>Primary study source ↗</span></a><a href="https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit" target="_blank" rel="noreferrer"><b>Permit application & exam</b><span>Current logistics ↗</span></a><a href="https://www.mass.gov/info-details/junior-operator-license-jol-requirements" target="_blank" rel="noreferrer"><b>JOL requirements</b><span>Under-18 rules ↗</span></a><a href="https://www.mass.gov/info-details/junior-operator-violations" target="_blank" rel="noreferrer"><b>JOL violations</b><span>Current penalties ↗</span></a></div></section>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark">MA</span><span>PERMIT<br /><b>FIELD GUIDE</b></span></div><p>Study sharp. Drive kind. Arrive alive.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

function ChapterHead({ n, title, tag }: { n: string; title: string; tag: string }) { return <div className="chapter-head"><span>{n}</span><div><p>{tag}</p><h2>{title}</h2></div></div>; }
function Rule({ k, title, text }: { k: string; title: string; text: string }) { return <div><span>{k}</span><p><b>{title}</b>{text}</p></div>; }
function Signal({ color, name, text }: { color: string; name: string; text: string }) { return <div><i className={color} /><p><b>{name}</b>{text}</p></div>; }
function Fact({ big, unit, text }: { big: string; unit: string; text: string }) { return <div><p><b>{big}</b> {unit}</p><span>{text}</span></div>; }
function Shape({ cls, label, note }: { cls: string; label: string; note: string }) { return <div><i className={cls} /><b>{label}</b><span>{note}</span></div>; }

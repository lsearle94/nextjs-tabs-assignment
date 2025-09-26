'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs'
import {motion} from "framer-motion";

//Escape-Room Page
export default function EscapeRoom() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeTab, setActiveTab] = useState<string>('/escape-room');
    //Timer variables
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [inputTime, setInputTime] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);

    //Initialise active tab from localStorage
    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) setActiveTab(savedTab);
    }, []);

    //Initialise theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
        } else {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDark ? 'dark' : 'light');
        }
    }, []);

    const handleMenuClick = (path: string) => {
        setActiveTab(path);
        localStorage.setItem('activeTab', path);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const isDark = theme === 'dark';

    const linkHoverStyle = {
        backgroundColor: isDark ? '#555' : 'rgba(189, 213, 241, 0.94)',
        color: isDark ? '#fff' : '#000',
    };

    //Countdown effect
    useEffect(() => {
        if (!isRunning || timeLeft === null) return;
        if (timeLeft <= 0) {
            setIsRunning(false);
            setTimeLeft(null);
            setInputTime("") //Clear input box
            setStage(0); //Reset to stage 0 (Instructions page)
            //Reset Stage 1 
            setUserAnswer(initialCode);
            setFeedback("");
            setDialogue("Time is up! You did not escape.");
            return;
        }
    const timer = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    //Format seconds
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    //Time handler
    const handleStartTimer = () => {
        const minutes = parseInt(inputTime, 10);
        const seconds = minutes * 60;
        if (isNaN(minutes) || minutes <= 0) {
            setDialogue("Please enter valid number of minutes");
            return;
        }
        setTimeLeft(seconds);
        setIsRunning(true);
    };

    //Pulsing effect for timer
    const pulseAnimation = {
        animation: "pulse 1s infinite",
    };
    const globalStyles = `
        @keyframes pulse {
            0% {transform: scale(1); opacity: 1;}
            50% {transform: scale(1.1); opacity: 0.8;}
            100% {transform: scale(1); opacity: 1;}
        }
    `;

    // Stop timer button
    const handleStopTimer = () => {
        setIsRunning(false);
        setTimeLeft(null);
        setInputTime("") //Clear the input box
        setStage(0); //Reset to stage 0 (Instruction page)
        //Reset the Stage 1 data
        setUserAnswer(initialCode);
        setFeedback("");
        setDialogue("You stopped the game, you did not escape!");
    };

    //Game Play State
    const [stage, setStage] = useState<number>(0); //Instructions state = 0, Stage 1 state = 1.

    //Stage 1 functions
    const initialCode = `function escapeRoom() {
        let clue1 = "The door is locked...";
        let clue2 = "Try fixing the code...";

        function helper() {
            let hint = "These keys are important, you must find them";
            console.log("Searching...");
            return hint;
        }

        // Broken line below - Fix to open the door!
        console.log("Looking around...");
        console.log("FiNd ThE kEy?");
        console.log("Where could it be");

        let randomNumber = Math.floor(Math.random() * 10);
        if(randomNumber > 5) {
            console.log("Too high!");
        } else {
            console.log("Too Low!");
        }
        return clue1 + clue2 + helper();
    }`;
    const [userAnswer, setUserAnswer] = useState<string>(initialCode);
    const[feedback, setFeedback] = useState<string>("");
    const checkAnswer = () => {
        if (userAnswer.includes('console.log("Find the Key!");')) {
            setFeedback("Correct!");
        } else {
            setFeedback("Not quite there, keep trying!")
        }
    };

    //Stage 2 Functions
    const [unlocked, setUnlocked] = useState(false);
    const [lockReady, setLockReady] = useState(false);
    useEffect(() => {
        if (stage === 2) {
            setUnlocked(false); //Reset lock
            setLockReady(false); //Hide the lock
            setTimeout(() => setLockReady(true), 100); //Show lock after short delay
        }
    }, [stage]);

    //Stage 3 tracking for clickable objects
    const [plantPasswordFound, setPlantPasswordFound] = useState(false);
    const [computerUnlocked, setComputerUnlocked] = useState(false);
    const [miniGame1Complete, setMiniGame1Complete] = useState(false);
    const [miniGame2Complete, setMiniGame2Complete] = useState(false);
    const [safeOpened, setSafeOpened] = useState(false);
    const [escapeKeyFound, setEscapeKeyFound] = useState(false);
    //Stage 3 popup screens
    const [showComputerPopup, setShowComputerPopup] = useState(false);
    const [computerPasswordInput, setComputerPasswordInput] = useState("");
    const [showSafePopup, setShowSafePopup] = useState(false);
    const [safeCodeInput, setSafeCodeInput] = useState("");
    //Computer mini-game states
    const [showMiniGame1, setShowMiniGame1] = useState(false);
    const [miniGame1Code, setMiniGame1Code] = useState("");
    const [miniGame1Feedback, setMiniGame1Feedback] = useState("");
    const [showMiniGame, setShowMiniGame] = useState(false);
    const [miniGame2Code, setMiniGame2Code] = useState(`
        let text = "SAFE PASSWORD";
        let reversed = text; 
        console.log(reversed)
        `);
    const [miniGame2Feedback, setMiniGame2Feedback] = useState("");

    const [dialogue, setDialogue] = useState<string | null>(null);
    const [timeTaken, setTimeTaken] = useState<number | null>(null);
    


    //Page Styling
    const styles = {
        page: {
            backgroundColor: isDark ? '#121212' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            minHeight: '100vh',
            padding: '20px',
        },
        header: {
            backgroundColor: isDark ? 'linear-gradient(90deg, #1e1e1e, #333)' : 'linear-gradient(90deg, #4facfe, #00f2fe)',
            padding: '25px 25px',
            borderBottom: `2px solid ${isDark ? '#444' : '#ccc'}`,
            position: 'relative' as 'relative',
            borderRadius: '8px',
            boxShadow: isDark ? '0 4px 6px rgba(34, 32, 32, 1)' : '0 4px 6px rgba(204, 200, 200, 1)',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            gap: '15px',
        },
        leftLinks: {
            display: 'flex',
            gap: '15px',
        },
        rightLinks: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative' as 'relative',
        },
        link: {
            color: isDark ? '#5fa0e2ff' : '#185b7aff',
            textDecoration: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s',
        },
        aboutLink: {
            color: isDark ? '#5fa0e2ff' : '#185b7aff',
            textDecoration: 'none',
        },
        dropdown: {
            position: 'absolute' as 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: isDark ? '#333' : '#fff',
            border: `1px solid ${isDark ? '#555' : '#ccc'}`,
            padding: '10px',
            zIndex: 999,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: (menuOpen ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
        },
        dropdownLink: {
            display: 'block',
            marginBottom: '5px',
            color: isDark ? 'lightblue' : 'blue',
            textDecoration: 'none',
        },
        switchContainer: {
            position: 'relative' as 'relative',
            width: '50px',
            height: '24px',
            backgroundColor: isDark ? '#555' : '#ccc',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        switchCircle: {
            position: 'absolute' as 'absolute',
            top: '2px',
            left: isDark ? '26px' : '2px',
            width: '20px',
            height: '20px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            transition: 'left 0.3s',
        },
        hamburger: {
            width: '30px',
            height: '22px',
            display: 'flex',
            flexDirection: 'column' as 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
        },
        bar: {
            height: '4px',
            width: '100%',
            backgroundColor: isDark ? '#fff' : '#000',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
        },
        bar1Open: {
            transform: 'rotate(45deg) translate(6px, 6px)',
        },
        bar2Open: {
            opacity: 0,
        },
        bar3Open: {
            transform: 'rotate(-45deg) translate(6px, -6px)',
        },
        footer: {
            marginTop: '40px',
            padding: '15px',
            textAlign: 'center' as 'center',
            backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0',
            borderTop: `2px solid ${isDark ? '#444' : '#ccc'}`,
            color: isDark ? '#fff' : '#000',
        },
        timerButton: {
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: isDark ? "#5fa0e2" : "#007bff",
            color: "#fff",
            transition: "background-color 0.3s ease",
        },
        timerButtonHover: {
            backgroundColor: isDark ? "#478ac9" : "#0056b3",
        },
        timerInput: {
            padding: "10px",
            borderRadius: "6px",
            border: `1px solid ${isDark ? "#555" : "#ccc"}`,
            outline: "none",
            fontSize: "1rem",
            backgroundColor: isDark ? "#222" : "#fff",
            color: isDark ? "#fff" : "#000",
            marginRight: "10px",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        },
        timer: {
            margin: "20px 0", 
            padding: "15px", 
            border: "1px solid gray", 
            borderRadius: "8px"
        },
        timerDisplay: {
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center" as "center",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: isDark ? "#1e1e1e" : "#f4f4f4",
            color: isDark ? "#ff5555" : "#cc0000",
            boxShadow: isDark ? "0 0 10px rgba(255, 85, 85, 0.6)" : "0 0 10px rgba(204, 0, 0, 0.3)",
            transition: "all 0.2s ease",
        },
        startButton: {
            marginTop: "15px", 
            padding: "10px 20px", 
            borderRadius: "6px", 
            border: "none", 
            backgroundColor: "#28a745", 
            color: "#fff", 
            fontWeight: "bold", 
            cursor: "pointer"
        },
        stage1: {
            marginTop: "30px", 
            padding: "20px", 
            border: "1px solid gray", 
            borderRadius: "8px"
        },
        imageWrapper: {
            display: "flex",
            justifyContent: "flex-end", 
            marginTop: "30px",
        },
        imageBox: {
            backgroundImage: "url('/kotak-kanan-9M-27mgz8Vg-unsplash.jpg')", //Background image credit: Kotak Kanon on 'Unsplash'
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            width: "70%",
            height: "700px",
            borderRadius: "8px",
            position: "relative" as "relative",
            zIndex: 1,
        },
        instructionBox: {
            flex: "1.2",
            marginRight: "-80px",
            padding: "30px",
            backgroundColor: isDark ? "rgba(30,30,30,0.9)" : "rgba(255,255,255,0.9)",
            borderRadius: "12px",
            boxShadow: isDark ? "0 4px 8px rgba(0,0,0,0.7)" : "0 4px 8px rgba(0,0,0,0.15)",
            color: isDark ? "#fff" : "#000",
            fontSize: "1rem",
            lineHeight: "1.6",
            zIndex: 2,
            position: "relative" as "relative",
        },
        editableCode: {
            width:"100%",
            height:"300px",
            padding:"15px",
            margin:"15px 0",
            backgroundColor:isDark ? "#1e1e1e" : "#fdfdfd",
            fontFamily:"monospace",
            fontSize:"1rem",
            color: isDark ? "#d4d4d4" : "#333",
            border:"1px solid gray",
            borderRadius:"8px",
            whiteSpace:"pre",
            lineHeight:"1.4"
        },
        nextButton: {
            marginTop: "15px", 
            padding: "10px 20px", 
            borderRadius: "6px", 
            border: "none", 
            backgroundColor: "#28a745", 
            color: "#fff", 
            fontWeight: "bold", 
            cursor: "pointer"
        },
        feedback: {
            marginTop: "10px", 
            color: feedback === "Correct!" ? "green" : "red"
        },
        lockContainer: {
            position: "relative",
            width: "200px",
            height: "200px",
            margin: "40px auto",
            cursor: "pointer",
        },
        lockBody: {
            width: "130px",
            height: "130px",
            background: "#333",
            borderRadius: "10px",
            position: "absolute",
            bottom: 0,
            left: "40px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
            overflow: "hidden",
        },
        lockShackle: (unlocked: boolean) => ({
            width: "90px",
            height: "100px",
            border: "14px solid #333",
            borderBottom: "none",
            borderRadius: "60px 60px 0 0",
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: `translateX(-45%) ${unlocked ? "rotate(-30deg)" : "rotate(0deg)"}`,
            transformOrigin: "bottom center",
            transition: "transform 1s ease",
            zIndex: 1,
        }),
        key: (unlocked: boolean) => ({
            width: "100px",
            height: "14px",
            background: "gold",
            position: "absolute",
            top: "110px",
            left: unlocked ? "30px" : "-150px",
            borderRadius: "3px",
            transition: "left 1s ease",
            transform: "rotate(0deg)",
            boxShadow: "0 0 4px rgba(0,0,0,0.4)",
            display: "block",
        }),
        keyHead: {
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "gold",
            position: "absolute",
            left: "-40px",   // attaches to blade
            top: "-11px",
            boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
        },
        keyHole: {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "11px",
            left: "11px",
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.3)",
        },
        keyNotch1: {
            width: "12px",
            height: "8px",
            background: "gold",
            position: "absolute",
            right: "25px",
            top: "-8px",
            borderRadius: "2px",
            boxShadow: "inset 0 -2px 2px rgba(0,0,0,0.2)",
        },
        keyNotch2: {
            width: "12px",
            height: "8px",
            background: "gold",
            position: "absolute",
            right: "10px",
            top: "-8px",
            borderRadius: "2px",
            boxShadow: "inset 0 -2px 2px rgba(0,0,0,0.2)",
        },
        stage3Instructions: {
            padding: "20px", 
            borderRadius: "8px", 
            backgroundColor: isDark ? "rgba(30,30,30,0.85)" : "rgba(255,255,255,0.9)", 
            boxShadow: isDark ? "0 4px 8px rgba(0,0,0,0.7)" : "0 4px 8px rgba(0,0,0,0.15)", 
            marginBottom: "20px", 
            textAlign: "center" as "center",
        },
        roomWrapper: {
            position: "relative" as "relative",
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            backgroundImage: "url('/gcp-visuals-hzdcs6glyyY-unsplash.jpg')", 
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            height: "120vh",
        },
        roomImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover" as const,
            objectPosition: "center 80%",
            display: "block",
        },
        roomBackground: {
            position: "relative" as "relative", 
            width: "100%", 
            height: "100vh", 
            
            backgroundSize: "contain", 
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 70%",
        },
        stage3Hotspot: {
            position: "absolute" as "absolute",
            cursor: "pointer",
            border: "2px solid transparent", //Invisible by default
        },
        overlay: {
            position: "absolute" as "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
        computerPopup: {
            position: "fixed" as "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        safePopup: {
            position: "fixed" as "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        dialoguePopup: {
            position: "fixed" as "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
        },
        dialogueBox: {
            background: isDark ? "#222" : "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            maxWidth: "90%",
            color: isDark ? "#fff" : "#000",
            boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
            textAlign: "center" as const,
        },
        miniGamePopup: {
            position: "fixed" as "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
        },
        miniGameBox: {
            background: isDark ? "#222" : "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "600px",
            maxWidth: "90%",
            color: isDark ? "#fff" : "#000",
            boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
            textAlign: "center" as const,
        },
        miniGameButton: {
            marginTop: "10px",
            marginRight: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "#fff",
            transition: "background-color 0.3s ease",
        },
        miniGameButtonHover: {
            backgroundColor: "#0056b3",
        },
        miniGameCloseButton: {
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "red",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
        },
        escaped: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            background: "linear-gradient(135deg, #4facfe, #00f2f3)",
            color: "#fff",
            textAlign: "center",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        } as React.CSSProperties,

    };

    return(
        <div>
            <div style={styles.page}>
                <h1 style={{marginBottom: '20px'}}>20960191</h1>
                <header style={styles.header}>
                    <h2>Escape Room Page</h2>
                    <nav style={styles.nav}>
                        <div style={styles.leftLinks}>
                            <Link href="/" style={{...styles.link, fontWeight: activeTab === '/' ? 'bold' : 'normal', textDecoration: activeTab === '/' ? 'underline' : 'none',}} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/')}>Tabs</Link>
                            <Link href="/pre-lab" style={{ ...styles.link, fontWeight: activeTab === '/pre-lab' ? 'bold' : 'normal', textDecoration: activeTab === '/pre-lab' ? 'underline' : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/pre-lab')}>Pre-Lab Questions</Link>
                            <Link href="/escape-room" style={{ ...styles.link, fontWeight: activeTab === '/escape-room' ? 'bold' : 'normal', textDecoration: activeTab === '/escape-room' ? 'underline' : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/escape-room')}>Escape Room</Link>
                            <Link href="/coding-races" style={{ ...styles.link, fontWeight: activeTab === '/coding-races' ? 'bold' : 'normal', textDecoration: activeTab === '/coding-races' ? 'underline' : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/coding-races')}>Coding Races</Link>
                        </div>
                        <div style={styles.rightLinks}>
                            <Link href="/about" style={{ ...styles.aboutLink, fontWeight: activeTab === '/about' ? 'bold' : 'normal', textDecoration: activeTab === '/about' ? 'underline' : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/about')}>About</Link>
                            <div onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger} aria-label="Menu" role="button">
                                <div style={{ ...styles.bar, ...(menuOpen ? styles.bar1Open : {}) }}></div>
                                <div style={{ ...styles.bar, ...(menuOpen ? styles.bar2Open : {}) }}></div>
                                <div style={{ ...styles.bar, ...(menuOpen ? styles.bar3Open : {}) }}></div>
                            </div>
                            {/* Toggle Switch (Light/Dark Mode) */}
                            <div onClick={toggleTheme} style={styles.switchContainer}>
                                <div style={styles.switchCircle}></div>
                            </div>
                        </div>
                    </nav>

                    {/* Dropdown Hamburger Menu*/}
                    <div style={styles.dropdown}>
                        <Link href="/" style={styles.dropdownLink}>Tabs</Link>
                        <Link href="/pre-lab" style={styles.dropdownLink}>Pre-Lab Questions</Link>
                        <Link href="/escape-room" style={styles.dropdownLink}>Escape Room</Link>
                        <Link href="/coding-races" style={styles.dropdownLink}>Coding Races</Link>
                        <Link href="/about" style={styles.dropdownLink}>About</Link>
                    </div>
                </header>

                <main>
                    {/* Breadcrumbs*/}
                    <Breadcrumbs activeTab={activeTab} />

                    {/*Timer UI*/}
                    <div style={styles.timer}>
                        <h3>Escape Room Timer</h3>
                        <input type="number" value={inputTime} onChange={(e) => setInputTime(e.target.value)} placeholder="Enter minutes" style={styles.timerInput}
                        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 6px rgba(0, 123, 255, 0.7")}
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}/>
                        <button onClick={handleStartTimer} disabled={isRunning} style={{...styles.timerButton,...(isRunning ? {opacity: 0.6, cursor: "not-allowed"} : {}),}}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#478ac9" : "#0056b3")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#5fa0e2" : "#007bff")}
                        >Start Timer</button>
                        <button onClick={handleStopTimer} disabled={!isRunning} style={{...styles.timerButton, backgroundColor: "red"}}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cc0000")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "red")}
                        >Stop Timer</button>
                        {timeLeft !== null && (
                            <>
                            <style>{globalStyles}</style>
                            <div style={{...styles.timerDisplay,...(timeLeft <= 10 ? pulseAnimation : {}), //Pulse on the last 10 seconds
                            }}>Time Left: {formatTime(timeLeft)}</div>
                            </>
                        )}
                    </div>
                    {stage === 0 && (        
                        <div style={styles.imageWrapper}>
                            {/* Image block aligned to the right */}
                            <div style={styles.instructionBox}>
                                {/* Instruction Box*/}
                                <h3>How to start the Escape Room</h3>
                                <ol>
                                    <li>1. Set the timer (e.g., 10 minutes).</li>
                                    <li>2. Click <strong>Start Timer </strong></li>
                                    <li>3. When the timer begins, Stage 1 will appear.</li>
                                    <li>4. Solve all coding challenges before time runs out!</li>
                                    <li> </li>
                                    <li><strong>Tip: For beginners, 10 minutes is suggested</strong></li>
                                    <li><strong>Experts, try escaping in 5!</strong></li>
                                </ol>
                                {/* Escape Button*/}
                                <button onClick={() => {
                                    if (!isRunning) {
                                        setDialogue("Please start the timer before beginning the escape challenge");
                                    } else {
                                        //Reset Stage 1
                                        setUserAnswer(initialCode);
                                        setFeedback("");
                                        setStage(1); //move to stage 1
                                    }
                                }}
                                style={styles.startButton}
                                >Let's Escape!</button>
                            </div>
                            <div style={styles.imageBox}></div>
                        </div>
                    )}

                    {/* Stage 1*/}
                    {stage === 1 && (
                        <div style={styles.stage1}>
                            <h2>Stage 1: Fix the code</h2>
                            <p>In order to begin this escape challenge, you must first unlock the door to enter.</p>
                            <p>The code you see here is corrupted! In order to escape this room, you must fix the phrase so it reads this exactly: <strong>Find the Key!</strong></p>
                            {/* Editable Code Section*/}
                            <textarea
                                value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} 
                                style={styles.editableCode}
                            />
                            <button onClick={checkAnswer} style={{...styles.timerButton, marginLeft: "10px"}}>Submit Answer</button>
                            {/* Feedback for user input*/}
                            {feedback && (
                                <p style={styles.feedback}>{feedback}</p>
                            )}
                            {/* Next button*/}
                            {feedback === "Correct!" && (
                                <button onClick={() => setStage(2)}
                                style={styles.nextButton}>
                                    Proceed to next level
                                </button>
                            )}
                        </div>
                    )}

                    {/* Stage 2*/}
                    {stage === 2 && lockReady && (
                        <div style={{ textAlign: "center", paddingTop: "50px"}}>
                            <h2>The next stage is waiting - Unlock the door</h2>
                            <p>Click the key to unlock the lock and reveal the next challenge</p>
                            <div style={styles.lockContainer as React.CSSProperties} onClick={() => {
                                setUnlocked(true);
                                setTimeout(() => setStage(3), 1200); //Allow some time for animation to finish before revealing the next stage
                            }}
                        >
                            <div style={styles.lockBody as React.CSSProperties}></div>
                            <div style={styles.lockShackle(unlocked) as React.CSSProperties}></div>
                            <div style={styles.key(unlocked) as React.CSSProperties}>
                                <div style={styles.keyHead as React.CSSProperties}>
                                    <div style={styles.keyHole as React.CSSProperties}></div>
                                </div>
                                <div style={styles.keyNotch1 as React.CSSProperties}></div>
                                <div style={styles.keyNotch2 as React.CSSProperties}></div>
                            </div>
                        </div>        
                    </div> 
                    )}

                    {/* Stage 3*/}
                    {stage === 3 && (
                        <div style={{marginTop: "30px"}}>
                            {/*Instructions for Stage 3*/}
                            <div style={styles.stage3Instructions}>
                                <h2>Stage 2: Search the room</h2>
                                <p>Oh No! The door closed and locked behind you</p>
                                <p>Theres something strange going on here...</p>
                                <p>Look around and find clues by clicking on the objects to move forward to the next stage</p>
                                <p>Tip: Not everything is clickable - only the right items selected in the right order will help you escape!</p>
                            </div>

                            {/*Room Image Background*/}
                            <div style={styles.roomWrapper}>
                                {/* Clickable objects*/}
                                {/* Desk */}
                                <svg viewBox= "0 0 100 100" style={styles.overlay}>
                                    <polygon points="19,70 37,62 47,65 28,73" fill="rgba(0,0,255,0.3)" 
                                    onClick={() => setDialogue("You notice some scribbles on the desk:\n\n'To unlock the secrets, you'll need to count them all\nstart from nothing and stop at a thousand\nA repeating loop might help you on your way...'")}
                                    style={{cursor: "pointer"}}/>
                                
                                    {/* Couch */}
                                    <polygon points="50,90 74,81 85,89 65,98" fill="rgba(0,255,0,0.3)" onClick={() => 
                                    setDialogue("Hidden under the couch cushion: a note that say's: \n'What is forward is not the key,\nonly when reversed will you see...'")}
                                        style={{cursor: "pointer"}}/>

                                    {/* Pot Plant */}
                                    <polygon points="13,82 20,81.5 18.5,87 14,87.5" fill="rgba(255,165,0,0.3)" onClick={() => {
                                        if (!plantPasswordFound) {
                                            setDialogue("Thats odd, there was a note inside this pot plant with a password: P@s5wOrD!");
                                            setPlantPasswordFound(true);
                                        } else { 
                                            setDialogue("Looks to be just a normal plant, nothing further to find here. We already have the password: P@s5wOrD!");
                                        }
                                    }}
                                    style={{cursor: "pointer"}}/>

                                    {/* Wall Image */}
                                    <polygon points="54,38 59,40 59,50 54,48" fill="rgba(255,0,0,0.3)" onClick={() => {
                                        if (!miniGame1Complete || !miniGame2Complete) {
                                            setDialogue("There's a hidden safe behind this picture! Now to find the code to open it...");
                                        } else if (!safeOpened) {
                                            setDialogue("Let's try the code we found on the computer... ")
                                            setShowSafePopup(true);
                                        } else {
                                            setDialogue("We've already opened the safe and found a key.");
                                        }
                                    }}
                                    style={{cursor: "pointer"}}/>

                                    {/* Book */}
                                    <polygon points="71,72 72,72 72,76 71,76" fill="rgba(255,165,0,0.3)" onClick={() => {
                                        if (!escapeKeyFound) {
                                            setDialogue("There looks to be some sort of strange key hole on the spine of this book. Could there be a key hidden somewhere?")
                                        } else {
                                            setDialogue(null);
                                            setTimeTaken((parseInt(inputTime, 10) * 60) - (timeLeft ?? 0));
                                            //Followed by success screen
                                            setStage(4);
                                        }
                                    }}
                                    style={{cursor: "pointer"}}/>

                                    {/* Computer */}
                                    <polygon points="27,61 33.5,58.5 34,63 27,66" fill="rgba(0,255,255,0.3)" onClick={() => {
                                        if (!plantPasswordFound) {
                                            setDialogue("Hmm, it's locked. I wonder if there is a password around here somewhere...");
                                        } else {
                                            setDialogue("Let's use the password from the plant...")
                                            setShowComputerPopup(true);
                                        }
                                    }}
                                    style={{cursor: "pointer"}}/>

                                </svg> 
                            </div>
                            {/* Popup for computer password */}
                            {showComputerPopup && (
                                <div style={styles.computerPopup}>
                                    <div style={{background: "#fff", padding: "20px", borderRadius: "8px", width: "300px"}}>
                                        <h3>Computer Login</h3>
                                        <p>Enter password to unlock: </p>
                                        <input type="password" value={computerPasswordInput} 
                                        onChange={(e) => setComputerPasswordInput(e.target.value)}
                                        style={{width: "100%", padding: "8px", marginBottom: "10px"}}>
                                        </input>
                                        <button style={styles.miniGameButton} 
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButtonHover.backgroundColor )} 
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButton.backgroundColor )} 
                                        onClick={() => {
                                            if (computerPasswordInput === "P@s5wOrD!") {
                                                setDialogue("Access granted. The computer is unlocked.");
                                                setComputerUnlocked(true);
                                                setShowComputerPopup(false);
                                                setShowMiniGame(true);
                                            } else {
                                                setDialogue("Incorrect password, try again");
                                            }
                                        }}>Submit</button>
                                        <button onClick={() => setShowComputerPopup(false)} style={styles.miniGameCloseButton}>Cancel</button>
                                    </div>
                                </div>
                            )}
                            {/* Minigame 1*/}
                            {computerUnlocked && showMiniGame && (
                                <div style={styles.miniGamePopup} onClick={(e) => {
                                    if (e.target === e.currentTarget) setShowMiniGame(false); }}> 
                                    <div style={styles.miniGameBox}>
                                        {!miniGame1Complete && (
                                            <div>
                                                <h3>Minigame 1: Generate Numbers 0-1000</h3>
                                                <p>Write code that generates all numbers from 0 to 1000.</p>
                                                <textarea value={miniGame1Code} onChange={(e) => setMiniGame1Code(e.target.value)}
                                                style={{width: "100%", height: "120px", marginBottom: "10px"}}
                                                />
                                                <button style={styles.miniGameButton}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButtonHover.backgroundColor)}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButton.backgroundColor)}
                                                onClick={() => {
                                                    if (miniGame1Code.includes("for") && miniGame1Code.includes("1000")) {
                                                        setMiniGame1Complete(true);
                                                        setMiniGame1Feedback("Correct! You found the first half of the safe code: 2745");
                                                    } else {
                                                        setMiniGame1Feedback("Not quite right, try again");
                                                    }
                                                }}>Submit</button>
                                                {miniGame1Feedback && <p>{miniGame1Feedback}</p>}
                                                <button onClick={() => setShowMiniGame(false)} style={styles.miniGameCloseButton}>Close</button>
                                            </div>
                                        )}
                                        {/* Mini Game 2 */}
                                        {miniGame1Complete && !miniGame2Complete && (
                                            <div>
                                                <h3>Minigame 2: Reverse the string</h3>
                                                <p>Update the below code so that the string <strong>"SAFE PASSWORD"</strong> appears in reverse.</p>
                                                <textarea value={miniGame2Code} onChange={(e) => setMiniGame2Code(e.target.value)} style={{width: "100%", height: "120px", marginBottom: "10px"}}>
                                                </textarea>
                                                <button style={styles.miniGameButton} 
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButtonHover.backgroundColor)}
                                                onMouseLeave ={(e) => (e.currentTarget.style.backgroundColor = styles.miniGameButton.backgroundColor)}
                                                onClick={() => {
                                                    if (
                                                        miniGame2Code.includes("split") &&
                                                        miniGame2Code.includes("reverse") &&
                                                        miniGame2Code.includes("join")
                                                    ) {
                                                        setMiniGame2Complete(true);
                                                        setMiniGame2Feedback("Correct! The second half of the safe code is: ASDF");
                                                    } else {
                                                        setMiniGame2Feedback("Not quite right, try again");
                                                    }
                                                }}>Submit</button>
                                                {miniGame2Feedback && <p>{miniGame2Feedback}</p>}
                                                <button onClick={() => setShowMiniGame(false)} style={styles.miniGameCloseButton}>Close</button>
                                            </div>
                                        )}
                                        {miniGame1Complete && miniGame2Complete && (
                                            <div>
                                                <p>You solved both mini games!</p>
                                                <p>The full code fior the safe is: <strong>2745-ASDF</strong></p>
                                                <button style={styles.miniGameButton} onClick={() => setShowMiniGame(false)}>Close</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Popup for safe code */}
                            {showSafePopup && (
                                <div style={styles.safePopup}>
                                    <div style={{background: "#fff", padding: "20px", borderRadius: "8px", width: "300px"}}>
                                        <h3>Safe Lock</h3>
                                        <p>Enter the code to unlock the safe: </p>
                                        <input type="text" value={safeCodeInput}
                                        onChange={(e) => setSafeCodeInput(e.target.value)}
                                        style={{width: "100%", padding: "8px", marginBottom: "10px"}}>
                                        </input>
                                        <button onClick={() => {
                                            if (safeCodeInput === "2745-ASDF") {
                                                setDialogue("The safe opened! There's a key inside.");
                                                setSafeOpened(true);
                                                setEscapeKeyFound(true);
                                                setShowSafePopup(false);
                                            } else {
                                                setDialogue("Incorrect code.");
                                            }
                                        }}>Unlock</button>
                                        <button onClick={() => setShowSafePopup(false)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div> 
                    )}
                    {/* Dialogue Boxes*/}
                    {dialogue && (
                        <div style={styles.dialoguePopup}>
                            <div style={styles.dialogueBox}>
                                {dialogue.split("\n").map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                                <button style={{marginTop: "15px", padding: "8px 16px", border: "none", borderRadius: "6px", background: "#28a745", color: "#fff", cursor: "pointer",}}
                                    onClick={() => setDialogue(null)}
                                >Close</button>
                            </div>
                        </div>
                    )}
                    {/* Stage 4 */}
                    {stage === 4 && (
                        <div style={styles.escaped}>
                            <h1 style={{fontSize: "3rem", marginBottom: "20px"}}>Congratulations!</h1>
                            <p style={{fontSize: "1.5rem", marginBottom: "10px"}}>You escaped the room!</p>
                            {timeTaken !== null && (
                                <p style={{fontSize: "1.2rem", marginBottom: "20px"}}>Your completion time: <strong>{formatTime(timeTaken)}</strong></p>
                            )}
                            <button onClick={() => window.location.reload()}
                                style={{padding: "12px 24px", borderRadius: "6px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "1rem"}}>Play Again
                            </button>
                        </div>
                    )}
                </main>  
            </div>

            {/* Footer*/}
            <footer style={styles.footer}>
                <p>© Laura Searle, 20960191, 2025</p>
            </footer>
        </div>
    );
}    
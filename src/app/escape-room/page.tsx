'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs'

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
            alert("Time is up! You did not escape.");
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
        const seconds = parseInt(inputTime, 10);
        if (isNaN(seconds) || seconds <= 0) {
            alert("Please enter valid number of seconds");
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

                    <h1>Escape Room</h1>
                    <p>20960191</p>

                    {/*Timer UI*/}
                    <div style={{margin: "20px 0", padding: "15px", border: "1px solid gray", borderRadius: "8px"}}>
                        <h3>Escape Room Timer</h3>
                        <input type="number" value={inputTime} onChange={(e) => setInputTime(e.target.value)} placeholder="Enter seconds" style={styles.timerInput}
                        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 6px rgba(0, 123, 255, 0.7")}
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}/>
                        <button onClick={handleStartTimer} disabled={isRunning} style={{...styles.timerButton,...(isRunning ? {opacity: 0.6, cursor: "not-allowed"} : {}),}}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#478ac9" : "#0056b3")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#5fa0e2" : "#007bff")}
                        >Start Timer</button>
                        {timeLeft !== null && (
                            <>
                            <style>{globalStyles}</style>
                            <div style={{...styles.timerDisplay,...(timeLeft <= 10 ? pulseAnimation : {}), //Pulse on the last 10 seconds
                            }}>Time Left: {formatTime(timeLeft)}</div>
                            </>
                        )}
                    </div>
                </main>  
            </div>

            {/* Footer*/}
            <footer style={styles.footer}>
                <p>© Laura Searle, 20960191, 2025</p>
            </footer>
        </div>
    );
}    
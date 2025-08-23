'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs'

export default function CodingRaces() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeTab, setActiveTab] = useState<string>('/coding-races');

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

    //Page Styling
    const styles = {
        page: {
            backgroundColor: isDark ? '#121212' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            minHeight: '100vh',
            padding: '20px',
        },
        header: {
            backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0',
            padding: '25px',
            borderBottom: `2px solid ${isDark ? '#444' : '#ccc'}`,
            position: 'relative' as 'relative',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
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
            color: isDark ? 'lightblue' : 'blue',
            textDecoration: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s',
        },
        aboutLink: {
            color: isDark ? 'violet' : 'purple',
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
    };

    return(
        <div>
            <div style={styles.page}>
                <h1 style={{marginBottom: '20px'}}>20960191</h1>
                <header style={styles.header}>
                    <h2>Coding-Races Page</h2>
                    <nav style={styles.nav}>
                        <div style={styles.leftLinks}>
                            <Link href="/" style={{...styles.link, fontWeight: activeTab === '/' ? 'bold' : 'normal', textDecoration: activeTab === '/' ? 'underline' : 'none',}}onClick={() => handleMenuClick('/')}>Tabs</Link>
                            <Link href="/pre-lab" style={{ ...styles.link, fontWeight: activeTab === '/pre-lab' ? 'bold' : 'normal', textDecoration: activeTab === '/pre-lab' ? 'underline' : 'none' }} onClick={() => handleMenuClick('/pre-lab')}>Pre-Lab Questions</Link>
                            <Link href="/escape-room" style={{ ...styles.link, fontWeight: activeTab === '/escape-room' ? 'bold' : 'normal', textDecoration: activeTab === '/escape-room' ? 'underline' : 'none' }} onClick={() => handleMenuClick('/escape-room')}>Escape Room</Link>
                            <Link href="/coding-races" style={{ ...styles.link, fontWeight: activeTab === '/coding-races' ? 'bold' : 'normal', textDecoration: activeTab === '/coding-races' ? 'underline' : 'none' }} onClick={() => handleMenuClick('/coding-races')}>Coding Races</Link>
                        </div>
                        <div style={styles.rightLinks}>
                            <Link href="/about" style={{ ...styles.aboutLink, fontWeight: activeTab === '/about' ? 'bold' : 'normal', textDecoration: activeTab === '/about' ? 'underline' : 'none' }} onClick={() => handleMenuClick('/about')}>About</Link>
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

                    <h1>Coding-Races</h1>
                    <p>20960191</p>
                </main>  
            </div>

            {/* Footer*/}
            <footer style={styles.footer}>
                <p>© Laura Searle, 20960191, 2025</p>
            </footer>
        </div>
    );
}    

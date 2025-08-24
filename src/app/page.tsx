'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Breadcrumbs from './components/breadcrumbs';

//TABS PAGE
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect theme (check localStorage)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') { 
      const savedTheme = localStorage.getItem('theme'); 
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme; // If a saved theme exists in localStorage, use that
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; // otherwise check system preference
    }
    return 'light'; // If neither available, use 'light'
  });

  // Track active menu tab with localStorage
  const [activeTab, setActiveTab] = useState<string>('/');
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) setActiveTab(savedTab);
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [stepContents, setStepContents] = useState<string[]>([]);

  // Initialise steps/tabs
  useEffect(() => {
    //Check if steps are in the localStorage
    const savedSteps = localStorage.getItem('steps');
    const savedContents = localStorage.getItem('stepContents');
    //If there are steps saved in localStorage, use these
    if (savedSteps && savedContents) {
      setSteps(JSON.parse(savedSteps));
      setStepContents(JSON.parse(savedContents));
    } else {
      setSteps(['Step 1', 'Step 2', 'Step 3']); //Otherwise, use template steps
      setStepContents([
        'Content for Step 1 goes here.',
        'Content for Step 2 goes here.',
        'Content for Step 3 goes here.',
      ]);
    }
  }, []);

  // Save steps to localStorage
  useEffect(() => {
    localStorage.setItem('steps', JSON.stringify(steps));
    localStorage.setItem('stepContents', JSON.stringify(stepContents));
  }, [steps, stepContents]);

  // Handle menu clicks - save active tab to localStorage
  const handleMenuClick = (path: string) => {
    setActiveTab(path);
    localStorage.setItem('activeTab', path);
  }

  // Toggle for light/dark mode functionality
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save the theme preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

  const isDark = theme === 'dark';

  // Add Tabs
  const addTab = () => {
    if (steps.length >= 15) return;
    const newStepNumber = steps.length + 1;
    setSteps([...steps, `Step ${newStepNumber}`]);
    setStepContents([...stepContents, `Content for Step ${newStepNumber} goes here.`]);
  };
  
  //Allow removal of tabs
  const removeTab = () => {
    if (steps.length <= 1) return;
    setSteps(steps.slice(0, -1));
    setStepContents(stepContents.slice(0, -1));
    if (activeStep >= steps.length - 1) {
      setActiveStep(steps.length - 2);
    }
  };

  // Generate the HTML output (displayed in output box)
  const generateOutput = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tabs Example</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .tabs-container {
          display: flex;
          margin: 20px;
          gap: 10px;
        }
        .tab-buttons {
          flex: 1;
        }
        .tab-buttons button {
          padding: 10px;
          cursor: pointer;
          background-color: #ddd;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin: 5px;
        }
        .tab-buttons button.active {
          background-color: #4CAF50;
          color: white;
        }
        .content-box {
          flex: 2;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: white;
          min-height: 150px;
        }
        .output-box {
          flex: 1;
          padding: 20px;
          background-color: #222;
          color: white;
          white-space: pre-wrap;
          border-radius: 4px;
          overflow: auto;
          min-height: 150px;
        }
      </style>
    </head>
    <body>
      <div class="tabs-container">
        <div class="tab-buttons">
          ${steps.map((s, i) => `<button class="${i === activeStep ? 'active' : ''}" onClick="showStep(${i})">${s}</button>`).join('')}
        </div>
        <div class="content-box">
          <p>${stepContents[activeStep]}</p>
        </div>
      </div>
    <script>
      let activeStep = ${activeStep};
      const stepContents = ${JSON.stringify(stepContents)};
      function showStep(step) {
        activeStep = step;
        document.querySelectorAll('.tab-buttons button').forEach((btn, index) => {
          if (index === step) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
        document.querySelector('.content-box').innerHTML = '<p>' + stepContents[step] + '</p>';
      }
    </script>
    </body>
    </html>
    `.trim();
  };

  //Allow editing of steps
  const [editingStep, setEditingStep] = useState<number | null>(null);

  //Copy contents of the output to users clipboard
  const handleCopyOutput = () => {
    navigator.clipboard.writeText(generateOutput());
    alert("Output has been copied to clipboard");
  };

  //Hover functionality
  const linkHoverStyle = {
    backgroundColor: isDark ? '#555' : 'rgba(189, 213, 241, 0.94)',
    color: isDark ? '#fff' : '#000',
  };

  // Styling 
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
    tabsContainer: {
      display: 'flex',
      gap: '20px',
      marginTop: '20px',
      flexWrap: 'wrap' as 'wrap',
      width: '100%',
      boxSizing: 'border-box' as 'border-box',
      alignItems: 'flex-start',
    },
    stepsColumn: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '10px',
      minWidth: '120px',
    },
    contentBox: {
      flex: '1 1 300px',
      minWidth: '300px',
      maxWidth: '600px',
      border: `1px solid ${isDark ? '#555' : '#ccc'}`,
      padding: '10px',
      minHeight: '250px',
      resize: 'vertical',
      overflow: 'auto',
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
      borderRadius: '4px',
    },
    outputBox: {
      flex: '1 1 300px',
      minWidth: '300px',
      maxWidth: '100%',
      maxHeight: '800px',
      border: `1px solid ${isDark ? '#555' : '#ccc'}`,
      padding: '10px',
      minHeight: '150px',
      whiteSpace: 'pre-wrap' as 'pre-wrap',
      backgroundColor: isDark ? '#222' : '#f9f9f9',
      overflow: 'auto',
      borderRadius: '4px',
    },
    stepButton: {
      padding: '8px 12px',
      cursor: 'pointer',
      backgroundColor: isDark ? '#333' : '#eee',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold' as 'bold',
    },
    stepButtonActive: {
      backgroundColor: isDark ? '#555' : '#ccc',
    },
    stepAddRemoveContainer: {
      marginTop: '10px',
      display: 'flex',
      gap: '5px',
    },
    copyButton: {
      display: 'block',
      margin: '0 auto 12px auto',
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: isDark ? '#444' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      width: '80%',
      maxWidth: '300px',
      textAlign: 'center' as 'center',
    },

  };

  // Page Content (About Page)
  return (
    <div>
      <div style={styles.page}>
        <h1 style={{ marginBottom: '20px' }}>20960191</h1>
        <header style={styles.header}>
          <h2>Home / Tabs</h2>
          <nav style={styles.nav}>
            <div style={styles.leftLinks}>
              <Link href="/" style={{ ...styles.link, fontWeight: activeTab === '/' ? 'bold' : 'normal', textDecoration: activeTab === '/' ? 'underline' : 'none' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} onClick={() => handleMenuClick('/')}>Tabs</Link>
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
              {/* Toggle Switch (Light/Dark Mode Functionality) */}
              <div onClick={toggleTheme} style={styles.switchContainer}>
                <div style={styles.switchCircle}></div>
              </div>
            </div>
          </nav>
          {/* Dropdown Hamburger Menu */}
          <div style={styles.dropdown}>
            <Link href="/" style={styles.dropdownLink}>Tabs</Link>
            <Link href="/pre-lab" style={styles.dropdownLink}>Pre-Lab Questions</Link>
            <Link href="/escape-room" style={styles.dropdownLink}>Escape Room</Link>
            <Link href="/coding-races" style={styles.dropdownLink}>Coding Races</Link>
            <Link href="/about" style={styles.dropdownLink}>About</Link>
          </div>
        </header>

        <main>
          {/* Link breadcrumbs */}
          <Breadcrumbs activeTab={activeTab} /> 

          <div style={styles.tabsContainer}>
            <div style={styles.stepsColumn}>
              {steps.map((step, index) => (
                editingStep === index ? (
                  <input
                    key={index}
                    type = "text"
                    value = {step}
                    autoFocus
                    onChange={(e) => {
                      const newSteps = [...steps];
                      newSteps[index] = e.target.value;
                      setSteps(newSteps);
                    }}
                    onBlur={() => setEditingStep(null)} //Finish any editing once user clicks away from button
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setEditingStep(null); //Finish editing upon pressing 'Enter'
                    }}
                    style = {{
                      ...styles.stepButton,
                      ...(activeStep === index ? styles.stepButtonActive : {}),
                    }}
                  />
                ) : (
                <button
                  key={index}
                  style={{
                    ...styles.stepButton,
                    ...(activeStep === index ? styles.stepButtonActive : {}),
                  }}
                  onClick={() => setActiveStep(index)}
                  onDoubleClick={() => setEditingStep(index)} //Allow editing upon double click
                >
                  {step}
                </button>
                )
              ))}
              <div style={styles.stepAddRemoveContainer}>
                <button onClick={addTab} style={styles.stepButton}>
                  +
                </button>
                <button onClick={removeTab} style={styles.stepButton}>
                  -
                </button>
              </div>
            </div>
            <textarea
              style={{
                ...styles.contentBox,
                resize: 'vertical',
                minHeight: '150px',
                maxHeight: '400px',
                overflow: 'auto',
                fontFamily: 'inherit',
                fontSize: '1rem',
                borderRadius: '4px',
                border: `1px solid ${isDark ? '#555' : '#ccc'}`,
                backgroundColor: isDark ? '#222' : '#fff',
                color: isDark ? '#fff' : '#000',
                padding: '10px',
              }}
              value={stepContents[activeStep]}
              onChange={(e) => {
                const newContents = [...stepContents];
                newContents[activeStep] = e.target.value;
                setStepContents(newContents);
              }}
              rows={6}
            />

            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 300px', minWidth: '300px', maxWidth: '100%'}}>
              <div style={styles.outputBox}>
                <pre>{generateOutput()}</pre>
              </div>
              <button onClick={handleCopyOutput} style={styles.copyButton}>Copy Output</button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© Laura Searle, 20960191, 2025</p>
      </footer>
    </div>
  );
}



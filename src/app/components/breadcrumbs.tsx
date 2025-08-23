'use client'

import Link from 'next/link';

type BreadcrumbsProps = {
    activeTab: string;
};

export default function Breadcrumbs({ activeTab }: BreadcrumbsProps){
    //Define mappings
    const pages: {[key: string]: string} = {
        '/': 'Home',
        '/about': 'About',
        '/pre-lab': 'Pre-Lab Questions',
        '/escape-room': 'Escape Room',
        '/coding-races': 'Coding Races',
    };

    return (
        <nav aria-label="breadcrumb" style={{margin: '10px 0', fontSize: '14px'}}>
            <Link href="/" style={{color: 'blue', textDecoration: 'underline', marginRight: '5px'}}>Home</Link>
            {activeTab !== '/' && (
                <>
                    <span style={{margin: '0 5px'}}>&gt;</span>
                    <span>{pages[activeTab]}</span>
                </>
            )}
        </nav>
    );
}
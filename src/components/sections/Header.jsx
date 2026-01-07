import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import HeaderCard from '../../assets/Header_Cards.png';
import Flamina_Logo from '../../assets/Flamina_Logo_Blanc.png';

export default function Header() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(contentRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(imageRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "<0.2");

    }, { scope: containerRef });

    return (
        <header ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10 lg:py-0">
            <div className="container mx-auto px-4 max-w-[1600px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                <div ref={contentRef} className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
                    <img
                        src={Flamina_Logo}
                        className="w-40 md:w-56 lg:w-92 inline-block"
                        alt="Logo Flamina"
                    />
                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white max-w-2xl">
                        <span className="primary-color">Flamina</span>, Lorem ipsum dolor sit amet,
                        <span className="primary-color"> consectetur</span> adipiscing elit. Integer pharetra.
                    </p>
                    <button className="bg-gradient-pink-to-blue px-8 py-4 rounded-full w-full max-w-[300px] lg:w-full primary-bg-shadow font-bold text-xl lg:text-3xl text-white mt-4">
                        Acheter le Deck
                    </button>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
                    <div ref={imageRef} className="relative w-full flex justify-end">
                        <img
                            src={HeaderCard}
                            alt="Flamina Cards"
                            className="w-full md:max-w-md lg:w-150 lg:max-w-4xl object-contain lg:mr-5 transform lg:rotate-6 hover:rotate-0 transition-transform duration-500 ease-out"
                        />
                    </div>
                </div>

            </div>
        </header>
    );
}
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

import Card_Icon from '../../assets/Card_Icon.png';
import Flame_Icon from '../../assets/Flame_Icon.png';
import QR_Icon from '../../assets/QR_Icon.png';

import animationCard from '../../assets/animations/card-anim.json';
import animationQR from '../../assets/animations/qr-anim.json';
import animationFire from '../../assets/animations/heart-anim.json';

const steps = [
    {
        id: 1,
        icon: Card_Icon,
        lottie: animationCard, // On associe le fichier Lottie à l'étape
        title: "Piochez une carte",
        text: "Plongez dans l'univers unique de la collaboration entre Tinder et INA avec notre deck exclusif. Chaque carte est conçue pour inspirer et divertir."
    },
    {
        id: 2,
        icon: QR_Icon,
        lottie: animationQR,
        title: "Scannez le passé",
        text: "Chaque carte possède un QR Code unique. Scannez-le pour révéler une archive vidéo culte de l'INA sur la séduction d'autrefois."
    },
    {
        id: 3,
        icon: Flame_Icon,
        lottie: animationFire,
        title: "Relevez le défi",
        text: "À la fin de la vidéo, une action ou une vérité apparaît. Osez briser la glace et laissez la magie de l'histoire opérer."
    }
];

export default function CardSection() {
    const containerRef = useRef(null);
    const contentRefs = useRef([]); // Pour les cartes texte
    const lottieRefs = useRef([]);  // Pour les animations Lottie

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        steps.forEach((step, index) => {
            if (index === 0) return;

            // Sélecteurs Textes
            const currentPanel = contentRefs.current[index];
            const previousPanel = contentRefs.current[index - 1];

            // Sélecteurs Lotties
            const currentLottie = lottieRefs.current[index];
            const previousLottie = lottieRefs.current[index - 1];

            // --- ANIMATION TEXTE (Existante) ---
            tl.to(previousPanel, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            })
                .fromTo(currentPanel,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
                    "<" // Synchro
                );

            // --- ANIMATION LOTTIE (Nouvelle) ---
            // On fait disparaitre l'animation précédente et apparaître la nouvelle
            // Note : On utilise juste l'opacité ici pour un fondu propre
            if (previousLottie && currentLottie) {
                tl.to(previousLottie, {
                    opacity: 0,
                    scale: 0.9, // Petit effet de recul
                    duration: 1,
                    ease: "power2.inOut"
                }, "<") // Le "<" synchronise tout avec le texte
                    .fromTo(currentLottie,
                        { opacity: 0, scale: 1.1 }, // Arrive un peu zoomé
                        { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" },
                        "<"
                    );
            }

            tl.to({}, { duration: 0.5 });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center bg-transparent">
            <div className="container mx-auto px-4 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
                <div className="relative w-full lg:w-1/2 h-[500px] lg:h-[600px] flex items-center justify-center">
                    <div className="absolute inset-0 w-full max-w-xl mx-auto glassmorphism-bg rounded-3xl z-0"></div>
                    <div className="relative z-10 w-full max-w-lg px-6">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={(el) => (contentRefs.current[index] = el)}
                                className={`absolute inset-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center text-white transition-opacity ${
                                    index === 0 ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={step.icon}
                                    alt={step.title}
                                    className="w-20 h-20 lg:w-24 lg:h-24 mb-6 object-contain drop-shadow-lg"
                                />
                                <h2 className="font-[InstrumentSerif] text-3xl lg:text-5xl mb-6 font-bold tracking-wide">
                                    {step.title}
                                </h2>
                                <p className="text-lg lg:text-xl leading-relaxed text-gray-100">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:flex w-1/2 h-[900px] items-center justify-center relative flame-bg">
                    {steps.map((step, index) => (
                        <div
                            key={`lottie-${step.id}`}
                            ref={(el) => (lottieRefs.current[index] = el)}
                            className={`absolute bottom-60 w-full max-w-lg ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Lottie
                                animationData={step.lottie}
                                loop={true}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
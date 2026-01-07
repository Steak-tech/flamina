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
        lottie: animationCard,
        title: "Piochez une carte",
        text: "Plongez dans l'univers unique de la collaboration entre Tinder et INA avec notre deck exclusif."
    },
    {
        id: 2,
        icon: QR_Icon,
        lottie: animationQR,
        title: "Scannez le passé",
        text: "Chaque carte possède un QR Code unique. Scannez-le pour révéler une archive vidéo culte."
    },
    {
        id: 3,
        icon: Flame_Icon,
        lottie: animationFire,
        title: "Relevez le défi",
        text: "À la fin de la vidéo, une action ou une vérité apparaît. Osez briser la glace."
    }
];

export default function CardSection() {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);
    const lottieRefs = useRef([]);

    useGSAP(() => {
        // On garde paused: true
        const tl = gsap.timeline({ paused: true });

        // --- CORRECTION MAJEURE ICI ---
        // 1. On ajoute une PAUSE dès le début pour la STEP 1.
        // Cela "consomme" une partie du scroll (ex: les premiers 30%) juste pour afficher la Step 1 sans bouger.
        tl.to({}, { duration: 2 });

        steps.forEach((step, index) => {
            if (index === 0) return;

            const currentPanel = contentRefs.current[index];
            const previousPanel = contentRefs.current[index - 1];
            const currentLottie = lottieRefs.current[index];
            const previousLottie = lottieRefs.current[index - 1];

            // 2. La Transition (Rapide par rapport aux pauses)
            // On réduit la durée ici (0.5) pour que le changement soit franc, pas mou.
            tl.to(previousPanel, { y: -100, opacity: 0, duration: 0.5, ease: "power2.in" });

            tl.fromTo(currentPanel,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                ">-0.2" // Léger chevauchement pour la fluidité
            );

            if (previousLottie && currentLottie) {
                tl.to(previousLottie, { opacity: 0, scale: 0.9, duration: 0.5 }, "<");
                tl.fromTo(currentLottie,
                    { opacity: 0, scale: 1.1 },
                    { opacity: 1, scale: 1, duration: 0.5 },
                    "<"
                );
            }

            // 3. On ajoute une PAUSE après chaque transition
            // C'est ça qui garde la Step 2 et la Step 3 affichées longtemps
            tl.to({}, { duration: 2 });
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000", // Assez long pour bien sentir les pauses
            pin: true,
            scrub: 1, // Fluidité
            anticipatePin: 1,

            onUpdate: (self) => {
                // Si tu veux remettre le blocage du retour arrière (Forward Only), remplace la ligne dessous par :
                // if (self.progress > tl.progress()) tl.progress(self.progress);

                tl.progress(self.progress);
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">

                <div className="relative w-full lg:w-1/2 h-[500px] flex items-center justify-center">
                    <div className="absolute inset-0 w-full max-w-xl mx-auto glassmorphism-bg rounded-3xl z-0 border border-white/10"></div>
                    <div className="relative z-10 w-full max-w-lg px-6 h-full">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={(el) => (contentRefs.current[index] = el)}
                                className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white
                                    ${index === 0 ? 'opacity-100' : 'opacity-0 translate-y-[100px]'} 
                                `}
                            >
                                <img src={step.icon} alt={step.title} className="w-20 h-20 mb-6 object-contain drop-shadow-lg" />
                                <h2 className="title font-[InstrumentSerif] text-4xl mb-4 font-bold">{step.title}</h2>
                                <p className="text-lg text-gray-100">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex w-1/2 h-[900px] items-center justify-center relative flame-bg">
                    {steps.map((step, index) => (
                        <div key={`lottie-${step.id}`} ref={(el) => (lottieRefs.current[index] = el)} className={`absolute w-full max-w-md flex justify-center ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                                <Lottie animationData={step.lottie} loop={true} className="w-full h-full object-contain"/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
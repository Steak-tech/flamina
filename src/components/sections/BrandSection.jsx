import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Tinder_Logo from '../../assets/tinder_logo.png';
import Ina_Logo from '../../assets/ina_logo.png';

export default function BrandSection() {
    const sectionRef = useRef(null);

    // Petite animation d'entrée au scroll (optionnel mais sympa)
    useGSAP(() => {
        gsap.from(".brand-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full mx-auto text-white py-10 lg:py-16 flex flex-col gap-16 lg:gap-24 overflow-hidden">

            <div className='w-full px-4 text-center'>
                <h2 className="title font-[InstrumentSerif] text-xl md:text-5xl lg:text-5xl w-full primary-color mb-4">
                    UN PARTENARIAT UNIQUE
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-[6rem] leading-none primary-text-gradient font-bold tracking-tight">
                    La collaboration
                </h1>
            </div>

            <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-0">

                <div className='brand-card flex-1 flex flex-col items-center text-center px-6'>
                    <div className='tinder-bg-gradient inline-flex items-center justify-center rounded-3xl p-8 mb-8
                                     shadow-[0_0_70px_#DD4585]
                                     lg:shadow-none lg:hover:shadow-[0_0_70px_#DD4585]
                                    transition-all duration-300 ease-in-out transform '>
                        <img src={Tinder_Logo} alt="Logo Tinder" className="w-20 h-20 lg:w-28 lg:h-28 object-contain"/>
                    </div>

                    <h3 className="primary-text-gradient text-4xl lg:text-5xl font-bold mb-4">Tinder</h3>
                    <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-sm">
                        Le leader mondial de la rencontre, créateur de liens et facilitateur de premiers rendez-vous pour toute une génération.
                    </p>
                </div>

                <div className="hidden lg:flex items-center justify-center px-10">
                    <div className="w-[1px] h-full min-h-[300px] bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                </div>
                <div className='brand-card flex-1 flex flex-col items-center text-center px-6'>
                    <div className='ina-bg-gradient inline-flex items-center justify-center rounded-3xl p-8 mb-8
                                     shadow-[0_0_70px_#028CB5]
                                     lg:shadow-none lg:hover:shadow-[0_0_70px_#028CB5]
                                    transition-all duration-300 ease-in-out transform'>
                        <img src={Ina_Logo} alt="Logo INA" className="w-20 h-20 lg:w-28 lg:h-28 object-contain"/>
                    </div>

                    <h3 className="text-[#028CB5] text-4xl lg:text-5xl font-bold mb-4">INA</h3>
                    <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-sm">
                        Le trésor national des archives, qui dépoussière l'histoire avec un regard décalé pour raconter comment on s'aimait avant.
                    </p>
                </div>

            </div>
        </section>
    );
}
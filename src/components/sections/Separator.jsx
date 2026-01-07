import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

import Tinder_Logo from '../../assets/Tinder_Icon.png';
import Ina_Logo from '../../assets/Ina_Icon.png';

const MarqueeItem = () => (
    <div className='flex items-center gap-4 md:gap-8 px-4 md:px-8'>
        <img src={Tinder_Logo} alt='Logo Tinder' className='w-15'/>
        <span className="text-5xl md:text-5xl font-bold uppercase font-[Helvetica] text-white">Tinder x INA</span>
        <img src={Ina_Logo} alt='Logo INA' className="w-20"/>
        <span className="text-5xl md:text-5xl font-bold uppercase font-[Helvetica] text-white">Tinder x INA</span>
    </div>
)

export default function Separator(){
    const container = useRef();
    const slider = useRef();

    useGSAP(() => {
        gsap.to(slider.current, {
            xPercent: -50,
            duration: 50,
            ease: "none",
            repeat: -1
        });
    }, { scope: container });
    return (
        <div ref={container} className="relative w-full overflow-hidden bg-neutral-900 backdrop-blur-sm py-6 md:py-10">
            <div ref={slider} className="flex w-max">
                <div className="flex">
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                </div>
                <div className="flex">
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                </div>
            </div>
        </div>
    );
}
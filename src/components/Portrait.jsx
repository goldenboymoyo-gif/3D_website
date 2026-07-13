import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import bright3D from "../assets/bright_3D.png";

export default function Portrait() {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300,300],[15,-15]),{
        stiffness:120,
        damping:15
    });

    const rotateY = useSpring(useTransform(mouseX, [-300,300],[-15,15]),{
        stiffness:120,
        damping:15
    });

    const [scroll,setScroll]=useState(0);

    useEffect(()=>{

        const move=(e)=>{
            mouseX.set(e.clientX-window.innerWidth/2);
            mouseY.set(e.clientY-window.innerHeight/2);
        }

        window.addEventListener("mousemove",move);

        const scrolling=()=>{

            const max=document.body.scrollHeight-window.innerHeight;

            setScroll(window.scrollY/max);

        }

        window.addEventListener("scroll",scrolling);

        return()=>{
            window.removeEventListener("mousemove",move);
            window.removeEventListener("scroll",scrolling);
        }

    },[]);

    return(

        <motion.div

        animate={{
            y:[-10,10,-10]
        }}

        transition={{
            duration:5,
            repeat:Infinity,
            ease:"easeInOut"
        }}

        style={{
            rotateX,
            rotateY,
            opacity:1-scroll,
            scale:1-scroll*0.2,
            filter:`blur(${scroll*6}px)`,
            transformStyle:"preserve-3d"
        }}

        whileHover={{
            scale:1.08
        }}

        className="portrait"

        >

            <img
            src={bright3D}
            alt=""
            draggable="false"
            />

        </motion.div>

    )

}

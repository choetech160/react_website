// import { SendTwoTone } from '@material-ui/icons';
import React, {useState} from 'react';
import { Animate }  from 'react-simple-animate';
// import YourComponent from './YourComponent';
import { useAnimateGroup, AnimateGroup } from "react-simple-animate";

function Logo({ play }) {
    const PrivacyLetters = ['i','t','r','u','s', '-']
    const SquareLetters = ['r','i','v','a','c','y']
    // const [play, setPlay] = useState();
   
    const { styles, play3, isPlaying } = useAnimateGroup({
        sequences: PrivacyLetters.map(() => ({
          start: { opacity: 0, transform: 'translateY(0px)' },
          end: { opacity: 1, transform: 'translateY(8px)' },
          overlay: 0.1
        }))
      })
     
    const [playGroup, setplayGroup] = useState(false)
    const [done, setDone] = useState(false);
    const SFinishedMoved = () => {
        console.log("S finished moving")
        setDone(true)
        setplayGroup(true)

    }

    return(
            <>
            {done ? (
                <>
                <Animate
                    play={playGroup} // set play true to start the animation
                    start={{ transform: 'translate(0, 0)' }}
                    end={{ transform: 'translate(0, 0)' }}>
                    <p>C</p>
                </Animate>
                <AnimateGroup play={playGroup}>
                    {PrivacyLetters.map((item, index) => {
                        return (
                        <Animate
                            key={item}
                            // onComplete={SquareFinishedMoving}
                            sequenceIndex={index}
                            end={{ opacity: 1, transform: 'translate(0px,0)' }}
                            start={{ opacity: 0, transform: 'translate(0px,-20px)' }}
                            duration={0.1}>
                            <p>{item}</p>
                        </Animate>
                        )
                    })}
                </AnimateGroup>
                <Animate
                    play={playGroup} // set play true to start the animation
                    start={{ transform: 'translate(0, 0)' }}
                    end={{ transform: 'translate(0, 0)' }}>
                    <p>P</p>
                </Animate>
                <AnimateGroup play={playGroup}>
                    {SquareLetters.map((item, index) => {
                    return (
                        <Animate
                            key={item}
                            sequenceIndex={index}
                            end={{ opacity: 1, transform: 'translate(20,10)' }}
                            start={{ opacity: 0, transform: 'translate(0px,0px)' }}
                            duration={0.1}
                        >
                            <p>{item}</p>
                        </Animate>
                        )
                    })}
                </AnimateGroup>
                </>
                ):(
                <>
                <Animate
                    play={play} // set play true to start the animation
                    start={{ transform: 'translate(0, 0)' }}
                    end={{ transform: 'translate(0, 0)' }}>
                    <p>C</p>
                </Animate>
                <Animate
                    play={play}
                    start={{
                    transform: "translateX(0px)"}}
                    end={{ transform: "translateX(50px)" }}
                    onComplete={() => SFinishedMoved()} // call back function 
                >
                    <p>P</p>
                </Animate>
            </>
            )}
    </>
    )
};


export default Logo;
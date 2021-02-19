import { useState } from 'react'

const Card = ({image, shufleImgsAndChangeClickedProp, setLevel, updateScore, setRequestedImgs}) => {
    const handleClick = () => {
        if(!image.clicked) {
            shufleImgsAndChangeClickedProp(image.id)
            updateScore()
        } 
        else{
            setLevel({num:1,imgs:4})
            setRequestedImgs([])
            updateScore("reset")
        }  
    }

    return (
        <div className="img-con" onClick={handleClick} >
            <img src={image.img} alt="image"/>
        </div>
    )
}

export default Card


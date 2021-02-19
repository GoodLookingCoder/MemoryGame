import React from 'react'

const Header = ({ level, score }) => {
    return (
        <header>
            <h1 style={{textAlign: "center"}}>Level: {level.num}</h1>
            <div style={{display: "flex", justifyContent: "center"}} >
                <h2 style={{marginRight: "20px"}}>Score: {score.actual}</h2>
                <h2>Highest Score: {score.highest}</h2>
            </div>
        </header>
    )
}

export default Header

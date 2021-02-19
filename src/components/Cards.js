import { useState, useEffect } from 'react'
import Card from "./Card"

const Cards = ({level, setLevel, updateScore}) => {
    const [images, setImages] = useState([])
    const [requestedImgs, setRequestedImgs] = useState([])
    const [hideImages, setHideImage] = useState(false)

    useEffect(()=>{
        const getImgs = async () => {
            if(requestedImgs.length === 0){
                const response = await fetch(`https://www.breakingbadapi.com/api/character/random?limit=${level.imgs}`)
                const data = await response.json()
                setImages(data.map(character=>(
                    {
                        id: character.char_id,
                        img: character.img,
                        clicked: false
                    }
                )))
                setRequestedImgs(data.map(character=>(
                    character.char_id
                )))

            }else{
                const response = await fetch(`https://www.breakingbadapi.com/api/character/random?limit=${level.imgs}`)
                const data = await response.json()
                const updaterArrImages = []
                const updaterArrIds = [...requestedImgs]

                for (let i = 0; i < data.length; i++) {
                    if(updaterArrIds.indexOf(data[i].char_id) == -1){
                        updaterArrImages.push({
                            id: data[i].char_id,
                            img: data[i].img,
                            clicked: false
                        })
                        updaterArrIds.push(data[i].char_id)
                    }else{
                        let response = await fetch("https://www.breakingbadapi.com/api/character/random")
                        let data = await response.json()

                        while(updaterArrIds.indexOf(data[0].char_id) !== -1){
                            response = await fetch("https://www.breakingbadapi.com/api/character/random")
                            data = await response.json()
                        }
                        updaterArrImages.push({
                            id: data[0].char_id,
                            img: data[0].img,
                            clicked: false
                        })
                        updaterArrIds.push(data[0].char_id)
                    }
                }
    
                setImages(updaterArrImages)
                setRequestedImgs(updaterArrIds)
                setHideImage(false)
            }

        }
    
        getImgs()
    },[level])

    useEffect(()=>{
        const levelUp = () => {
            let counter = 0
            images.map(image=>{
                if(image.clicked===true) {
                  counter++  
                } 
            })
            if(counter === level.imgs) {
                setLevel({num: level.num + 1, imgs: level.imgs + 2})
                setHideImage(true)
            }
        }
        levelUp()
    }, [images])

    function shuffle(array) {
        let counter = 0
        images.map(image=>{
            if(image.clicked===true) {
              counter++  
            } 
        })
        if(counter + 1===level.imgs) return array

        let newArr = [...array]
        let currentIndex = newArr.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = newArr[currentIndex];
          newArr[currentIndex] = newArr[randomIndex];
          newArr[randomIndex] = temporaryValue;
        }
      
        return newArr;
    }

    const shufleImgsAndChangeClickedProp = (id) => {
        setImages(shuffle(images).map(image=>(
            image.id===id?{...image, clicked: true}: image
        )))
    }

    return (<>
        {!hideImages&&<div className = "imgs-con">
            {images.map((image)=>(
                <Card 
                    shufleImgsAndChangeClickedProp={shufleImgsAndChangeClickedProp}
                    setLevel={setLevel}
                    updateScore={updateScore}
                    key={image.id} 
                    image={image}
                    setRequestedImgs={setRequestedImgs}
                />
            ))}
        </div>}
    </>)
}

export default Cards
